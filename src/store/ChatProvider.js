import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { request } from "../service";

const userStore = JSON.parse(localStorage.getItem("user-chat")) ?? null;
const tokenStore = JSON.parse(localStorage.getItem("token-chat")) ?? null;

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(userStore);
  const [token, setToken] = useState(tokenStore);

  const [chat, setChat] = useState(null);

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user]);

  const fetchChatApi = async () => {
    const { data } = await request.fetchChats(token);
    console.log("chat", data);
    if (data.message === "ok") {
      setChat(data.data);
    }
  };

  useEffect(() => {
    fetchChatApi();
  }, []);

  console.log({ user });

  const values = {
    user,
    setUser,
    token,
    setToken,
    chat,
    setChat,
    fetchChatApi,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
