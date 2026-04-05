
const User = require("../models/User");
const mongoose = require("mongoose");

// GET ALL USERS (Admin)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "active" }).select("-password");
    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// GET USER BY ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id).select("-password");

    if (!user || user.status !== "active") {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, isActive } = req.body;

    const allowedRoles = ["viewer", "analyst", "admin"];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (name && name.trim().length < 3) {
      return res.status(400).json({ message: "Name must be at least 3 characters" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name.trim();
    if (role) user.role = role;
    if (typeof isActive === "boolean") user.isActive = isActive;

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch {
    res.status(500).json({ message: "Failed to update user" });
  }
};

// SOFT DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status === "inactive") {
      return res.status(400).json({ message: "User already deactivated" });
    }

    user.status = "inactive";
    await user.save();

    res.status(200).json({ message: "User deactivated successfully" });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
};


// UPDATE USER STATUS (Admin)
exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = ["active", "inactive"];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    if (!status || !allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status === status) {
      return res.status(400).json({
        message: `User already ${status}`,
      });
    }

    user.status = status;
    await user.save();

    res.status(200).json({
      message: `User status updated to ${status}`,
      user,
    });

  } catch {
    res.status(500).json({ message: "Failed to update status" });
  }
};