import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../libs/firebase";
import AdminChat from "../components/AdminChat";
import UserChat from "../components/UserChat";
const Chat = () => {
  const q = query(
    collection(db, "users"),
    where("uid", "==", localStorage.getItem("uid"))
  );
  const [profileSnapshot, loading] = useCollection(q);
  const profile = profileSnapshot?.docs.map((doc) => ({
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
  return <>{profile[0]?.role === "admin" ? <AdminChat /> : <UserChat />}</>;
};

export default Chat;
