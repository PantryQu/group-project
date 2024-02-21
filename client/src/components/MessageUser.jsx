import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { BsSend } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { db } from "../libs/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

const MessageUser = () => {
  const [msg, setMsg] = useState("");
  const bottomOfChat = useRef();
  const qChat = query(
    collection(db, `chats/${localStorage.getItem("chatId")}/message`),
    orderBy("timestamp", "asc")
  );
  const [msgSnap, loading2] = useCollection(qChat);

  const message = msgSnap?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  useEffect(() => {
    const scrollToBottom = () => {
      bottomOfChat.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    const timeoutId = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(timeoutId);
  }, [msgSnap]);

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(
      collection(db, `chats/${localStorage.getItem("chatId")}/message`),
      {
        sender: "user",
        message: msg,
        timestamp: serverTimestamp(),
      }
    );
    setMsg("");
  };
  return (
    <div className="w-full h-[70vh] flex flex-col">
      <div className="w-full p-2 border-b">
        <h1 className="text-lg font-bold">Cooktab Admin </h1>
        <h1 className="text-sm font-semibold">
          Chat id : {localStorage.getItem("chatId")}
        </h1>
      </div>
      <div className="w-full flex-1 h-full">
        {loading2 ? (
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-slate-800"></div>
        ) : (
          <div className="w-full overflow-y-auto h-full">
            {message?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`w-full flex my-2 ${
                    item?.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`w-[70%] p-2 rounded-sm ${
                      item?.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-slate-200"
                    }`}
                  >
                    <p>{item?.message}</p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomOfChat}></div>
          </div>
        )}
      </div>
      <div className="w-full p-2 border">
        <form action="" onSubmit={sendMessage} className="w-full flex gap-3">
          <input
            type="text"
            required
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="flex-1 p-2 border-b focus:outline-blue-500"
            placeholder="Enter your message"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white">
            <BsSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageUser;
