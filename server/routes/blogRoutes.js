import express from "express";
import multer from "multer";
import {
  createBlog,
  getBlogs,
  getBlogById,
  likeBlog,
  addComment,
} from "../controller/blog-controller.js";

const router = express.Router();

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Blog Routes
router.post("/", upload.single("image"), createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.put("/like/:id", likeBlog);
router.post("/comment/:id", addComment);

export default router;
