import React, { useEffect, useState } from "react";
import { ChatState } from "../store/ChatProvider";
import ShowChatsModal from "./slides/ShowChatsModal";
import SendMessage from "./SendMessage";
import BodyBoxChat from "./BodyBoxChat";
import { request, url } from "../service";
import io from "socket.io-client";

let socket, selectedChatCompare;

const ChatBox = () => {
  const { onChat, token, user, notification, setNotification, setIsFetchChat } =
    ChatState();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSocketIo, setSocketIo] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io(url);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketIo(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  const fetchMessage = async () => {
    if (token && onChat) {
      try {
        setIsLoading(true);
        const { data } = await request.getMessage(onChat._id, token);
        if (data.message === "ok") {
          setMessages(data.data);
          setIsLoading(false);

          socket.emit("join chat", onChat._id);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  useEffect(() => {
    fetchMessage();
    selectedChatCompare = onChat;
  }, [onChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chatId._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setIsFetchChat((state) => !state);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const handleTyping = () => {
    if (!isSocketIo) return;
    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", onChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && isTyping) {
        socket.emit("stop typing", onChat._id);
        setIsTyping(false);
      }
    }, timerLength);
  };

  console.log({ notification });

  return (
    <>
      <div className="bg-white m-2 rounded-md pt-2 flex-1">
        {onChat ? (
          <div>
            <div className="flex justify-between items-center py-2 px-4">
              <h1 className="capitalize text-[22px]">{onChat.chatName}</h1>
              <i
                className="fas fa-eye p-2 bg-slate-300 rounded-md cursor-pointer"
                onClick={() => setOpen(!open)}
              ></i>
            </div>
            <div className="bg-slate-300 px-2 flex flex-col justify-between h-[81vh] w-full rounded-md overflow-hidden">
              <BodyBoxChat messages={messages} isLoading={isLoading} />
              {isTyping ? (
                <div className="flex justify-center items-center p-2 gap-1 ml-2 bg-slate-200 rounded-xl w-8">
                  <span className="animate-ping inline-flex h-1 w-2 rounded-full bg-sky-400 opacity-75"></span>
                  <span className="animate-ping inline-flex h-1 w-3 rounded-full bg-sky-400 opacity-75"></span>
                  <span className="animate-ping inline-flex h-1 w-4 rounded-full bg-sky-400 opacity-75"></span>
                </div>
              ) : (
                <></>
              )}
              <SendMessage
                setMessages={setMessages}
                socket={socket}
                handleTyping={handleTyping}
              />
            </div>
          </div>
        ) : (
          <div className="text-center mt-[200px] text-[20px]">
            Click into users or group chat to chat
          </div>
        )}
      </div>
      {open && <ShowChatsModal setOpen={setOpen} />}
    </>
  );
};

export default ChatBox;
