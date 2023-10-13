import React from "react";

export const ProfileModal = ({ user, setOpen }) => {
  return (
    <div className=" absolute top-0 left-0 right-0 bottom-0 w-full h-full">
      <div className="w-[500px] mx-auto bg-white mt-[200px] z-30 box-shadow rounded-md">
        <div className="p-4 flex flex-col items-center relative">
          <span
            className="absolute right-4 top-2 opacity-50 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <i className="fas fa-times"></i>
          </span>
          <img
            src={user.pic}
            alt={user.name}
            className="h-[200px] w-auto rounded-full"
          />
          <span className="font-bold ">{user.name}</span>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
};
