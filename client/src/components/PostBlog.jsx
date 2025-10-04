import React, { useState } from "react";

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    category: "",
    tags: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setShowPreview(true);

    // Reset form after 5 seconds
    setTimeout(() => {
      setFormData({
        title: "",
        description: "",
        author: "",
        category: "",
        tags: "",
        image: null,
      });
      setImagePreview(null);
      setSuccess(false);
      setShowPreview(false);
    }, 5000);
  };

  const { title, description, author, category, tags } = formData;
  const tagList = tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-pink-300 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl w-full max-w-xl p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-purple-700">
          ✍️ Post a Blog
        </h1>

        {success && (
          <div className="success-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg animate-slideIn">
            <strong>Success!</strong> Your blog post has been created
            successfully!
          </div>
        )}

        {/* Title */}
        <div className="form-field">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300"
            required
          />
        </div>

        {/* Description */}
        <div className="form-field">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Write your blog content..."
            rows="5"
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300 resize-none"
            required
          ></textarea>
          <div
            className={`text-xs mt-1 text-right ${
              description.length > 500 ? "text-red-500" : "text-gray-500"
            }`}
          >
            {description.length} characters
          </div>
        </div>

        {/* Author */}
        <div className="form-field">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Author (Optional)
          </label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300"
          />
        </div>

        {/* Category */}
        <div className="form-field">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <select
            name="category"
            value={category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300"
            required
          >
            <option value="">Select Category</option>
            <option value="Legal Rights">Legal Rights</option>
            <option value="My Experience">My Experience</option>
            <option value="Safety Tips">Safety Tips</option>
            <option value="Health">Health</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Tags */}
        <div className="form-field">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={tags}
            onChange={handleChange}
            placeholder="Comma separated tags (e.g., health, tips, lifestyle)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300"
          />
        </div>

        {/* Image Upload */}
        <div className="form-field">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Featured Image (Optional)
          </label>
          <div className="relative">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-all duration-300"
            />
          </div>
          {imagePreview && (
            <div className="mt-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-btn w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-300"
        >
          📝 Publish Blog Post
        </button>

        {/* Blog Preview */}
        {showPreview && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              📖 Blog Preview
            </h3>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="text-xl font-bold text-gray-800 mb-2">{title}</h4>
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <span className="mr-4">👤 {author || "Anonymous"}</span>
                <span className="mr-4">📅 {currentDate}</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                  {category}
                </span>
              </div>
              {imagePreview && (
                <div className="mb-3">
                  <img
                    src={imagePreview}
                    alt="Blog"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}
              <p className="text-gray-700 leading-relaxed mb-3">
                {description}
              </p>
              {tagList.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tagList.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BlogForm;
