import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ChatsPage from "./pages/Chats";
import FormPage from "./pages/Form";
import CheckOutlet from "./config/checkOutlet";
import "./App.css";
import { ChatState } from "./store/ChatProvider";

function App() {
  const { user, token } = ChatState();
  return (
    <div className="App">
      {!user && !token && <Navigate to="/login" replace={true} />}
      <Routes>
        <Route path="/login" element={<FormPage />} />
        <Route element={<CheckOutlet />}>
          <Route path="/signup" element={<FormPage />} />
          <Route path="/" element={<ChatsPage />} />
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
