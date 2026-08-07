// backend/controllers/contestParticipationController.js
import Contest from '../models/Contest.js';
import ContestParticipation from '../models/ContestParticipation.js';
import Payment from '../models/Payment.js';

// 🔹 @desc   Model registers for a contest (registration is FREE)
// @route  POST /api/contest-participation/:contestId/register
// @access Model
// backend/controllers/contestParticipationController.js

// backend/controllers/contestParticipationController.js

export const registerForContest = async (req, res) => {
  try {
    const { contestId } = req.params;
    const modelId = req.model?._id || req.user?._id;

    if (!modelId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized candidate',
      });
    }

    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).json({ success: false, message: 'Contest not found' });
    }

    // ✅ FIX: Accept 'published', 'active', and 'ongoing' statuses
    const openStatuses = ['published', 'active', 'ongoing'];
    if (!openStatuses.includes(contest.status)) {
      return res.status(400).json({
        success: false,
        message: 'Registrations are not open for this contest',
      });
    }

    // ✅ Date Window Verification
    const now = new Date();
    const startDate = new Date(contest.registrationStart);
    const endDate = new Date(contest.registrationEnd);

    if (now < startDate || now > endDate) {
      return res.status(400).json({
        success: false,
        message: 'Registration window is closed',
      });
    }

    // Check if already registered
    const existing = await ContestParticipation.findOne({ contest: contestId, model: modelId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already registered for this contest',
      });
    }

    const participation = await ContestParticipation.create({
      contest: contestId,
      model: modelId,
      registrationStatus: 'pending',
      paymentStatus: contest.participationFee > 0 ? 'pending' : 'not_required',
    });

    contest.totalRegistrations += 1;
    await contest.save();

    res.status(201).json({
      success: true,
      message: 'Registered successfully! Registration is free — participation fee applies once approved by admin.',
      data: participation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// 🔹 @desc   Admin approves / rejects a model's registration
// @route  PATCH /api/contest-participation/:id/review
// @access Admin
export const reviewRegistration = async (req, res) => {
  try {
    const { decision, rejectionReason } = req.body; // decision: 'approved' | 'rejected'

    const update = {
      registrationStatus: decision,
      approvedBy: req.admin?._id,
      approvedAt: new Date(),
    };
    if (decision === 'approved') update.currentStage = 'Admin Approval';
    if (decision === 'rejected') update.rejectionReason = rejectionReason;

    const participation = await ContestParticipation.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!participation) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    res.status(200).json({
      success: true,
      message: `Registration ${decision}`,
      data: participation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// backend/controllers/contestParticipationController.js

export const initiateParticipationPayment = async (req, res) => {
  try {
    const participation = await ContestParticipation.findById(req.params.id).populate('contest');
    if (!participation) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }
    if (participation.registrationStatus !== 'approved') {
      return res.status(400).json({ success: false, message: 'Registration must be approved before payment' });
    }
    if (participation.paymentStatus === 'paid') {
      return res.status(400).json({ success: false, message: 'Participation fee already paid' });
    }

    const amount = participation.contest.participationFee;
    const modelId = req.model?._id || req.user?._id || participation.model;

    // ✅ FIX: Pass 'contest_participation' (Matches Payment schema enum)
    const payment = await Payment.create({
      model: modelId,
      user: modelId,
      amount,
      type: req.body.type || 'contest_participation', // 👈 Matching enum
      purpose: req.body.purpose || 'contest_participation',
      relatedContest: participation.contest._id,
      status: 'pending',
    });

    participation.payment = payment._id;
    participation.paidAmount = amount;
    await participation.save();

    res.status(201).json({
      success: true,
      message: 'Payment initiated successfully.',
      data: { payment, participation },
    });
  } catch (error) {
    console.error('Payment initiation error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// 🔹 @desc   Confirm participation payment (call from payment gateway webhook/callback)
// @route  PATCH /api/contest-participation/:id/confirm-payment
// @access Public (secured by gateway signature — add verification middleware in production)
export const confirmParticipationPayment = async (req, res) => {
  try {
    const { transactionId, status } = req.body; // status: 'paid' | 'failed'

    const participation = await ContestParticipation.findById(req.params.id).populate('contest');
    if (!participation) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    participation.paymentStatus = status;
    if (status === 'paid') {
      participation.paidAt = new Date();
      participation.currentStage = 'Round 1';
    }
    await participation.save();

    if (participation.payment) {
      await Payment.findByIdAndUpdate(participation.payment, { status, transactionId });
    }

    if (status === 'paid') {
      await Contest.findByIdAndUpdate(participation.contest._id, {
        $inc: { totalPaidParticipants: 1 },
      });
    }

    res.status(200).json({
      success: true,
      message: status === 'paid' ? 'Payment confirmed. You are entered into Round 1.' : 'Payment failed',
      data: participation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 @desc   Model submits an entry for a round (photo/video)
// @route  POST /api/contest-participation/:id/submit-round
// @access Model
export const submitRoundEntry = async (req, res) => {
  try {
    const { roundNumber, submissionType, url, thumbnailUrl, caption } = req.body;

    const participation = await ContestParticipation.findById(req.params.id);
    if (!participation) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }
    if (participation.isEliminated) {
      return res.status(400).json({ success: false, message: 'You have been eliminated from this contest' });
    }
    if (participation.paymentStatus !== 'paid' && participation.paymentStatus !== 'not_required') {
      return res.status(400).json({
        success: false,
        message: 'Participation fee must be paid before submitting entries',
      });
    }

    participation.roundSubmissions.push({ roundNumber, submissionType, url, thumbnailUrl, caption });
    await participation.save();

    res.status(201).json({
      success: true,
      message: 'Entry submitted successfully',
      data: participation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// backend/controllers/contestParticipationController.js

export const evaluateRoundSubmission = async (req, res) => {
  try {
    const { roundNumber, score, feedback, result } = req.body; // result: 'selected' | 'rejected'

    const participation = await ContestParticipation.findById(req.params.id);
    if (!participation) {
      return res.status(404).json({ success: false, message: 'Participation record not found' });
    }

    const sub = participation.roundSubmissions.find((s) => s.roundNumber === Number(roundNumber));
    if (sub) {
      if (score !== undefined) sub.score = Number(score);
      if (feedback) sub.feedback = feedback;
      if (result) sub.result = result;
    }

    await participation.save();

    res.status(200).json({
      success: true,
      message: `Round ${roundNumber} submission evaluated successfully`,
      data: participation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Helper function for contest stage progression matching schema enum:
// Round 1 -> Round 2 -> Semi Final -> Grand Finale -> Winner
const getNextContestStage = (roundNum, customNextStage) => {
  if (customNextStage) return customNextStage;
  if (roundNum === 1) return 'Round 2';
  if (roundNum === 2) return 'Semi Final';
  if (roundNum === 3) return 'Grand Finale';
  return 'Winner';
};

// 🔹 @desc   Admin evaluates candidate submission & promotes to next stage
// @route  PATCH /api/contest-participation/:id/evaluate
// @access Admin
export const evaluateAndPromoteParticipant = async (req, res) => {
  try {
    const { roundNumber, score, feedback, result, nextStage, isEliminated } = req.body;

    const participation = await ContestParticipation.findById(req.params.id);
    if (!participation) {
      return res.status(404).json({ success: false, message: 'Participant record not found' });
    }

    const currentRoundNum = Number(roundNumber || 1);

    // 1. Update or create matching round submission result
    let sub = participation.roundSubmissions.find((s) => s.roundNumber === currentRoundNum);
    if (sub) {
      if (score !== undefined) sub.score = Number(score);
      if (feedback) sub.feedback = feedback;
      if (result) sub.result = result; // 'selected' | 'rejected'
    } else {
      participation.roundSubmissions.push({
        roundNumber: currentRoundNum,
        submissionType: 'photo',
        url: '',
        score: Number(score) || 100,
        feedback: feedback || '',
        result: result || 'selected',
      });
    }

    // 2. Promote to Next Valid Enum Stage OR Eliminate
    if (isEliminated || result === 'rejected') {
      participation.isEliminated = true;
      participation.eliminatedAtRound = currentRoundNum;
    } else if (result === 'selected' || nextStage) {
      participation.isEliminated = false;
      participation.currentStage = getNextContestStage(currentRoundNum, nextStage);
    }

    await participation.save();

    res.status(200).json({
      success: true,
      message: result === 'selected'
        ? `Candidate evaluated & promoted to ${participation.currentStage}!`
        : `Candidate eliminated in Round ${currentRoundNum}.`,
      data: participation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// 🔹 @desc   Get all participants of a contest, optionally filtered by stage/registration status
// @route  GET /api/contest-participation/contest/:contestId
// @access Admin
export const getContestParticipants = async (req, res) => {
  try {
    const { contestId } = req.params;
    const { currentStage, registrationStatus } = req.query;

    const filter = { contest: contestId };
    if (currentStage) filter.currentStage = currentStage;
    if (registrationStatus) filter.registrationStatus = registrationStatus;

    const participants = await ContestParticipation.find(filter)
      .populate('model', 'name email phone profileImage')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: participants.length, data: participants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 @desc   Get logged-in model's own participation status for a specific contest
// @route  GET /api/contest-participation/:contestId/my-status
// @access Model
export const getMyParticipationStatus = async (req, res) => {
  try {
    // ✅ FIX: Check req.model OR req.user
    const modelId = req.model?._id || req.user?._id;

    if (!modelId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const participation = await ContestParticipation.findOne({
      contest: req.params.contestId,
      model: modelId,
    }).populate('contest');

    if (!participation) {
      return res.status(404).json({ success: false, message: 'You have not registered for this contest' });
    }

    res.status(200).json({ success: true, data: participation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getModelContestDashboard = async (req, res) => {
  try {
    // ✅ FIX: Check req.model OR req.user
    const modelId = req.model?._id || req.user?._id;

    if (!modelId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const now = new Date();

    const myParticipations = await ContestParticipation.find({ model: modelId })
      .populate('contest')
      .sort({ createdAt: -1 });

    const upcomingContestsToJoin = await Contest.find({
      status: 'published',
      registrationStart: { $gt: now },
    }).sort({ registrationStart: 1 });

    res.status(200).json({
      success: true,
      data: { myParticipations, upcomingContestsToJoin },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};