// backend/controllers/contestController.js
import Contest from '../models/Contest.js';
import ContestParticipation from '../models/ContestParticipation.js';
import Payment from '../models/Payment.js';
// 🔹 @desc   Create a new contest
// @route  POST /api/contests
// @access Admin
export const createContest = async (req, res) => {
  try {
    const contest = await Contest.create({
      ...req.body,
      createdBy: req.admin?._id,
    });
    res.status(201).json({
      success: true,
      message: 'Contest created successfully',
      data: contest,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🔹 @desc   Update contest details / rounds / prizes
// @route  PUT /api/contests/:id
// @access Admin
export const updateContest = async (req, res) => {
  try {
    const contest = await Contest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!contest) {
      return res.status(404).json({ success: false, message: 'Contest not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Contest updated successfully',
      data: contest,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🔹 @desc   Publish a contest (draft -> published, visible to public)
// @route  PATCH /api/contests/:id/publish
// @access Admin
export const publishContest = async (req, res) => {
  try {
    const contest = await Contest.findByIdAndUpdate(
      req.params.id,
      { status: 'published', currentStage: 'Published' },
      { new: true }
    );
    if (!contest) {
      return res.status(404).json({ success: false, message: 'Contest not found' });
    }
    res.status(200).json({ success: true, message: 'Contest published', data: contest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 @desc   Move contest to the next stage (Registration Closed / Round 1 / Round 2 / Semi Final / Grand Finale)
// @route  PATCH /api/contests/:id/advance-stage
// @access Admin
export const advanceContestStage = async (req, res) => {
  try {
    const { currentStage, status } = req.body;
    const update = {};
    if (currentStage) update.currentStage = currentStage;
    if (status) update.status = status;

    const contest = await Contest.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!contest) {
      return res.status(404).json({ success: false, message: 'Contest not found' });
    }
    res.status(200).json({ success: true, message: 'Contest stage updated', data: contest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 @desc   Cancel a contest
// @route  PATCH /api/contests/:id/cancel
// @access Admin
export const cancelContest = async (req, res) => {
  try {
    const contest = await Contest.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled', currentStage: 'Cancelled' },
      { new: true }
    );
    if (!contest) {
      return res.status(404).json({ success: false, message: 'Contest not found' });
    }
    res.status(200).json({ success: true, message: 'Contest cancelled', data: contest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 @desc   Delete a contest (also cleans up its participations)
// @route  DELETE /api/contests/:id
// @access Admin
export const deleteContest = async (req, res) => {
  try {
    const contest = await Contest.findByIdAndDelete(req.params.id);
    if (!contest) {
      return res.status(404).json({ success: false, message: 'Contest not found' });
    }
    await ContestParticipation.deleteMany({ contest: req.params.id });
    res.status(200).json({ success: true, message: 'Contest deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 @desc   Get all contests, including drafts (Admin panel listing)
// @route  GET /api/contests/admin/all
// @access Admin
export const getAllContestsAdmin = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const contests = await Contest.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Contest.countDocuments(filter);
    res.status(200).json({
      success: true,
      count: contests.length,
      total,
      page: Number(page),
      data: contests,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 @desc   Public listing — contests grouped as upcoming / ongoing / past
// @route  GET /api/contests/public
// @access Public
export const getPublicContests = async (req, res) => {
  try {
    const now = new Date();

    const upcoming = await Contest.find({
      status: 'published',
      registrationStart: { $gt: now },
    }).sort({ registrationStart: 1 });

    const ongoing = await Contest.find({
      status: { $in: ['published', 'ongoing'] },
      registrationStart: { $lte: now },
    }).sort({ registrationStart: -1 });

    const past = await Contest.find({ status: 'completed' })
      .sort({ updatedAt: -1 })
      .populate('winner', 'name profileImage')
      .populate('runnerUp', 'name profileImage')
      .populate('top10', 'name profileImage');

    res.status(200).json({
      success: true,
      data: { upcoming, ongoing, past },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 @desc   Get single contest details by slug
// @route  GET /api/contests/public/:slug
// @access Public
export const getContestBySlug = async (req, res) => {
  try {
    const contest = await Contest.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('winner', 'name profileImage')
      .populate('runnerUp', 'name profileImage')
      .populate('top10', 'name profileImage');

    if (!contest) {
      return res.status(404).json({ success: false, message: 'Contest not found' });
    }
    res.status(200).json({ success: true, data: contest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 @desc   Logged-in model's dashboard — their own entries + upcoming contests to join
// @route  GET /api/contests/my-dashboard
// @access Model
// backend/controllers/contestController.js
// 🔹 @desc   Get authenticated Model Candidate Contest Dashboard & Financial History
// @route  GET /api/contests/my-dashboard (or /api/contest-participation/my-dashboard)
// @access Model
export const getModelContestDashboard = async (req, res) => {
  try {
    const modelId = req.model?._id || req.user?._id;
    if (!modelId) {
      return res.status(401).json({ success: false, message: 'Unauthorized candidate' });
    }
    // 1. Fetch all contest participations for this model
    const myParticipations = await ContestParticipation.find({ model: modelId })
      .populate('contest')
      .populate('payment')
      .sort({ createdAt: -1 });
    // 2. Fetch all completed payments to calculate total money paid
    const myPayments = await Payment.find({
      model: modelId,
      status: { $in: ['paid', 'completed'] },
    });
    const totalAmountPaid = myPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
    // 3. Last Contest Registered details
    const lastContestRegistered = myParticipations[0]
      ? {
          id: myParticipations[0].contest?._id,
          title: myParticipations[0].contest?.title,
          slug: myParticipations[0].contest?.slug,
          registeredAt: myParticipations[0].createdAt,
          stage: myParticipations[0].currentStage,
          isEliminated: myParticipations[0].isEliminated,
          paidAmount: myParticipations[0].paidAmount || 0,
        }
      : null;
    // 4. Fetch upcoming open contests
    const upcomingContestsToJoin = await Contest.find({
      status: { $in: ['published', 'ongoing', 'active'] },
    })
      .sort({ registrationStart: 1 })
      .limit(10);
    res.status(200).json({
      success: true,
      data: {
        totalAmountPaid,
        totalContestsEntered: myParticipations.length,
        lastContestRegistered,
        myParticipations,
        upcomingContestsToJoin,
      },
    });
  } catch (error) {
    console.error('Error fetching model contest dashboard:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// 🔹 @desc   Select Top N participants for a round (e.g. Top 100 / Top 20); everyone else is eliminated
// @route  PATCH /api/contests/:id/select-round/:roundNumber
// @access Admin
export const selectTopParticipantsForRound = async (req, res) => {
  try {
    const { id, roundNumber } = req.params;
    const { selectedModelIds, nextStage } = req.body; // array of Model _ids that passed this round

    if (!Array.isArray(selectedModelIds) || selectedModelIds.length === 0) {
      return res.status(400).json({ success: false, message: 'selectedModelIds array is required' });
    }
    if (!nextStage) {
      return res.status(400).json({ success: false, message: 'nextStage is required' });
    }

    // Advance the selected participants
    await ContestParticipation.updateMany(
      { contest: id, model: { $in: selectedModelIds } },
      {
        $set: {
          currentStage: nextStage,
          'roundSubmissions.$[elem].result': 'selected',
        },
      },
      { arrayFilters: [{ 'elem.roundNumber': Number(roundNumber) }] }
    );

    // Eliminate everyone else still active in this contest
    await ContestParticipation.updateMany(
      {
        contest: id,
        model: { $nin: selectedModelIds },
        isEliminated: false,
      },
      {
        $set: {
          currentStage: 'Eliminated',
          isEliminated: true,
          eliminatedAtRound: Number(roundNumber),
        },
      }
    );

    res.status(200).json({
      success: true,
      message: `Round ${roundNumber} results updated. ${selectedModelIds.length} participant(s) advanced.`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 @desc   Declare final results — Winner, Runner-up, Top 10
// @route  PATCH /api/contests/:id/declare-results
// @access Admin
export const declareContestResults = async (req, res) => {
  try {
    const { id } = req.params;
    const { winner, runnerUp, top10 } = req.body;

    const contest = await Contest.findByIdAndUpdate(
      id,
      {
        winner,
        runnerUp,
        top10,
        status: 'completed',
        currentStage: 'Completed',
      },
      { new: true }
    );

    if (!contest) {
      return res.status(404).json({ success: false, message: 'Contest not found' });
    }

    if (winner) {
      await ContestParticipation.findOneAndUpdate(
        { contest: id, model: winner },
        { finalPosition: 'Winner', currentStage: 'Winner' }
      );
    }
    if (runnerUp) {
      await ContestParticipation.findOneAndUpdate(
        { contest: id, model: runnerUp },
        { finalPosition: 'Runner-up', currentStage: 'Runner-up' }
      );
    }
    if (Array.isArray(top10) && top10.length) {
      await ContestParticipation.updateMany(
        { contest: id, model: { $in: top10 } },
        { finalPosition: 'Top 10', currentStage: 'Top 10' }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Results declared successfully',
      data: contest,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};