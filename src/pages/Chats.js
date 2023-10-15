import { useEffect, useState } from "react";
import { ChatState } from "../store/ChatProvider";
import SideDrawer from "../components/header/SideDrawer";
import MyChat from "../components/MyChat";
import ChatBox from "../components/ChatBox";
import { request } from "../service";

const ChatsPage = () => {
  const { setChat, token, isFetchChat } = ChatState();

  const fetchChatApi = async () => {
    const { data } = await request.fetchChats(token);
    if (data.message === "ok") {
      setChat(data.data);
    }
  };

  useEffect(() => {
    fetchChatApi();
  }, [isFetchChat]);

  return (
    <div className="relative">
      <SideDrawer />
      <div className="flex">
        <MyChat />
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatsPage;
