import express from "express";
import { sendMessage, getMessages, deleteMessage } from "../controller/chat-controller.js";
import { protect } from "../middleware/auth-middleware.js";

const router = express.Router();

router.post("/send", protect, sendMessage);
router.get("/get", protect, getMessages);
router.delete("/delete/:id", protect, deleteMessage);

export default router;
