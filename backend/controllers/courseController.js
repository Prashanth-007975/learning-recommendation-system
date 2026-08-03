const Course = require("../models/Course");

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const { search, category, difficulty, skill } = req.query;

    // Build a dynamic MongoDB query object based on which filters were provided
    const query = {};

    // Search by title (case-insensitive partial match)
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Filter by exact category match (case-insensitive)
    if (category) {
      query.category = { $regex: `^${category}$`, $options: "i" };
    }

    // Filter by exact difficulty match
    if (difficulty) {
      query.difficulty = { $regex: `^${difficulty}$`, $options: "i" };
    }

    // Filter by a skill being present in skillsCovered array
    if (skill) {
      query.skillsCovered = { $regex: skill, $options: "i" };
    }

    const courses = await Course.find(query);
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      duration,
      instructor,
      skillsCovered,
      thumbnail,
      courseLink,
    } = req.body;

    if (!title || !description || !category || !difficulty || !duration || !instructor || !courseLink) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const course = await Course.create({
      title,
      description,
      category,
      difficulty,
      duration,
      instructor,
      skillsCovered,
      thumbnail,
      courseLink,
    });

    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;
    course.category = req.body.category || course.category;
    course.difficulty = req.body.difficulty || course.difficulty;
    course.duration = req.body.duration || course.duration;
    course.instructor = req.body.instructor || course.instructor;
    course.skillsCovered = req.body.skillsCovered || course.skillsCovered;
    course.thumbnail = req.body.thumbnail || course.thumbnail;
    course.courseLink = req.body.courseLink || course.courseLink;

    const updatedCourse = await course.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.deleteOne();
    res.status(200).json({ message: "Course removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};