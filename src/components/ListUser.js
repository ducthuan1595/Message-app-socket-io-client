import React from "react";

const ListUser = ({ user, handleClick }) => {
  return (
    <div
      className="flex items-center w-full gap-4 p-2 mx-2 hover:bg-slate-300 rounded-md box-shadow cursor-pointer text-[12px] md:text-[16px]"
      onClick={handleClick}
    >
      <div className="rounded-full">
        <img
          src={user?.pic}
          alt={user?.name}
          className="rounded-full h-[40px] w-[40px]"
        />
      </div>
      <div className="flex flex-col">
        <div>{user?.name}</div>
        <div>{user?.email}</div>
      </div>
    </div>
  );
};

export default ListUser;
