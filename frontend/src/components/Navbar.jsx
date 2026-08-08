import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/courses", label: "Browse Courses" },
    { to: "/profile", label: "Profile" },
  ];

  if (user?.role === "admin") {
    navLinks.push({ to: "/admin/courses", label: "Manage Courses" });
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-8 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="font-bold text-lg text-blue-600">
          LearnPath
        </Link>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                isActive(link.to)
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <span className="text-sm text-gray-500 hidden sm:inline">
              {user?.name}
            </span>
            <button
              onClick={logout}
              className="text-sm bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;