import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ChatState } from "../store/ChatProvider";

const CheckOutlet = ({ children }) => {
  const { user, token } = ChatState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) {
      navigate("/login", { replace: true });
    }
  }, [user, token]);

  return <>{children ? children : <Outlet />}</>;
};

export default CheckOutlet;
