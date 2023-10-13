import { useEffect, useState } from "react";
import { ChatState } from "../store/ChatProvider";
import SideDrawer from "../components/header/SideDrawer";
import MyChat from "../components/MyChat";
import { request } from "../service";

const ChatsPage = () => {
  const { user, setChat } = ChatState();

  return (
    <div className="relative">
      <SideDrawer />
      <MyChat />
    </div>
  );
};

export default ChatsPage;
