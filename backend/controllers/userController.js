const User = require("../models/User");

// @desc    Get logged-in user's profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    // req.user was attached by our protect middleware
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update logged-in user's profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only update fields that were actually provided in the request
    user.name = req.body.name || user.name;
    user.skills = req.body.skills || user.skills;
    user.interests = req.body.interests || user.interests;
    user.learningGoal = req.body.learningGoal || user.learningGoal;
    user.completedCourses = req.body.completedCourses || user.completedCourses;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      skills: updatedUser.skills,
      interests: updatedUser.interests,
      learningGoal: updatedUser.learningGoal,
      completedCourses: updatedUser.completedCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getUserProfile, updateUserProfile };