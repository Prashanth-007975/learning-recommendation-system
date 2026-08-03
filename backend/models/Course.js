const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    duration: { type: String, required: true },
    instructor: { type: String, required: true, trim: true },
    skillsCovered: { type: [String], default: [] },
    thumbnail: { type: String, default: "" },
    courseLink: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);