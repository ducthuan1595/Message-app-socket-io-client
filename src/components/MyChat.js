import React, { useState, useEffect } from "react";

import { request } from "../service";
import { ChatState } from "../store/ChatProvider";
import ListUser from "./ListUser";
import ShowChatsModal from "./slides/ShowChatsModal";

const MyChat = () => {
  const { chat, setOnChat, user, isOpenMyChat, setOpenMyChat } = ChatState();

  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [nameChat, setNameChat] = useState("");

  const handleChat = (chat) => {
    setOnChat(chat);
    setNameChat(chat._id);
    setOpenMyChat(false);
  };

  return (
    <>
      {isOpenMyChat && (
        <div className="absolute top-[60px] z-10 left-0 bottom-0 bg-white p-2 h-[89vh] w-[300px] md:w-[400px] m-2 rounded-md box-shadow">
          <div className="flex items-center justify-between p-2 mb-2">
            <h1 className="text-[20px] font-normal">My Chats</h1>

            <button
              className="bg-slate-300 px-2 py-1 rounded-md"
              onClick={() => {
                setOpenCreateGroup(true);
              }}
            >
              New Group Chat
              <i className="fas fa-plus ml-2"></i>
            </button>
          </div>
          <div className="p-2 h-[80vh] scrollbar">
            {chat &&
              chat.map((c) => {
                let num = 0;
                return (
                  <div
                    key={c._id}
                    className="bg-slate-300 p-2 my-2 rounded-md hover:text-white hover:bg-green-600 cursor-pointer flex gap-2"
                    onClick={() => handleChat(c)}
                    style={{
                      backgroundColor: `${nameChat === c._id ? "#22c55e" : ""}`,
                      color: `${nameChat === c._id ? "#fff" : ""}`,
                    }}
                  >
                    <div className="flex flex-wrap w-[60px] items-center justify-center">
                      {c.users
                        .filter((u) => u._id !== user._id)
                        .slice(0, 3)
                        .map((u) => {
                          num = ++num;
                          return (
                            <div key={u._id}>
                              <img
                                src={u.pic}
                                alt={u.name}
                                className="w-[30px] h-[30px] rounded-full"
                              />
                            </div>
                          );
                        })}
                      {num > 2 && (
                        <span className="w-[30px] h-[30px] rounded-full bg-white text-center text-slate-300">
                          <i className="fas fa-plus mt-2 font-extralight text-[12px] text-center"></i>
                        </span>
                      )}
                    </div>
                    <div>
                      {c.users.length > 2
                        ? c.chatName
                        : c.users.filter(
                            (u) => u._id.toString() !== user._id.toString()
                          )[0].name}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <div className="hidden md:block bg-white p-2 h-[89vh] md:w-[300px] xl:w-[400px] m-2 rounded-md">
        <div className="flex items-center justify-between p-2 mb-2">
          <h1 className="md:text-[20px] xl:text-[24px] font-normal">
            My Chats
          </h1>

          <button
            className="bg-slate-300 px-2 py-1 rounded-md"
            onClick={() => setOpenCreateGroup(true)}
          >
            New Group Chat
            <i className="fas fa-plus ml-2"></i>
          </button>
        </div>
        <div className="p-2 h-[80vh] scrollbar">
          {chat &&
            chat.map((c) => {
              let num = 0;
              return (
                <div
                  key={c._id}
                  className="bg-slate-300 p-2 my-2 rounded-md hover:text-white hover:bg-green-600 cursor-pointer flex gap-2"
                  onClick={() => handleChat(c)}
                  style={{
                    backgroundColor: `${nameChat === c._id ? "#22c55e" : ""}`,
                    color: `${nameChat === c._id ? "#fff" : ""}`,
                  }}
                >
                  <div className="flex flex-wrap w-[60px] items-center justify-center">
                    {c.users
                      .filter((u) => u._id !== user._id)
                      .slice(0, 3)
                      .map((u) => {
                        num = ++num;
                        return (
                          <div key={u._id}>
                            <img
                              src={u.pic}
                              alt={u.name}
                              className="w-[30px] h-[30px] rounded-full"
                            />
                          </div>
                        );
                      })}
                    {num > 2 && (
                      <span className="w-[30px] h-[30px] rounded-full bg-white text-center text-slate-300">
                        <i className="fas fa-plus mt-2 font-extralight text-[12px] text-center"></i>
                      </span>
                    )}
                  </div>
                  <div>
                    {c.users.length > 2
                      ? c.chatName
                      : c.users.filter(
                          (u) => u._id.toString() !== user._id.toString()
                        )[0].name}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {openCreateGroup && (
        <ShowChatsModal setOpen={setOpenCreateGroup} isCreateChat={true} />
      )}
    </>
  );
};

export default MyChat;
