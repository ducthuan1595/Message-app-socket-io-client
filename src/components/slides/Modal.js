import React from "react";

const Modal = ({ setOpenCreateGroup }) => {
  return (
    <div
      className="top-0 left-0 right-0 bottom-0 absolute bg-[rgba(192,192,192,0.3)] cursor-pointer"
      onClick={() => setOpenCreateGroup(false)}
    ></div>
  );
};

export default Modal;
