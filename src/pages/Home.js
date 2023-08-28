import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { request } from "../service";

const HomePage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      if (email && password) {
        try {
          const value = {
            email,
            password,
          };
          const res = await request.login(value);
          if (res.message === "ok") {
            console.log(res.data);
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  return (
    <div className="md:table mt-[200px] mx-auto">
      <div className="flex flex-col justify-center items-center py-4 px-2 md:p-4 shadow-md rounded-md">
        <h1 className="text-2xl md:text-4xl md:px-20">Talk - Together</h1>
      </div>
      <div className="h-2"></div>
      <form className="p-2 md:p-4 shadow-lg rounded-sm" onSubmit={handleSubmit}>
        <div className="m-2">
          <div className="flex justify-between items-center py-3 mb-4">
            <button
              className="px-20 font-normal p-2 rounded-full text-[white] bg-sky-300"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="px-20 font-normal p-2 rounded-full text-[white] bg-[white]"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
          <div>
            <div className="flex flex-col justify-start mb-2">
              <label className="font-medium">Email Address</label>
              <input
                className="p-2 border-[#333] placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-start">
              <label className="font-medium">Password</label>
              <input
                className="p-2 border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="block text-center my-4 mx-auto bg-sky-500 w-[320px] md:w-full py-2 rounded-full text-[white]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default HomePage;
