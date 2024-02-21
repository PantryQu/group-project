import { FaEye, FaTrash } from "react-icons/fa"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection, doc, deleteDoc } from "firebase/firestore"
import { db } from "../libs/firebase"
import { useSelector } from "react-redux"



const Bookmarks = () => {
    const user = useSelector((state) => state.user.user);
    const [snapshot, loading] = useCollection(collection(db, "bookmarks"));
    const bookmarks = snapshot?.docs.map((doc) => ({
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

    const handleDelete = async (id) => { 
        await deleteDoc(doc(db, `bookmarks/${id}`));
    }
    //     const response = await fetch(
    //         `http://localhost:3000/bookmark/delete/${id}`,
    //         {
    //             method: "POST",
    //         }
    //     );

    //     const data = await response.json();

    //     console.log(data);
    // };


    return (
        <div className="max-w-7xl mx-auto p-6 space-y-3">
            <h1 className="sm:text-2xl font-bold text-xl">My Bookmarks</h1>
            <div className="w-full grid sm:grid-cols-4 grid-cols-2 gap-3">
                {bookmarks?.map((item, index) => {
                    if (item?.id_user === user?.uid) {
                        return (
                            <div
                                key={index}
                                className="w-full border rounded-sm p-3 space-y-2"
                            >
                                <img
                                    src={item?.image}
                                    height={200}
                                    className="w-full rounded-sm"
                                    alt=""
                                />
                                <h2 className="font-semibold text-lg">{item?.title}</h2>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleDelete(item?.id)}
                                        className="p-2 rounded-sm bg-slate-800 text-white"
                                    >
                                        <FaTrash />
                                    </button>
                                    <a
                                        href={`/recipe/${item?.id_recipe}`}
                                        className="p-2 rounded-sm bg-slate-800 text-white"
                                    >
                                        <FaEye />
                                    </a>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Bookmarks;
