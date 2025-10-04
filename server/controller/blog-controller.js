import Blog from "../schema/blog.js";
import categories from "../config/catagories.js";

// CREATE a blog
export const createBlog = async (req, res) => {
  try {
    const { title, description, author, category, tags } = req.body;

    if (!categories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const blog = new Blog({
      title,
      description,
      author: author || "Anonymous",
      category,
      tags: tags ? tags.split(",") : [],
      image: req.file ? req.file.path : "",
    });

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all blogs
export const getBlogs = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single blog
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LIKE a blog (increment)
export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    blog.likes += 1;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD a comment
export const addComment = async (req, res) => {
  try {
    const { user, comment } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    blog.comments.push({ user: user || "Anonymous", comment });
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
