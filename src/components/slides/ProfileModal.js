import React, { useState } from "react";
import { request } from "../../service";
import { ChatState } from "../../store/ChatProvider";

export const ProfileModal = ({ user, setOpen, isUser }) => {
  const { token, setUser } = ChatState();

  const [nameValue, setNameValue] = useState(user.name);
  const [image, setImage] = useState(user.pic);

  const handleImage = (e) => {
    if (isUser) {
      const file = e.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "message-talk");
      data.append("cloud_name", "dvlbv6l2k");
      fetch("https://api.cloudinary.com/v1_1/dvlbv6l2k/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEdit = async () => {
    if (isUser) {
      if (nameValue || image) {
        const { data } = await request.updateUser(
          { name: nameValue, pic: image },
          token
        );
        if (data.message === "ok") {
          setUser(data.data);
          localStorage.setItem("user-chat", JSON.stringify(data.data));
          setOpen(false);
        }
      }
    }
  };
  return (
    <div className=" absolute bg-[rgba(192,192,192,0.3)] z-50 top-0 left-0 right-0 bottom-0 w-full h-full">
      <div className="w-[300px] md:w-[500px] mx-auto bg-white mt-[200px] z-30 box-shadow rounded-md">
        <div className="p-4 flex flex-col items-center relative">
          <span
            className="absolute right-4 top-2 opacity-50 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <i className="fas fa-times"></i>
          </span>
          <div>
            {isUser && (
              <div>
                <input
                  type="file"
                  id="image-file"
                  className="hidden"
                  onChange={handleImage}
                  value={setImage}
                />
                <label htmlFor="image-file" className="cursor-pointer">
                  <i className="fas fa-edit mr-1 text-slate-500"></i>
                </label>
              </div>
            )}
            <img
              src={image}
              alt={user?.name}
              className="h-[200px] w-auto rounded-full"
            />
          </div>
          <div>
            <i className="fas fa-edit mr-1 text-green-500"></i>
            <input
              type="text"
              onChange={(e) => setNameValue(e.target.value)}
              value={nameValue}
              disabled={!isUser}
              className="font-bold outline-none"
            />
          </div>
          <span className="w-[234px]">
            <strong>Email:</strong> {user?.email}
          </span>
          {isUser && (
            <button
              className="bg-green-500 py-1 px-4 mt-2 rounded-md text-white"
              onClick={handleEdit}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
