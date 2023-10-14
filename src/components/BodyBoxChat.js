import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/messageBox";
import { ChatState } from "../store/ChatProvider";

const BodyBoxChat = ({ messages, isLoading }) => {
  const { user } = ChatState();
  return (
    <div className="p-2 relative max-h-[480px] mb-4">
      {isLoading ? (
        <div className="absolute animate-bounce w-6 h-6 top-[200px] left-[50%]">
          <i className="fas fa-download text-[32px] text-slate-500"></i>
        </div>
      ) : (
        <ScrollableFeed className="scrollbar">
          {messages &&
            messages.map((m, i) => {
              return (
                <div key={m._id} className="flex items-center gap-1">
                  {(isSameSender(messages, m, i, user._id) ||
                    isLastMessage(messages, i, user._id)) && (
                    <img
                      src={m.sender.pic}
                      alt="sender"
                      className="h-[30px] w-[30px] rounded-full"
                    />
                  )}
                  <span
                    className="py-1 px-2 rounded-md my-1"
                    style={{
                      backgroundColor: `${
                        m.sender._id === user._id ? "#bee3f8" : "#b9f5d0"
                      }`,
                      marginLeft: isSameSenderMargin(messages, m, i, user._id),
                      marginTop: isSameUser(messages, m, i, user._id),
                    }}
                  >
                    {m.content}
                  </span>
                </div>
              );
            })}
        </ScrollableFeed>
      )}
    </div>
  );
};

export default BodyBoxChat;
