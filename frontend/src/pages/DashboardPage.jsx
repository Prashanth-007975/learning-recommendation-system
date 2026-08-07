import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import userService from "../services/userService";
import recommendationService from "../services/recommendationService";
import CourseCard from "../components/CourseCard";

const DashboardPage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendationsError, setRecommendationsError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const profileData = await userService.getProfile();
        setProfile(profileData);
      } catch (err) {
        console.error("Failed to load profile", err);
      }

      try {
        const recsData = await recommendationService.getRecommendations();
        setRecommendations(recsData);
      } catch (err) {
        console.error("Failed to load recommendations", err);
        setRecommendationsError("Could not load recommendations right now.");
      }

      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const completedCount = profile?.completedCourses?.length || 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 text-sm">{user?.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-3xl font-bold text-blue-600">{completedCount}</p>
            <p className="text-sm text-gray-600">Courses Completed</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-3xl font-bold text-purple-600">
              {profile?.skills?.length || 0}
            </p>
            <p className="text-sm text-gray-600">Skills Listed</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-3xl font-bold text-green-600">
              {profile?.interests?.length || 0}
            </p>
            <p className="text-sm text-gray-600">Interests</p>
          </div>
        </div>

        {profile?.learningGoal && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <h2 className="text-sm font-semibold text-gray-500 mb-1">
              Your Learning Goal
            </h2>
            <p className="text-gray-800">{profile.learningGoal}</p>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Recommended For You</h2>

          {recommendationsError && (
            <p className="text-red-600 text-sm mb-4">{recommendationsError}</p>
          )}

          {!recommendationsError && recommendations.length === 0 && (
            <p className="text-gray-500 text-sm">
              No recommendations yet — try adding some skills and interests in
              your profile!
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>

        {completedCount > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Recently Completed</h2>
            <div className="flex flex-wrap gap-2">
              {profile.completedCourses.map((courseTitle) => (
                <span
                  key={courseTitle}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  ✓ {courseTitle}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;