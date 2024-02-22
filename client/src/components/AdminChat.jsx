import { collection, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../libs/firebase";
const AdminChat = () => {
  const [chatSnap, loading] = useCollection(query(collection(db, "chats")));
  const chats = chatSnap?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-3 p-3">
      <h1 className="text-xl font-bold">Chats</h1>
      {loading ? (
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-slate-800"></div>
      ) : (
        <>
          {chats?.map((chat) => (
            <a
              href={`/chat/${chat.id}`}
              key={chat.id}
              className="p-2 rounded-sm border"
            >
              {chat?.name}
            </a>
          ))}
        </>
      )}
    </div>
  );
};

export default AdminChat;
