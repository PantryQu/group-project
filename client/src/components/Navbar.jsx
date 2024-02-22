import { signOut } from "firebase/auth";
import { FaBookmark, FaSignOutAlt, FaUser } from "react-icons/fa";
import { auth } from "../libs/firebase";
import { useSelector } from "react-redux";
import { FaMessage } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate()

  const user = useSelector((state) => state.user.user);
  localStorage.setItem("uid", user?.uid);

  const onLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("uid");
    localStorage.removeItem("chatId");
    navigate('/login')
  };

  return (
    <div className="w-full py-3 px-6 sticky top-0 shadow-lg  bg-white flex items-center sm:justify-around justify-between">
      <Link to={"/"}>
        <h1 className="font-bold text-xl text-slate-800">CookTab</h1>
      </Link>
      {/* {user !== null ? ( */}
        <div className="flex gap-3 items-center">
          <Link to={"/bookmarks"} className="p-2 rounded-sm border">
            <FaBookmark />
          </Link>
          <Link to={"/profile"} className="p-2 rounded-sm border">
            <FaUser />
          </Link>
          <Link to={"/chat"} className="p-2 rounded-sm border">
            <FaMessage />
          </Link>
          <button
            onClick={() => onLogout()}
            className="p-2 rounded-sm bg-slate-800 text-white"
          >
            <FaSignOutAlt />
          </button>
        </div>
    </div>
  );
};

export default Navbar;
