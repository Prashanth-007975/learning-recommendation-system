import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import courseService from "../services/courseService";
import CourseCard from "../components/CourseCard";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [allCategories, setAllCategories] = useState([]);

  // Fetch ALL courses once on mount, just to build the category dropdown list
  useEffect(() => {
    const fetchAllForFilters = async () => {
      try {
        const data = await courseService.getCourses();
        const categories = [...new Set(data.map((c) => c.category))];
        setAllCategories(categories);
      } catch (err) {
        console.error("Failed to load filter options", err);
      }
    };
    fetchAllForFilters();
  }, []);

  // Debounced fetch whenever search/category/difficulty changes
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const params = {};
        if (search) params.search = search;
        if (category) params.category = category;
        if (difficulty) params.difficulty = difficulty;

        const data = await courseService.getCourses(params);
        setCourses(data);
      } catch (err) {
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    }, 400); // wait 400ms after the user stops typing/changing filters

    return () => clearTimeout(timeoutId);
  }, [search, category, difficulty]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setDifficulty("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Browse Courses</h1>
          <Link to="/dashboard" className="text-blue-600 hover:underline text-sm">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by course title..."
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="min-w-[160px]">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-[160px]">
            <label className="block text-sm font-medium mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {(search || category || difficulty) && (
            <button
              onClick={clearFilters}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-sm"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Results */}
        {loading && <p className="text-gray-500">Loading courses...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && courses.length === 0 && (
          <p className="text-gray-500">No courses match your search/filters.</p>
        )}

        {!loading && !error && courses.length > 0 && (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Showing {courses.length} course{courses.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;