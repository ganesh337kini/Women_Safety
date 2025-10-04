// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "../config/catagories.js";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar({ onCategorySelect, onSearch, currentCategory }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      onCategorySelect("All");
    } else {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <div className="w-full mt-6 sm:mt-10">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-5xl rounded-full px-4 sm:px-6 py-2 sm:py-3
                   backdrop-blur-md bg-gray-900/30 border border-rose-400
                   shadow-md flex items-center justify-between gap-4"
      >
        {/* Categories (desktop) */}
        <nav className="hidden lg:flex flex-wrap gap-3 justify-center">
          {/* "All" button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => onCategorySelect("All")}
            className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all
              ${currentCategory === "All"
                ? "bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg"
                : "bg-gray-800/40 text-white hover:bg-gradient-to-r hover:from-rose-400 hover:to-pink-500 hover:text-white"}`
            }
          >
            All
          </motion.button>

          {categories.map((cat, index) => (
  <motion.button
    key={cat}
    whileHover={{ scale: 1.05 }}
    transition={{ delay: 0.03 * index }}
    onClick={() => onCategorySelect(cat)}
    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all
      ${
        currentCategory === cat
          ? "bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg"
          : "bg-gray-800/40 text-white hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 hover:text-white"
      }`}
  >
    {cat}
  </motion.button>
))}
          
        </nav>

        {/* Right Side: Search + Post */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Search */}
          <div className="flex items-center border border-rose-400/50 rounded-full overflow-hidden backdrop-blur-sm bg-gray-800/40">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                if (value.trim() === "") onCategorySelect("All");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="px-3 sm:px-3 py-1 bg-transparent focus:outline-none text-xs sm:text-sm text-white placeholder-white w-24 sm:w-32 md:w-40"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium 
                         bg-gradient-to-r from-rose-400 to-pink-500 text-white
                         rounded-r-full transition-all"
            >
              Go
            </motion.button>
          </div>

          {/* Post Blog Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/create"
              className="px-4 sm:px-4 py-2 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-semibold 
                         bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md
                         hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-500 whitespace-nowrap"
            >
              Post Blog
            </Link>
          </motion.div>

          {/* Mobile menu toggle */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white"
          >
            {isOpen ? (
              <FiX className="h-6 w-6 text-rose-400" />
            ) : (
              <FiMenu className="h-6 w-6 text-rose-400" />
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full lg:hidden mt-3 px-4 py-3 space-y-2 rounded-2xl 
                     bg-gray-900/30 backdrop-blur-md border border-rose-400"
        >
          <button
            onClick={() => onCategorySelect("All")}
            className={`block w-full text-sm font-medium px-3 py-1 rounded-full transition-all
              ${currentCategory === "All"
                ? "bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg"
                : "bg-pink-200/30 text-purple-800 hover:bg-gradient-to-r hover:from-rose-400 hover:to-pink-500 hover:text-white"}`
            }
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategorySelect(cat)}
              className={`block w-full text-sm font-medium px-3 py-1 rounded-full transition-all
                ${currentCategory === cat
                  ? "bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg"
                  : "bg-purple-200/30 text-white hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 hover:text-white truncate"}`
              }
            >
              {cat}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
