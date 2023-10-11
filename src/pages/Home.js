import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { request } from "../service";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      Home
      <button onClick={(e) => navigate("/chat")}>Chat</button>
    </div>
  );
};

export default HomePage;
