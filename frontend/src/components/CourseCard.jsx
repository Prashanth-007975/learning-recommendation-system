const CourseCard = ({ course }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      {course.thumbnail && (
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-32 object-cover rounded mb-3"
          onError={(e) => (e.target.style.display = "none")}
        />
      )}
      <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{course.description}</p>

      <div className="flex flex-wrap gap-2 mb-3 text-xs">
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {course.category}
        </span>
        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
          {course.difficulty}
        </span>
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
          {course.duration}
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-3">By {course.instructor}</p>

      <a
        href={course.courseLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
      >
        View Course
      </a>
    </div>
  );
};

export default CourseCard;