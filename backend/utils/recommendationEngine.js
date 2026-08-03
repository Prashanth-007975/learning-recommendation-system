// This function takes a user object and a list of all courses,
// and returns a sorted array of recommended courses with scores.
const getRecommendations = (user, allCourses) => {
  const userInterests = (user.interests || []).map((i) => i.toLowerCase());
  const userSkills = (user.skills || []).map((s) => s.toLowerCase());
  const completedTitles = (user.completedCourses || []).map((c) => c.toLowerCase());
  const learningGoal = (user.learningGoal || "").toLowerCase();

  // Step 1: Filter out courses the user has already completed
  const notCompleted = allCourses.filter(
    (course) => !completedTitles.includes(course.title.toLowerCase())
  );

  // Step 2: Score each remaining course
  const scoredCourses = notCompleted.map((course) => {
    let score = 0;

    const courseCategory = course.category.toLowerCase();
    const courseSkills = (course.skillsCovered || []).map((s) => s.toLowerCase());
    const courseTitle = course.title.toLowerCase();
    const courseDescription = course.description.toLowerCase();

    // Rule 1: Interest matches category (+3 points)
    if (userInterests.includes(courseCategory)) {
      score += 3;
    }

    // Rule 2: Skill overlap - some overlap is good, but not total overlap
    const skillOverlap = courseSkills.filter((skill) =>
      userSkills.includes(skill)
    ).length;

    if (skillOverlap > 0 && skillOverlap < courseSkills.length) {
      // User has some of the skills already - good next step (+2 points)
      score += 2;
    } else if (skillOverlap === 0) {
      // User has none of the skills - could be a good new area (+1 point)
      score += 1;
    }
    // If skillOverlap === courseSkills.length, user already knows everything - no bonus

    // Rule 3: Learning goal keyword match in title/description (+2 points)
    if (
      learningGoal &&
      (courseTitle.includes(learningGoal) ||
        courseDescription.includes(learningGoal) ||
        learningGoal
          .split(" ")
          .some((word) => word.length > 3 && courseTitle.includes(word)))
    ) {
      score += 2;
    }

    return { ...course.toObject(), score };
  });

  // Step 3: Sort by score, descending (highest relevance first)
  scoredCourses.sort((a, b) => b.score - a.score);

  return scoredCourses;
};

module.exports = { getRecommendations };