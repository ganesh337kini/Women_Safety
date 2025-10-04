import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // get logged-in user

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="gradient-bg shadow-lg sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center space-x-2"
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-pink-500 font-bold text-xl">🛡</span>
          </div>
          <span className="text-white font-bold text-xl">SafeGuard</span>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-8">
          {[
            { to: "/blog", label: "Blog" },
            { to: "/tutorials", label: "Video Tutorial" },
            { to: "/speedlist", label: "Speed List" },
            { to: "/travel", label: "TravelCompanion" },
          ].map((link, i) => (
            <motion.div key={i} whileHover={{ scale: 1.1 }}>
              <Link
                to={link.to}
                className="text-white hover:text-pink-200 font-medium"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <Link to="/sos">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold animate-pulse"
            >
              🆘 SOS
            </motion.button>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              {/* User Avatar */}
              <div className="w-10 h-10 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold text-lg">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}{" "}
              </div>
              <span className="text-white font-medium">{user.username}</span>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-white text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-full font-medium transition"
              >
                <span>Logout</span>
                <FaSignOutAlt className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-purple-600 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-50 hover:text-white px-6 py-2 rounded-full font-medium transition-all"
            >
              Login/Sign Up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;