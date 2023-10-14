import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const userStore = JSON.parse(localStorage.getItem("user-chat")) ?? null;
const tokenStore = JSON.parse(localStorage.getItem("token-chat")) ?? null;

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(userStore);
  const [token, setToken] = useState(tokenStore);

  const [chat, setChat] = useState([]);
  const [onChat, setOnChat] = useState(null);
  const [isFetchChat, setIsFetchChat] = useState(false);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user]);

  const values = {
    user,
    setUser,
    token,
    setToken,
    chat,
    setChat,
    onChat,
    setOnChat,
    isFetchChat,
    setIsFetchChat,
    notification,
    setNotification,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
