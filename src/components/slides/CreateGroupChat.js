import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Modal from "./Modal";
import { request } from "../../service";
import { ChatState } from "../../store/ChatProvider";
import ListUser from "../ListUser";
import UserBadge from "../UserBadge";
import handleToast from "../../util/toast";

const CreateGroupChat = ({ setOpenCreateGroup }) => {
  const { token } = ChatState();

  const [chatName, setChatName] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultSearchUser, setResultSearchUser] = useState([]);
  const [selectUser, setSelectUser] = useState([]);

  const fetchUser = async () => {
    try {
      if (searchUser.trim() && token) {
        setIsLoading(true);
        const { data } = await request.searchUser(searchUser, token);
        if (data.message === "ok") {
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
          setOpenCreateGroup(false);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      handleToast(toast.warn, "Miss value fields!");
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0">
      <Modal setOpenCreateGroup={setOpenCreateGroup} />
      <div className="absolute w-[400px] mx-auto bg-white mt-[100px] transform-translate z-30 box-shadow rounded-md">
        <div className="p-2 px-4 flex flex-col items-center relative">
          <span
            className="absolute right-6 top-2 opacity-50 cursor-pointer"
            onClick={() => setOpenCreateGroup(false)}
          >
            <i className="fas fa-times"></i>
          </span>
          <h1 className="text-[22px] font-normal">Create Group Chat</h1>
          <input
            type="text"
            placeholder="Chat name"
            onChange={(e) => setChatName(e.target.value)}
            className="px-2 py-1 border-[1px] border-slate-300 rounded-sm outline-none my-2 w-full"
            value={chatName}
          />
          <input
            type="text"
            placeholder="Add users eg: Jockes Abel Anna ..."
            className="px-2 py-1 border-[1px] border-slate-300 rounded-sm outline-none my-2 w-full"
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <UserBadge
            selectUser={selectUser}
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
            className="bg-green-700 text-white p-2 rounded-xl self-end mt-2"
            onClick={handleCreateGroupChat}
          >
            Create Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupChat;
