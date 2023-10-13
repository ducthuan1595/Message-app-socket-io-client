import React, { useState, useEffect } from "react";

import { request } from "../service";
import { ChatState } from "../store/ChatProvider";
import ListUser from "./ListUser";
import CreateGroupChat from "./slides/CreateGroupChat";

const MyChat = () => {
  const { chat } = ChatState();

  const [openCreateGroup, setOpenCreateGroup] = useState(false);

  console.log({ chat });
  return (
    <>
      <div className="bg-white p-2 h-[90vh] w-[400px] m-2 rounded-md">
        <div className="flex items-center justify-between p-2 mb-2">
          <h1 className="text-[24px] font-normal">My Chats</h1>

          <button
            className="bg-slate-300 px-2 py-1 rounded-md"
            onClick={() => setOpenCreateGroup(true)}
          >
            New Group Chat
            <i className="fas fa-plus ml-2"></i>
          </button>
        </div>
        <div className="p-2">
          {chat &&
            chat.map((c) => {
              return (
                <div
                  key={c._id}
                  className="bg-slate-300 p-2 my-2 rounded-md hover:text-white hover:bg-green-600 cursor-pointer"
                >
                  <div>{c.chatName}</div>
                </div>
              );
            })}
        </div>
      </div>
      {openCreateGroup && (
        <CreateGroupChat setOpenCreateGroup={setOpenCreateGroup} />
      )}
    </>
  );
};

export default MyChat;
