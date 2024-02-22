import { createBrowserRouter, RouterProvider, redirect ,BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
              // redirect('/')
              return null;
            }
            if (privatePage.includes(pathname) && !user) {
              redirect('/login')
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: 
      <div>
        <Navbar />
        <Home />
        <Footer />
      </div>,
      loader : async () => {
        if(!localStorage.getItem('uid')){
          throw redirect('/login')
        }
        return null
      }
    },
    {
      path: "/chat",
      element: 
      <div>
        <Navbar />
        <Chat />
      </div>,
      loader : async () => {
        if(!localStorage.getItem('uid')){
          throw redirect('/login')
        }
        return null
      }
    },
    {
      path: "/chat/:id",
      element: 
      <div>
        <Navbar />
        <DetailChat />
      </div>,
      loader : async () => {
        if(!localStorage.getItem('uid')){
          throw redirect('/login')
        }
        return null
      }
    },
    {
      path: "/bookmarks",
      element: 
      <div>
        <Navbar />
        <Bookmarks />
        <Footer />
      </div>,
      loader : async () => {
        if(!localStorage.getItem('uid')){
          throw redirect('/login')
        }
        return null
      }
    },
    {
      path: "/profile",
      element: 
      <div>
        <Navbar />
        <Profile />
        <Footer />
      </div>,
      loader : async () => {
        if(!localStorage.getItem('uid')){
          throw redirect('/login')
        }
        return null
      }
    },
    {
      path: "/recipe/:id",
      element: 
      <div>
        <Navbar />
        <DetailRecipe />
        <Footer />
      </div>,
      loader : async () => {
        if(!localStorage.getItem('uid')){
          throw redirect('/login')
        }
        return null
      }
    },
    {
      path: "/login",
      element: 
      <div>
        <Login />
        <Footer />
      </div>,
      loader : async () => {
        if(localStorage.getItem('uid')){
          throw redirect('/')
        }
        return null
      }
    },
    {
      path: "/register",
      element: 
      <div>
        <Register />
        <Footer />
      </div>,
      loader : async () => {
        if(localStorage.getItem('uid')){
          throw redirect('/')
        }
        return null
      }
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
