import { BsGoogle } from "react-icons/bs"  
import { useState } from "react"  
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"  
import { auth } from "../libs/firebase"  
import { useNavigate } from "react-router-dom"  
import { useDispatch } from "react-redux"  
import { GoogleAuthProvider } from "firebase/auth"  
import { setUser } from "../features/actions/userActions"  

const Login = () => {
    const navigate = useNavigate()  
    const [email, setEmail] = useState("")  
    const [password, setPassword] = useState("")  
    const [isLoading, setIsLoading] = useState(false)  
    const [message, setMessage] = useState("")  

    const dispatch = useDispatch()  

    const onLogin = (e) => {
        e.preventDefault()  
        setIsLoading(true)  
        setMessage("")  
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user  
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: user.uid,
                })  
                navigate("/home")  
                setIsLoading(false)  
            })
            .catch((error) => {
                const errorCode = error.code  
                const errorMessage = error.message  
                console.log(errorCode, errorMessage)  
                setMessage("Email or password is incorrect")  
                setIsLoading(false)  
            })  
    }  

    const provider = new GoogleAuthProvider()  

    const onLoginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)  
            const user = result.user  
            console.log(user)  
            dispatch(setUser(user))  
            if (user) {
                dispatch({ type: "LOGIN_SUCCESS", payload: user.uid })  
                navigate("/home")  
            }
        } catch (error) {
            console.log(error)  
        }
    }  

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form
                onSubmit={onLogin}
                action=""
                className="sm:w-96 w-full p-3 sm:rounded-sm sm:border sm:shadow space-y-3"
            >
                <h1 className="font-bold text-xl sm:text-2xl text-center my-5">
                    Login CookTab
                </h1>

                <button
                    type="button"
                    onClick={onLoginWithGoogle}
                    className="w-full p-2 rounded-sm border flex items-center justify-center gap-2"
                >
                    <span>Login with google</span> <BsGoogle />
                </button>

                <p className="text-center font-semibold text-slate-500">or</p>
                {message && (
                    <p className="text-center font-semibold text-red-500">{message}</p>
                )}

                <label htmlFor="email" className="w-full font-semibold block">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded-sm"
                    placeholder="example@gmail.com"
                />
                <label htmlFor="password" className="w-full font-semibold block">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded-sm"
                    placeholder="Enter your password"
                />

                <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full p-2 disabled:opacity-80 rounded-sm bg-slate-800 text-white font-semibold"
                >
                    {isLoading ? "Loading..." : "Login"}
                </button>

                <p className="text-sm">
                    Don{"'"}t have an account?{" "}
                    <a href="/register" className="text-slate-800">
                        Register
                    </a>
                </p>
            </form>
        </div>
    )  
}  

export default Login  