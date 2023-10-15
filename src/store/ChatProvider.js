import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const userStore = JSON.parse(localStorage.getItem("user-chat")) ?? null;
const tokenStore = JSON.parse(localStorage.getItem("token-chat")) ?? null;
const notificationStore =
  JSON.parse(localStorage.getItem("notification-chat")) ?? [];

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(userStore);
  const [token, setToken] = useState(tokenStore);

  const [chat, setChat] = useState([]);
  const [onChat, setOnChat] = useState(null);
  const [isFetchChat, setIsFetchChat] = useState(false);
  const [isOpenMyChat, setOpenMyChat] = useState(false);
  const [notification, setNotification] = useState(notificationStore);

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
    isOpenMyChat,
    setOpenMyChat,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
