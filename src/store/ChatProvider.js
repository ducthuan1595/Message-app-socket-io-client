import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const userStore = JSON.parse(localStorage.getItem("user-chat")) ?? null;
const tokenStore = JSON.parse(localStorage.getItem("token-chat")) ?? null;

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(userStore);
  const [token, setToken] = useState(tokenStore);

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user]);

  console.log({ user });

  const values = {
    user,
    setUser,
    token,
    setToken,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
