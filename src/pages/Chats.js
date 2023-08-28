import { useEffect, useState } from "react";
import { request } from "../service";

const ChatsPage = () => {
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    const { data } = await request.chats();
    console.log(data);
    if (data) {
      setChats(data.data.chats);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      <ul>
        {chats?.map((chat) => (
          <li key={chat.id}>{chat.chatName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatsPage;
