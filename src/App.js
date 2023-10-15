import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ChatsPage from "./pages/Chats";
import FormPage from "./pages/Form";
import "./App.css";
import { ChatState } from "./store/ChatProvider";

function App() {
  const { user, token } = ChatState();
  console.log(user);
  return (
    <div className="App">
      {!user && !token && <Navigate to="/" replace={true} />}
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/signup" element={<FormPage />} />
        <Route path="/chat" element={<ChatsPage />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
