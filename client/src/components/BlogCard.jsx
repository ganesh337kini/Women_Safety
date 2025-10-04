// BlogCard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api.js";
import { Heart, MessageCircle } from "lucide-react"; // outline heart from lucide

export default function BlogCard({ blog, refresh }) {
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(blog.comments || []);
  const [commentText, setCommentText] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Toggle Like
  const handleLike = async () => {
    try {
      await API.put(`/blogs/like/${blog._id}`);
      setLiked(!liked);
      if (refresh) refresh();
    } catch (err) {
      console.error(err);
    }
  };

  // Add Comment
  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await API.post(`/blogs/comment/${blog._id}`, {
        user: "Anonymous",
        comment: commentText,
      });
      setComments(res.data.comments);
      setCommentText("");
      if (refresh) refresh();
    } catch (err) {
      console.error(err);
    }
  };
console.log(blog);
  return (
    <>
      {/* Blog Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.03 }}
        className="rounded-2xl overflow-hidden shadow-lg 
          bg-gradient-to-br from-white via-pink-50 to-pink-200 
          border border-pink-400/30 
          hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] 
          transition-all duration-500"
      >
        {/* Blog Image */}
        <div className="overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
            src={
              blog.image ||
              "https://via.placeholder.com/400x200.png?text=No+Image"
            }
            alt={blog.title}
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Blog Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-black mb-1">{blog.title}</h3>
          <p className="text-sm text-pink-700 mb-2">
            By: {blog.author || "Anonymous"}
          </p>
          <p className="text-black text-sm mb-4 line-clamp-3">
            {blog.description}
          </p>

          {/* Buttons */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex space-x-3">
              {/* Comment Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-1 px-3 py-1 rounded-lg 
             bg-gradient-to-r from-purple-600/60 to-purple-500/50
             text-white text-sm font-medium 
             hover:from-purple-600/70 hover:to-purple-600/70 
             transition-all duration-300 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{comments.length}</span>
              </motion.button>

              {/* Like Button */}
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={handleLike}
                className="relative flex items-center justify-center w-10 h-10 rounded-full 
             bg-white shadow-md border border-pink-300 cursor-pointer"
              >
                <motion.div
                  key={liked ? "filled" : "outline"} // trigger animation on toggle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.3, ease: "backOut" }}
                  className="absolute"
                >
                  <Heart
                    size={22}
                    className={`transition-colors duration-300 ${
                      liked ? "fill-red-500 text-red-500" : "text-gray-400"
                    }`}
                  />
                </motion.div>

                {/* Spark effect when liked */}
                {liked && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute w-6 h-6 rounded-full border-2 border-pink-400"
                  />
                )}
              </motion.button>
            </div>

            {/* Read More Button (opens modal) */}
            <button
              onClick={() => setShowModal(true)}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-semibold 
                         bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md
                         hover:shadow-lg hover:shadow-pink-600/50 transition-all duration-500 whitespace-nowrap"
            >
              Read More →
            </button>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-white via-pink-50 to-pink-200 
              rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6"
          >
            {/* Close Button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-pink-800">{blog.title}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-pink-600 text-xl"
              >
                ✖
              </button>
            </div>

            <img
              src={
                blog.image ||
                "https://via.placeholder.com/400x200.png?text=No+Image"
              }
              alt={blog.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            <p className="text-gray-800 mb-4">{blog.description}</p>

            {/* Comments Section */}
            <div className="border-t border-pink-300 pt-3">
              <h3 className="text-lg font-semibold text-pink-700 mb-2">
                Comments ({comments.length})
              </h3>

              {comments.length === 0 && (
                <p className="text-gray-500">No comments yet.</p>
              )}

              {comments.map((c, idx) => (
                <div
                  key={idx}
                  className="mb-2 bg-white/60 rounded-lg px-3 py-2 shadow-sm"
                >
                  <span className="font-semibold text-pink-800">{c.user}:</span>{" "}
                  {c.comment}
                </div>
              ))}

              {/* Add Comment */}
              <div className="flex mt-3 space-x-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="border border-pink-400/50 p-2 rounded-lg w-full 
                    focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddComment}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 
                    text-white px-4 py-1 rounded-lg shadow hover:opacity-90 transition text-sm"
                >
                  Send
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
