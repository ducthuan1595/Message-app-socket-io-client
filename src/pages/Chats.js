import { useEffect, useState } from "react";
import { ChatState } from "../store/ChatProvider";
import SideDrawer from "../components/SideDrawer";
import { request } from "../service";

const ChatsPage = () => {
  const { user } = ChatState();
  const [chats, setChats] = useState([]);
  // const fetchChats = async () => {
  //   const { data } = await request.chats();
  //   console.log(data);
  //   if (data) {
  //     setChats(data.data.chats);
  //   }
  // };

  // useEffect(() => {
  //   fetchChats();
  // }, []);

  return (
    <div className="relative">
      <SideDrawer />
    </div>
  );
};

export default ChatsPage;
