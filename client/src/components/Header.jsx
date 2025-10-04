import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Update state if localStorage changes (optional for live updates)
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="gradient-bg shadow-lg sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-pink-500 font-bold text-xl">🛡</span>
          </div>
          <span className="text-white font-bold text-xl">
            <Link to="/">SafeGuard</Link>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/blog" className="text-white hover:text-pink-200 font-medium">Blog</Link>
          <Link to="/tutorials" className="text-white hover:text-pink-200 font-medium">Video Tutorial</Link>
          <Link to="/speedlist" className="text-white hover:text-pink-200 font-medium">Speed List</Link>
          <Link to="/travel" className="text-white hover:text-pink-200 font-medium">TravelCompanion</Link>
          <Link to="/sos">
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold animate-pulse">
              🆘 SOS
            </button>
          </Link>
        </nav>

        {/* Login / Logout */}
        <div className="flex items-center space-x-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 bg-white text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-full font-medium transition"
            >
              <span>Logout</span>
              <FaSignOutAlt className="w-5 h-5" />
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-white text-purple-600 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-50 hover:text-white px-6 py-2 rounded-full font-medium transition-all"
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
