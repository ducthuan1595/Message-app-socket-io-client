import React, { useEffect, useState } from "react";
import { ChatState } from "../../store/ChatProvider";
import { useNavigate } from "react-router-dom";
import { ProfileModal } from "../slides/ProfileModal";
import { SearchUserModal } from "./SearchUserModal";
import { getSender } from "../../config/messageBox";

const SideDrawer = () => {
  const {
    user,
    setUser,
    setToken,
    setOnChat,
    notification,
    setNotification,
    setOpenMyChat,
  } = ChatState();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    // if (notification) {
    //   let hashmap = [];
    //   for (let i = 0; i < notification.length; i++) {
    //     let item = notification[i]._id;
    //     for (let j = i + 1; j < notification.length; j++) {
    //       if (item !== notification[j]._id) {
    //         hashmap.push(notification[j]);
    //       }
    //     }
    //   }
    //   console.log(hashmap);
    //   const newArr = Object.keys(hashmap);
    // }
  }, [notification]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user-chat");
    localStorage.removeItem("token-chat");
    navigate("/");
  };

  console.log({ user });
  return (
    <div className="flex justify-between items-center bg-[white]">
      <div className="flex items-center">
        <button
          className="flex items-center gap-2 py-3 px-4"
          onClick={() => setOpenSearch(true)}
        >
          <i className="fas fa-search"></i>
          <span className="hidden md:block">Search User</span>
        </button>
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setOpenMyChat((state) => !state)}
        >
          <i className="fas fa-bars"></i>
        </div>
      </div>
      <h2 className="font-semibold">TALK WITH ME</h2>
      <div className="flex items-center px-4 py-3 gap-4">
        <div className="group after-bridge relative z-30">
          <i className="fas fa-bell cursor-pointer text-[19px] relative"></i>
          {notification.length > 0 && (
            <span className="absolute top-[-13px] right-[-15px] bg-red-400 py-[2px] px-[8px] rounded-full text-white text-[12px]">
              {notification.length}
            </span>
          )}
          <div className="group-hover:block hidden z-30 w-[200px] md:w-[300px] absolute top-[40px] right-[-5px] box-shadow rounded-md bg-white">
            {notification.length ? (
              Array.from(new Set(notification)).map((n) => {
                return (
                  <div
                    key={n._id}
                    onClick={() => {
                      setOnChat(n.chatId);
                      setNotification(
                        notification.filter((noti) => noti._id !== n._id)
                      );
                      localStorage.setItem(
                        "notification-chat",
                        JSON.stringify(
                          notification.filter((noti) => noti._id !== n._id)
                        )
                      );
                    }}
                    className="cursor-pointer hover:bg-slate-300 p-2 rounded-md text-[12px] md:text-[16px] active:bg-slate-300"
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
        <div className="flex gap-1 after-content cursor-pointer relative group z-50">
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
      {open && <ProfileModal user={user} setOpen={setOpen} isUser={true} />}
      {openSearch && (
        <SearchUserModal setOpen={setOpenSearch} setSearch={setSearch} />
      )}
    </div>
  );
};

export default SideDrawer;
