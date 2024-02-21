import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth, db } from "./libs/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./features/actions/userActions";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DetailRecipe from "./pages/DetailRecipe";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import DetailChat from "./pages/DetailChat";

function App() {
  const dispatch = useDispatch();
  let pathname = window.location.pathname;
  let publicPage = ["/login", "/register"];
  let privatePage = ["/bookmarks", "/profile", "/chat"];
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));

        getDocs(q)
          .then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              return addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                profile_picture: user.photoURL,
                role: "user",
              });
            }
            return Promise.resolve();
          })
          .then(() => {
            if (publicPage.includes(pathname) && user) {
              window.location.href = "/";
              return null;
            }

            if (privatePage.includes(pathname) && !user) {
              window.location.href = "/login";
              return null;
            }

            dispatch(setUser(user));
          })
          .catch((error) => {
            console.error("Error checking and adding user: ", error);
          });
      } else {
        dispatch(setUser(null));
      }
    });
  }, [pathname]);

  return (
    <>
      <Router>
        {!publicPage.includes(pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:id" element={<DetailChat />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipe/:id" element={<DetailRecipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {!pathname.includes("/chat") && <Footer />}
      </Router>
    </>
  );
}

export default App;
