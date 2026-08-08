import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import courseService from "../services/courseService";
import CourseForm from "../components/CourseForm";

const AdminCoursesPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await courseService.getCourses();
      setCourses(data);
    } catch (err) {
      setError("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = async (payload) => {
    await courseService.createCourse(payload);
    setShowForm(false);
    fetchCourses();
  };

  const handleUpdate = async (payload) => {
    await courseService.updateCourse(editingCourse._id, payload);
    setEditingCourse(null);
    fetchCourses();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await courseService.deleteCourse(id);
      fetchCourses();
    } catch (err) {
      alert("Failed to delete course.");
    }
  };

  // Guard: only admins should see this page's content
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Courses</h1>
          {!showForm && !editingCourse && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              + Add Course
            </button>
          )}
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">New Course</h2>
            <CourseForm onSubmit={handleCreate} submitLabel="Create Course" />
            <button
              onClick={() => setShowForm(false)}
              className="text-sm text-gray-500 hover:underline mt-3"
            >
              Cancel
            </button>
          </div>
        )}

        {editingCourse && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Edit Course</h2>
            <CourseForm
              initialData={editingCourse}
              onSubmit={handleUpdate}
              submitLabel="Update Course"
            />
            <button
              onClick={() => setEditingCourse(null)}
              className="text-sm text-gray-500 hover:underline mt-3"
            >
              Cancel
            </button>
          </div>
        )}

        {loading && <p className="text-gray-500">Loading courses...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-sm divide-y">
            {courses.map((course) => (
              <div
                key={course._id}
                className="p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{course.title}</p>
                  <p className="text-sm text-gray-500">
                    {course.category} · {course.difficulty}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingCourse(course);
                      setShowForm(false);
                    }}
                    className="text-sm bg-gray-200 px-3 py-1.5 rounded hover:bg-gray-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="text-sm bg-red-100 text-red-700 px-3 py-1.5 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCoursesPage;