import React, { useState } from "react";
import Chat from "../components/Chat";
import { FaComments, FaTimes } from "react-icons/fa";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Chat toggle button */}
      {!open && (
        <button
          className="fixed cursor-pointer bottom-5 right-5 bg-pink-500 text-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg hover:bg-pink-600 z-50 transition-transform duration-300"
          onClick={() => setOpen(true)}
        >
          <FaComments size={30} />
        </button>
      )}

      {/* Chat panel */}
      <div
        className={`fixed bottom-20 right-5 w-80 h-96 bg-white border border-gray-300 shadow-xl rounded-xl flex flex-col transition-transform duration-300 z-40 ${
          open
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {open && (
          <div className="flex-1 overflow-hidden">
            <Chat setOpen={setOpen} open={open} />
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWidget;
