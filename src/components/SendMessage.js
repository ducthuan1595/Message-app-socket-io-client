import React, { useEffect, useState } from "react";
import { ChatState } from "../store/ChatProvider";
import { request, url } from "../service";

const SendMessage = ({ setMessages, socket, handleTyping }) => {
  const { token, onChat } = ChatState();
  const [content, setContent] = useState("");

  const handleSendMessage = async (e) => {
    if (content.trim() && token && onChat) {
      socket.emit("stop typing", onChat._id);
      try {
        const { data } = await request.sendMessage(
          { content, chatId: onChat._id },
          token
        );
        if (data.message === "ok") {
          socket.emit("new message", data.data);
          setMessages((state) => [...state, data.data]);
          setContent("");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleContent = (e) => {
    setContent(e.target.value);

    handleTyping();
  };

  return (
    <div className="flex justify-between p-2 rounded-md bg-slate-300 w-full gap-2 self-end">
      <input
        type="text"
        placeholder="Enter a message"
        className="w-full outline-none p-2 rounded-md"
        onChange={handleContent}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        value={content}
      />
      <button className="px-2" onClick={handleSendMessage}>
        <i className="fas fa-paper-plane text-green-600 text-[20px]"></i>
      </button>
    </div>
  );
};

export default SendMessage;
