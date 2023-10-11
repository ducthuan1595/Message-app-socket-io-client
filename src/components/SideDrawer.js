import React, { useState } from "react";
import { ChatState } from "../store/ChatProvider";
import { useNavigate } from "react-router-dom";
import { ProfileModal } from "./ProfileModal";
import { SearchUserModal } from "./SearchUserModal";

const SideDrawer = () => {
  const { user, setUser, setToken } = ChatState();
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
        <i className="fas fa-bell"></i>
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
