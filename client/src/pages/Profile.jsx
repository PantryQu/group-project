import { useSelector } from "react-redux"
const Profile = () => {
    const user = useSelector((state) => state.user.user)
    console.log(user)
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
                <h2 className="font-bold text-lg">{user?.email}</h2>
                <button className="p-2 rounded-sm bg-slate-800 text-white">
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default Profile  
