import React, { useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api.js";
import { Heart, MessageCircle } from "lucide-react";

export default function BlogCard({ blog, refresh }) {
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(blog.comments || []);
  const [commentText, setCommentText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleLike = async () => {
    try {
      await API.put(`/blogs/like/${blog._id}`);
      setLiked(!liked);
      if (refresh) refresh();
    } catch (err) {
      console.error(err);
    }
  };

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

  return (
    <>
      <motion.div
        className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-white via-pink-50 to-pink-200 border border-pink-400/30 p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Blog Content */}
        <h3 className="text-lg sm:text-xl font-bold text-black mb-1">{blog.title}</h3>
        <p className="text-sm sm:text-base text-pink-700 mb-2">By: {blog.author || "Anonymous"}</p>
        <p className="text-black text-sm sm:text-base mb-3 line-clamp-3">{blog.description}</p>

        {/* Actions */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex space-x-3">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-purple-500 text-white"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{comments.length}</span>
            </button>

            <button
              onClick={handleLike}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-pink-300"
            >
              <Heart size={22} className={`${liked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
            </button>
          </div>

          {/* Read More */}
          <button
            onClick={() => setShowModal(true)}
            className="px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md hover:shadow-lg"
          >
            Read More →
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-white via-pink-50 to-pink-200 rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6"
          >
            {/* Close */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-pink-800">{blog.title}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-600 hover:text-pink-600 text-xl">
                ✖
              </button>
            </div>

            {/* Full Description */}
            <p className="text-gray-800 mb-4">{blog.description}</p>

            {/* Comments */}
            <div className="border-t border-pink-300 pt-3">
              <h3 className="text-lg font-semibold text-pink-700 mb-2">
                Comments ({comments.length})
              </h3>

              {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}

              {comments.map((c, idx) => (
                <div key={idx} className="mb-2 bg-white/60 rounded-lg px-3 py-2 shadow-sm">
                  <span className="font-semibold text-pink-800">{c.user}:</span> {c.comment}
                </div>
              ))}

              {/* Add Comment */}
              <div className="flex mt-3 space-x-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="border border-pink-400/50 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button
                  onClick={handleAddComment}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-lg shadow hover:opacity-90 transition text-sm"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
