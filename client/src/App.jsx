import { BrowserRouter as Router, Routes, Route } from "react-router-dom"  
import Home from "./pages/Home"  
import Login from "./pages/Login"  
import Register from "./pages/Register"  
import { onAuthStateChanged } from "firebase/auth"  
import { useEffect } from "react"  
import { auth, db } from "./libs/firebase"  
import { useDispatch } from "react-redux"  
import { setUser } from "./features/actions/userActions"  
import Navbar from "./components/Navbar"  
import Footer from "./components/Footer"  
import DetailRecipe from "./pages/DetailRecipe"  
import Bookmarks from "./pages/Bookmarks"  
import Profile from "./pages/Profile"  

function App() {
  const dispatch = useDispatch()  
  let pathname = window.location.pathname  
  let publicPage = ["/login", "/register"]  
  let privatePage = ["/bookmarks", "/profile"]  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (publicPage.includes(pathname) && user) {
        window.location.href = "/"  
        return null  
      }

      if (privatePage.includes(pathname) && !user) {
        window.location.href = "/login"  
        return null  
      }

      dispatch(setUser(user))  
    })  
  }, [pathname])  

  return (
    <>
      <Router>
        {!publicPage.includes(pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipe/:id" element={<DetailRecipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )  
}

export default App  
