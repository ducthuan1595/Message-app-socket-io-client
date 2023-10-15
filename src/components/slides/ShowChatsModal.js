import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Modal from "./Modal";
import { request } from "../../service";
import { ChatState } from "../../store/ChatProvider";
import ListUser from "../ListUser";
import UserBadge from "../UserBadge";
import handleToast from "../../util/toast";

const ShowChatsModal = ({ setOpen, isCreateChat }) => {
  const { user, token, setChat, onChat, setOnChat, setIsFetchChat } =
    ChatState();

  const [chatName, setChatName] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultSearchUser, setResultSearchUser] = useState([]);
  const [selectUser, setSelectUser] = useState(
    isCreateChat ? [] : onChat.users.filter((u) => u._id !== user._id)
  );

  const fetchUser = async () => {
    try {
      if (searchUser.trim() && token) {
        setIsLoading(true);
        const { data } = await request.searchUser(searchUser, token);
        if (data.message === "ok") {
          // const users = data.data.filter((u) => u._id !== user._id);
          setResultSearchUser(data.data);
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [searchUser]);

  const handleAddGroup = (user) => {
    const cpState = [...selectUser];
    const isExistUser = cpState.find(
      (u) => u._id.toString() === user._id.toString()
    );
    if (!isExistUser) {
      cpState.push(user);
    }

    setSelectUser(cpState);
  };

  const handleDeleteUser = (userId) => {
    let cpState = [...selectUser];
    cpState = cpState.filter(
      (user) => user._id.toString() !== userId.toString()
    );

    setSelectUser(cpState);
  };

  const handleCreateGroupChat = async () => {
    if (token && selectUser.length && chatName) {
      try {
        const { data } = await request.createGroupChat(
          { chatName, userId: selectUser },
          token
        );
        if (data.message === "ok") {
          setOpen(false);
          setChat((state) => [...state, data.data]);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      handleToast(toast.warn, "Miss value fields!");
    }
  };

  const handleLeaveGroup = async () => {
    if (token && onChat) {
      try {
        const { data } = await request.leaveGroupChat(
          { chatId: onChat._id },
          token
        );
        if (data.message === "ok") {
          setOnChat(null);
          setIsFetchChat((state) => !state);

          setOpen(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleUpdateChatName = async () => {
    if (token && chatName && onChat) {
      try {
        const { data } = await request.renameGroupChat(
          { chatName, chatId: onChat._id },
          token
        );
        if (data.message === "ok") {
          setOnChat(data.data);
          setOpen(false);

          setIsFetchChat((state) => !state);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleUpdateUser = async () => {
    if (token && selectUser.length > 1 && onChat) {
      try {
        const newArr = selectUser.map((user) => user._id);
        const { data } = await request.updateGroupChat(
          { userId: newArr, chatId: onChat._id },
          token
        );
        if (data.message === "ok") {
          setOpen(false);
          handleToast(toast.success, "Update users successfully");
          setIsFetchChat((state) => !state);
        } else {
          handleToast(
            toast.warn,
            "Must is be admin can update user in the group"
          );
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      handleToast(toast.warn, "Must more than 2 users!");
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0">
      <Modal setOpen={setOpen} />
      <div className="absolute w-[300px] md:w-[400px] mx-auto bg-white mt-[100px] transform-translate z-30 box-shadow rounded-md">
        <div className="p-2 px-4 flex flex-col items-center relative">
          <span
            className="absolute right-6 top-2 opacity-50 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <i className="fas fa-times"></i>
          </span>
          <h1 className="text-[22px] font-normal capitalize">
            {!isCreateChat ? onChat?.chatName : "Create Group Chat"}
          </h1>
          <div className="flex items-center gap-2 w-full">
            <input
              type="text"
              placeholder="Chat name"
              onChange={(e) => setChatName(e.target.value)}
              className="px-2 text-[12px] md:text-[15px] py-[3px] md:py-1 border-[1px] border-slate-300 rounded-sm outline-none my-2 w-full"
              value={chatName}
            />
            {!isCreateChat && (
              <button
                className="bg-orange-400 px-2 rounded-md h-[26px] md:h-[36px] text-[12px] md:text-[15px] text-white"
                onClick={handleUpdateChatName}
              >
                Update
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 w-full">
            <input
              type="text"
              placeholder="Add users eg: Jockes Abel Anna ..."
              className="px-2 text-[12px] md:text-[15px] py-[3px] md:py-1 border-[1px] border-slate-300 rounded-sm outline-none my-2 w-full"
              onChange={(e) => setSearchUser(e.target.value)}
            />
            {!isCreateChat && (
              <button
                className="bg-green-500 px-2 rounded-md text-white h-[26px] md:h-[36px] text-[12px] md:text-[15px]"
                onClick={handleUpdateUser}
              >
                Update
              </button>
            )}
          </div>
          <UserBadge
            selectUser={selectUser}
            isCreateChat={isCreateChat}
            handleDeleteUser={handleDeleteUser}
          />
          {!isLoading ? (
            resultSearchUser &&
            resultSearchUser.slice(0, 4).map((user) => {
              return (
                <ListUser
                  key={user._id}
                  user={user}
                  handleClick={() => handleAddGroup(user)}
                />
              );
            })
          ) : (
            <span className="animate-spin text-green-500">
              <i className="fas fa-spinner"></i>
            </span>
          )}
          <button
            className="text-white p-1 md:p-2 text-[13px] md:text-[16px] rounded-xl self-end mt-2"
            onClick={isCreateChat ? handleCreateGroupChat : handleLeaveGroup}
            style={{
              background: !isCreateChat ? "rgb(239 68 68)" : "rgb(34 197 94)",
            }}
          >
            {!isCreateChat ? "Leave Group" : "Create Group Chat"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowChatsModal;
