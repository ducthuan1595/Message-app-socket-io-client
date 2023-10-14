import React, { useState } from "react";

import { request } from "../../service";
import ListUser from "../ListUser";
import { ChatState } from "../../store/ChatProvider";

export const SearchUserModal = ({ setOpen }) => {
  const { token, setChat } = ChatState();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    try {
      if (search.trim()) {
        setIsLoading(true);
        const { data } = await request.searchUser(search.trim(), token);
        if (data.message === "ok") {
          setSearchResult(data.data);
          setIsLoading(false);
        }
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleClickUser = async (userId) => {
    try {
      if (token) {
        const { data } = await request.createChat({ userId }, token);
        if (data.message === "ok") {
          setChat((state) => [...state, data.data]);
          setOpen(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadingContent = () => {
    return (
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-slate-300 h-10 w-10"></div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-slate-300 rounded"></div>
          <div className="h-4 w-44 bg-slate-300 rounded"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="absolute w-[100wh] h-full bottom-0">
      <div className="bg-white left-0 h-[100vh] px-2  w-[300px] box-shadow transform-search">
        <div
          className="border-b-[1px] border-[#dddddd]"
          onClick={() => setOpen(false)}
        >
          <button className="align-items gap-2 py-3 px-2">
            <span>Search User</span>
          </button>
        </div>
        <div className="flex items-center gap-2 justify-center py-4">
          <input
            type="text"
            placeholder="Search by name or email"
            className="px-2 py-1 outline-none border-[1px] border-[#dddddd] rounded-md"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="px-2 py-1 rounded-md bg-slate-300"
            onClick={handleSearch}
          >
            Go
          </button>
        </div>
        <div className="flex flex-col gap-2 p-2 items-center">
          {!isLoading ? (
            searchResult &&
            searchResult.map((user) => {
              return (
                <ListUser
                  key={user._id}
                  user={user}
                  handleClick={() => handleClickUser(user._id)}
                />
              );
            })
          ) : (
            <div className="animate-pulse px-4 py-2 flex flex-col gap-4">
              {loadingContent()}
              {loadingContent()}
              {loadingContent()}
              {loadingContent()}
              {loadingContent()}
              {loadingContent()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
