import {
  addDoc,
  collection,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../libs/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import MessageUser from "./MessageUser";
const UserChat = () => {
  const currentUser = useAuthState(auth);
  const q = query(
    collection(db, "chats"),
    where("uid", "==", localStorage.getItem("uid"))
  );
  const [chatSnapshot, loading] = useCollection(q);
  const chat = chatSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-slate-800"></div>
      </div>
    );
  }

  const createMessage = async () => {
    const res = await addDoc(collection(db, `chats`), {
      uid: localStorage.getItem("uid"),
      name: currentUser[0].displayName
        ? currentUser[0].displayName
        : currentUser[0].email,
      timestamp: serverTimestamp(),
    });

    if (res.id) {
      localStorage.setItem("chatId", res.id);
      await addDoc(collection(db, `chats/${res.id}/message`), {
        sender: "admin",
        message: "Hello, I'm Cooktab Admin. I'm waiting for you",
        timestamp: serverTimestamp(),
      });
    }
  };
  return (
    <div className="w-full">
      <div className="max-w-2xl mx-auto p-3 rounded-sm my-3">
        {chat.length > 0 ? (
          <MessageUser />
        ) : (
          <div className="w-full flex justify-center">
            <button className="p-2 rounded-sm border" onClick={createMessage}>
              Hubungi Admin
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserChat;
