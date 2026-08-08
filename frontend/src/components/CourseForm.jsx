import { useState, useEffect } from "react";

const emptyCourse = {
  title: "",
  description: "",
  category: "",
  difficulty: "Beginner",
  duration: "",
  instructor: "",
  skillsCovered: "",
  thumbnail: "",
  courseLink: "",
};

const CourseForm = ({ initialData, onSubmit, submitLabel }) => {
  const [formData, setFormData] = useState(emptyCourse);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        skillsCovered: (initialData.skillsCovered || []).join(", "),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const payload = {
        ...formData,
        skillsCovered: formData.skillsCovered
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0),
      };
      await onSubmit(payload);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save course.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded text-sm">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="e.g. Web Dev"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Duration</label>
          <input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            placeholder="e.g. 40 hours"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Instructor</label>
          <input
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Skills Covered (comma-separated)
        </label>
        <input
          name="skillsCovered"
          value={formData.skillsCovered}
          onChange={handleChange}
          placeholder="e.g. HTML, CSS, JavaScript"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
        <input
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          placeholder="https://..."
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Course Link</label>
        <input
          name="courseLink"
          value={formData.courseLink}
          onChange={handleChange}
          required
          placeholder="https://..."
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
};

export default CourseForm;