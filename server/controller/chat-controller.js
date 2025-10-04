import Chat from "../schema/chat-schema.js";

// Send message
export const sendMessage = async (req, res) => {
  try {
    const { text, replyTo } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    const newMsg = await Chat.create({
      text,
      user: req.user._id,
      replyTo: replyTo || null,
    });

    await newMsg.populate("user", "name"); 
    if (newMsg.replyTo) await newMsg.populate("replyTo", "text");

    res.status(201).json(newMsg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Chat.find()
      .populate("user", "name")
      .populate("replyTo", "text")
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

// Delete message (only by owner)
export const deleteMessage = async (req, res) => {
  try {
    const msg = await Chat.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: "Message not found" });

    if (msg.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own messages" });
    }

    await Chat.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted", _id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete message" });
  }
};