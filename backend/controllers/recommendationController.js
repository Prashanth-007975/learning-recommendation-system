const Course = require("../models/Course");
const { getRecommendations } = require("../utils/recommendationEngine");

// @desc    Get personalized course recommendations for logged-in user
// @route   GET /api/recommendations
// @access  Private
const getUserRecommendations = async (req, res) => {
  try {
    const allCourses = await Course.find({});

    if (allCourses.length === 0) {
      return res.status(200).json([]);
    }

    const recommendations = getRecommendations(req.user, allCourses);

    // Return top 10 recommendations
    res.status(200).json(recommendations.slice(0, 10));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getUserRecommendations };