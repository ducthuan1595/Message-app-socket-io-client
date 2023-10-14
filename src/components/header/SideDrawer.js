import React, { useState } from "react";
import { ChatState } from "../../store/ChatProvider";
import { useNavigate } from "react-router-dom";
import { ProfileModal } from "../slides/ProfileModal";
import { SearchUserModal } from "./SearchUserModal";
import { getSender } from "../../config/messageBox";

const SideDrawer = () => {
  const { user, setUser, setToken, setOnChat, notification, setNotification } =
    ChatState();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user-chat");
    localStorage.removeItem("token-chat");
    navigate("/login");
  };

  console.log({ user });
  return (
    <div className="flex justify-between items-center bg-[white]">
      <button
        className="flex items-center gap-2 py-3 px-4"
        onClick={() => setOpenSearch(true)}
      >
        <i className="fas fa-search"></i>
        <span>Search User</span>
      </button>
      <h2 className="font-semibold">TALK WITH ME</h2>
      <div className="flex items-center px-4 py-3 gap-4">
        <div className="group after-bridge relative">
          <i className="fas fa-bell cursor-pointer text-[19px] relative"></i>
          {notification.length > 0 && (
            <span className="absolute top-[-13px] right-[-15px] bg-red-400 py-[2px] px-[8px] rounded-full text-white text-[12px]">
              {notification.length}
            </span>
          )}
          <div className="group-hover:block hidden w-[300px] absolute top-[40px] right-[-5px] box-shadow rounded-md bg-white">
            {notification.length ? (
              notification.map((n) => {
                return (
                  <div
                    key={n._id}
                    onClick={() => {
                      setOnChat(n.chatId);
                      setNotification(
                        notification.filter((noti) => noti._id !== n._id)
                      );
                    }}
                    className="cursor-pointer hover:bg-slate-300 p-2 rounded-md"
                  >
                    {n.chatId.isGroupChat
                      ? `New message in ${n.chatId.chatName}`
                      : `New message from ${getSender(user, n.chatId.users)}`}
                  </div>
                );
              })
            ) : (
              <div className="hover:bg-slate-300 p-2">
                Not found notification
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-1 after-content cursor-pointer relative group">
          <img
            src={user.pic}
            alt="user"
            className="h-[26px] w-[26px] rounded-full"
          />
          <i className="fas fa-sort-down"></i>
          <div className="box-shadow hidden absolute group-hover:block bg-white p-2 top-[30px] right-0">
            <ul className="flex flex-col gap-2 px-4">
              <li onClick={() => setOpen(true)}>Profile</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        </div>
      </div>
      {open && <ProfileModal user={user} setOpen={setOpen} />}
      {openSearch && (
        <SearchUserModal setOpen={setOpenSearch} setSearch={setSearch} />
      )}
    </div>
  );
};

export default SideDrawer;
