import Selection from "../../models/Selection.js";

// GET MY SELECTION STATUS
export const getMySelection = async (req, res) => {
  try {
    let selection = await Selection.findOne({ model: req.user._id });

    if (!selection) {
      selection = await Selection.create({
        model: req.user._id,
      });
    }

    res.json({
      success: true,
      selection,
    });
  } catch (error) {
    console.error("Get selection error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get selection status",
      error: error.message,
    });
  }
};
// import Selection from "../../models/Selection.js";


// GET ALL SELECTIONS

export const adminGetSelections = async (req, res) => {
  try {

    const { status, page = 1, limit = 20 } = req.query;

    const filter = {};

    if (status) {
      filter.overallStatus = status;
    }

    const skip = (page - 1) * limit;

    const selections = await Selection.find(filter)
      .populate("model", "name email phone profileImage")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Selection.countDocuments(filter);

    res.json({
      success: true,
      data: selections,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to get selections",
      error: error.message,
    });

  }
};



// GET SINGLE SELECTION

export const adminGetSelectionById = async (req, res) => {

  try {

    const selection = await Selection.findById(req.params.id)
      .populate("model");

    if (!selection) {
      return res.status(404).json({
        success: false,
        message: "Selection not found",
      });
    }

    res.json({
      success: true,
      selection,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};




// UPDATE ROUND

export const adminUpdateRound = async (req, res) => {

  try {

    const { id } = req.params;

    const { round, status, remarks } = req.body;

    const selection = await Selection.findById(id);

    if (!selection) {
      return res.status(404).json({
        success: false,
        message: "Selection not found",
      });
    }

    const current = selection.rounds.find(
      r => r.round === Number(round)
    );

    if (!current) {
      return res.status(404).json({
        success: false,
        message: "Round not found",
      });
    }

    current.status = status;
    current.remarks = remarks || "";
    current.reviewedAt = new Date();
    current.reviewedBy = req.user._id;

    // Move Next Round

    if (
      status === "approved" &&
      selection.currentRound < selection.rounds.length
    ) {

      selection.currentRound += 1;
      selection.overallStatus = "in_review";

    }

    // Final Selection

    if (
      current.round === 4 &&
      status === "approved"
    ) {

      selection.overallStatus = "selected";
      selection.finalDecisionDate = new Date();
      selection.selectedBy = req.user._id;

    }

    // Reject

    if (status === "rejected") {

      selection.overallStatus = "rejected";
      selection.finalDecisionDate = new Date();

    }

    await selection.save();

    res.json({
      success: true,
      message: "Round updated successfully",
      selection,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};