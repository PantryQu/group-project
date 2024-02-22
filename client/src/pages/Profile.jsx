import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { db } from "../libs/firebase";
const Profile = () => {
  const user = useSelector((state) => state.user.user);
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

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-3">
      <h1 className="text-center font-bold text-xl sm:text-2xl">Profile</h1>
      <div className="w-ful border rounded-sm  p-3 text-center space-y-3">
        <div className="w-full flex justify-center">
          <img
            src={user?.photoURL}
            width={200}
            height={200}
            className="rounded-full"
            alt=""
          />
        </div>
        <h2 className="font-bold text-lg">{user?.displayName}</h2>
        <h2 className="font-bold text-lg">{profile[0]?.role}</h2>
        <h2 className="font-bold text-lg">{user?.email}</h2>
        <button className="p-2 rounded-sm bg-slate-800 text-white">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
