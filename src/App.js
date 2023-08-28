import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/Home";
import ChatsPage from "./pages/Chats";
import FormPage from "./pages/Form";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<FormPage />} />
        <Route path="/signup" element={<FormPage />} />
        <Route path="/chat" element={<ChatsPage />} />
      </Routes>
    </div>
  );
}

export default App;
