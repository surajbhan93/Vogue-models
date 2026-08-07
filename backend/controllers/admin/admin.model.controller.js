import Model from "../../models/Model.js";
import bcrypt from "bcryptjs";

// 🔹 GET ALL MODELS (Admin)
export const adminGetAllModels = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      search,
      sort = "-createdAt" 
    } = req.query;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ];
    }

    const skip = (page - 1) * limit;

    const models = await Model.find(filter)
      .select("-password")
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Model.countDocuments(filter);

    res.json({
      success: true,
      data: models,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("Admin get models error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get models",
      error: error.message
    });
  }
};

// 🔹 GET MODEL DETAILS (Admin)
export const adminGetModelById = async (req, res) => {
  try {
    const { id } = req.params;

    const model = await Model.findById(id).select("-password");
    if (!model) {
      return res.status(404).json({
        success: false,
        message: "Model not found"
      });
    }

    res.json({
      success: true,
      model
    });

  } catch (error) {
    console.error("Admin get model error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get model",
      error: error.message
    });
  }
};

// 🔹 UPDATE MODEL (Admin)
export const adminUpdateModel = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // If password is being updated, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const model = await Model.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!model) {
      return res.status(404).json({
        success: false,
        message: "Model not found"
      });
    }

    res.json({
      success: true,
      message: "Model updated successfully!",
      model
    });

  } catch (error) {
    console.error("Admin update model error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update model",
      error: error.message
    });
  }
};

// 🔹 VERIFY MODEL (Admin)
export const adminVerifyModel = async (req, res) => {
  try {
    const { id } = req.params;

    const model = await Model.findByIdAndUpdate(
      id,
      { isVerified: true, status: "active" },
      { new: true }
    ).select("-password");

    if (!model) {
      return res.status(404).json({
        success: false,
        message: "Model not found"
      });
    }

    res.json({
      success: true,
      message: "Model verified successfully!",
      model
    });

  } catch (error) {
    console.error("Admin verify model error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify model",
      error: error.message
    });
  }
};

// 🔹 CHANGE MODEL STATUS (Admin)
export const adminChangeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "active", "suspended", "inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    const model = await Model.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).select("-password");

    if (!model) {
      return res.status(404).json({
        success: false,
        message: "Model not found"
      });
    }

    res.json({
      success: true,
      message: `Model status updated to ${status}!`,
      model
    });

  } catch (error) {
    console.error("Admin change status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to change status",
      error: error.message
    });
  }
};

// 🔹 DELETE MODEL (Admin)
export const adminDeleteModel = async (req, res) => {
  try {
    const { id } = req.params;

    const model = await Model.findByIdAndDelete(id);
    if (!model) {
      return res.status(404).json({
        success: false,
        message: "Model not found"
      });
    }

    res.json({
      success: true,
      message: "Model deleted successfully!"
    });

  } catch (error) {
    console.error("Admin delete model error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete model",
      error: error.message
    });
  }
};

// 🔹 GET MODEL STATS (Admin)
export const adminGetStats = async (req, res) => {
  try {
    const totalModels = await Model.countDocuments();
    const activeModels = await Model.countDocuments({ status: "active" });
    const pendingModels = await Model.countDocuments({ status: "pending" });
    const suspendedModels = await Model.countDocuments({ status: "suspended" });
    const verifiedModels = await Model.countDocuments({ isVerified: true });
    
    // Premium/Subscription stats
    const premiumModels = await Model.countDocuments({ subscription: "premium" });
    const vipModels = await Model.countDocuments({ subscription: "vip" });

    // Recent registrations (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newRegistrations = await Model.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    res.json({
      success: true,
      stats: {
        total: totalModels,
        active: activeModels,
        pending: pendingModels,
        suspended: suspendedModels,
        verified: verifiedModels,
        premium: premiumModels,
        vip: vipModels,
        newRegistrations: newRegistrations,
        unverified: totalModels - verifiedModels
      }
    });

  } catch (error) {
    console.error("Admin get stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get stats",
      error: error.message
    });
  }
};