import React from "react";
import { ChatState } from "../store/ChatProvider";

const UserBadge = ({ selectUser, handleDeleteUser, isCreateChat }) => {
  return (
    <div className="flex justify-center items-center gap-2 my-1 text-white cursor-pointer">
      {selectUser &&
        selectUser.map((user) => {
          return (
            <div
              onClick={() => handleDeleteUser(user._id)}
              key={user._id}
              className="flex items-center justify-center gap-1 px-1 py-[2px] bg-green-400 rounded-md"
            >
              <span className="text-[12px] md:text-[14px]">{user.name}</span>
              <i className="fas fa-times text-[12px]"></i>
            </div>
          );
        })}
    </div>
  );
};

export default UserBadge;
