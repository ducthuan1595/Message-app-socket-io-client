import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { request } from "../service";

const FormPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleInputFile = (e) => {
    const file = e.target.files[0];
    setPic(file);
  };

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
          console.log(res.response);
          if (res.data.message === "ok") {
            setErrorMessage("");
            navigate("/");
          }
        } catch (err) {
          setErrorMessage(err.response.data.message);
        }
      } else {
        setErrorMessage("Please, enter enough information");
      }
    } else {
      if (name && email && password) {
        try {
          const formData = new FormData();
          formData.append("name", name);
          formData.append("email", email);
          formData.append("password", password);
          formData.append("pic", pic);

          const res = await request.signup(formData);
          if (res.data.message === "ok") {
            setErrorMessage("");
            navigate("/login");
          }
        } catch (err) {
          console.error(err);
          setErrorMessage(err.response.data.message);
        }
      } else {
        setErrorMessage("Please, enter enough information");
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
          <div className="flex justify-between items-center py-3 mb-6">
            <button
              className="px-20 p-2 rounded-full font-medium"
              style={{
                color: `${isLogin ? "white" : "#333"}`,
                backgroundColor: `${isLogin ? "#7dd3fc" : "#fff"}`,
              }}
              onClick={() => {
                setIsLogin(true);
                navigate("/login");
              }}
            >
              Login
            </button>
            <button
              className="px-20 p-2 rounded-full font-medium"
              onClick={() => {
                setIsLogin(false);
                navigate("/signup");
              }}
              style={{
                color: `${isLogin ? "#333" : "#fff"}`,
                backgroundColor: `${isLogin ? "#fff" : "#7dd3fc"}`,
              }}
            >
              Sign Up
            </button>
          </div>
          <div>
            {!isLogin && (
              <div className="flex flex-col justify-start mb-2">
                <label className="font-medium">Full Name</label>
                <input
                  className="p-2 border-[#333] placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
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
            {!isLogin && (
              <div className="flex flex-col justify-start mb-2">
                <label className="font-medium">Avatar</label>
                <input
                  className="p-2 border-[#333] placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                  type="file"
                  name="pic"
                  onChange={handleInputFile}
                />
              </div>
            )}
          </div>
        </div>
        <div className="text-pink-600 text-sm pl-2">{errorMessage}</div>
        <button
          type="submit"
          className="block text-center my-4 mx-auto bg-sky-500 w-[320px] md:w-full py-2 rounded-full text-[white]"
        >
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default FormPage;
