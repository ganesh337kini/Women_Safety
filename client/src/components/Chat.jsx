import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { FaReply } from "react-icons/fa";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000");

const Chat = ({ setOpen, open }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [replyTo, setReplyTo] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const userId = user?.id || user?._id;

  // Fetch messages
  const fetchMessages = async () => {
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:5000/api/chat/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [token]);

  // Socket listeners
  useEffect(() => {
    if (!token) return;
    const handleMessage = (msg) => setMessages((prev) => [...prev, msg]);
    const handleDelete = () => fetchMessages();

    socket.on("chat message", handleMessage);
    socket.on("delete message", handleDelete);

    return () => {
      socket.off("chat message", handleMessage);
      socket.off("delete message", handleDelete);
    };
  }, [token]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !token) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat/send",
        {
          text: message,
          replyTo,
          user: userId, // 👈 yaha userId bhi bhejna hoga
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      socket.emit("chat message", res.data);
      setMessage("");
      setReplyTo(null);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const deleteMessage = async (id) => {
    if (!id || !token) return;
    try {
      await axios.delete(`http://localhost:5000/api/chat/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      socket.emit("delete message", id);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  if (!open) return null;

  return (
    <div className="flex flex-col h-full w-full bg-pink-50 rounded-lg overflow-hidden shadow-lg">
      {/* Header with cross button */}
      <div className="flex justify-between items-center bg-pink-200 p-3 border-b border-pink-300">
        <h2 className="font-semibold text-gray-700">Chat</h2>
        <button
          onClick={() => setOpen(false)}
          className="cursor-pointer text-gray-600 hover:text-gray-800"
        >
          <AiOutlineClose size={20} />
        </button>
      </div>

      {/* Main area */}
      {!token ? (
        <div className="flex flex-col items-center justify-center flex-1 p-6">
          <h2 className="text-gray-700 font-semibold text-lg mb-4">
            You need to login
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
          >
            Sign Up / Login
          </button>
        </div>
      ) : (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={msg._id || index}
                className="p-2 bg-pink-100 rounded-md"
              >
                {msg.replyTo && (
                  <div className="text-xs text-gray-500 mb-1">
                    Replying to: {msg.replyTo.text || "deleted"}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">
                    {msg.user?.name || "Unknown"}:
                  </span>
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => setReplyTo(msg._id)}
                    >
                      <FaReply size={16} />
                    </button>
                    {msg.user?._id === userId && (
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => deleteMessage(msg._id)}
                      >
                        <AiFillDelete size={16} />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-gray-800">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Replying info */}
          {replyTo && (
            <div className="text-sm text-blue-600 p-2 border-t border-pink-300">
              Replying to:{" "}
              {messages.find((m) => m._id === replyTo)?.text || "deleted"}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="flex justify-center items-center p-3 border-t border-pink-300 bg-pink-100"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-[90%] px-3 py-2 rounded-l-md border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded-r-md hover:bg-pink-600"
            >
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Chat;
