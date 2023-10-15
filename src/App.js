import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ChatsPage from "./pages/Chats";
import FormPage from "./pages/Form";
import CheckOutlet from "./config/checkOutlet";
import "./App.css";

function App() {
  return (
    <div className="App">
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
