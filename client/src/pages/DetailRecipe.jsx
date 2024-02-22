import { useEffect, useState } from "react"  
import { FaBookmark, FaClock, FaHeart, FaShare, FaUser } from "react-icons/fa"  
import { useParams } from "react-router-dom"  
import ReactHtmlParser from "react-html-parser"  
import { useSelector } from "react-redux"  
import { useCollection } from "react-firebase-hooks/firestore"  
import { collection, addDoc } from "firebase/firestore"  
import { db } from "../libs/firebase"  
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share"  


const DetailRecipe = () => {
    const user = useSelector((state) => state.user.user)  
    const [isLoading, setIsLoading] = useState(false)  
    const [recipe, setRecipe] = useState({})  
    const params = useParams()  
    const id = params.id  
    const [isOpenShare, setIsOpenShare] = useState(false)  
    let shareUrl = `http://localhost:3000/recipe/${id}`  

    const [snapshot, loading] = useCollection(collection(db, "bookmarks"))  
    const bookmarks = snapshot?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))  

    const fetchDetailRecipe = async () => {
        setIsLoading(true)  
        const response = await fetch(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=c6a4e5101df441fcbc9f9128bf81323c`,
            {
                method: "GET",
            }
        )  

        if (response.status === 404) {
            return (document.location.href = "/")  
        }

        const data = await response.json()  

        setRecipe(data)  
        setIsLoading(false)  
    }  

    useEffect(() => {
        fetchDetailRecipe()  
    }, [id])  

    if (isLoading || loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-slate-800"></div>
            </div>
        )  
    }

    const handleBookmark = async () => {
        // let body = {
        //     title: recipe?.title,
        //     image: recipe?.image,
        //     id_recipe: recipe?.id,
        //     id_user: user?.uid,
        // }  
        // const response = await fetch(`http://localhost:3000/bookmark`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(body),
        // })  

        // const data = await response.json()  

        // console.log(data) 
        const response = await addDoc(collection(db, "bookmarks"), {
            title: recipe?.title,
            image: recipe?.image,
            id_recipe: recipe?.id,
            id_user: user?.uid,
        }) 
        console.log(response)
    }  

    return (
        <div className="max-w-7xl mx-auto p-6 flex sm:flex-row flex-col-reverse gap-5 items-start">
            <div className="flex-1 rounded-sm bg-white space-y-3">
                <img
                    src={recipe?.image}
                    className="w-full sm:h-[400px] h-[300px] rounded-sm shadow"
                    alt=""
                />
                <div className="w-full p-3 rounded-sm shadow">
                    <h1 className="text-xl font-bold sm:text-2xl">{recipe?.title}</h1>
                </div>
                <div className="w-full p-3 rounded-sm shadow flex justify-start gap-2 items-center">
                    <h3 className="font-semibold flex gap-2 items-center">
                        <span className="text-pink-500 font-bold">
                            <FaHeart />
                        </span>{" "}
                        <span>:</span> <span>{recipe?.aggregateLikes}</span>{" "}
                    </h3>
                    <h3 className="font-semibold flex gap-2 items-center">
                        <span className="text-slate-800 font-bold">
                            <FaClock />
                        </span>{" "}
                        <span>:</span> <span>{recipe?.cookingMinutes} Minutes</span>{" "}
                    </h3>
                    <h3 className="font-semibold flex gap-2 items-center">
                        <span className="text-slate-800 font-bold">
                            <FaUser />
                        </span>{" "}
                        <span>:</span> <span>{recipe?.sourceName}</span>{" "}
                    </h3>
                </div>
                <div className="w-full p-3 rounded-sm shadow space-y-3">
                    <h1 className="text-lg font-bold sm:text-xl">Ingredients</h1>
                    <ul className="w-full px-4">
                        {recipe?.extendedIngredients?.map((item, index) => (
                            <li className="list-disc" key={index}>
                                {item?.name} {item?.amount}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full p-3 rounded-sm shadow space-y-3">
                    <h1 className="text-lg font-bold sm:text-xl">Instructions</h1>
                    <div>{ReactHtmlParser(recipe?.instructions)}</div>
                </div>
            </div>
            <div className="sm:w-80 w-full p-3 rounded-sm bg-white border shadow space-y-3 ">
                {user ? (
                    <div className="w-full">
                        {bookmarks?.some(
                            (item) =>
                                item.id_recipe === recipe?.id && item.id_user === user?.uid
                        ) ? (
                            <a
                                href="/bookmarks"
                                className="w-full p-3 rounded-sm bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 text-white flex gap-2 items-center justify-center"
                            >
                                <FaBookmark /> <span>Saved</span>
                            </a>
                        ) : (
                            <button
                                onClick={handleBookmark}
                                className="w-full p-3 rounded-sm bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 text-white flex gap-2 items-center justify-center"
                            >
                                <FaBookmark /> <span>Save Recipe</span>
                            </button>
                        )}
                    </div>
                ) : (
                    <a
                        href="/login"
                        className="w-full p-3 rounded-sm bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 text-white flex gap-2 items-center justify-center"
                    >
                        <FaBookmark /> <span>Save Recipe</span>
                    </a>
                )}

                <button
                    onClick={() => setIsOpenShare(!isOpenShare)}
                    className="w-full p-3 rounded-sm border flex gap-2 items-center justify-center"
                >
                    {isOpenShare ? (
                        <>
                            <span className="font-bold text-lg">Close</span>
                        </>
                    ) : (
                        <>
                            <FaShare /> <span>Share</span>
                        </>
                    )}
                </button>
                {isOpenShare && (
                    <div className="w-full border rounded-sm p-2 space-y-2">
                        <h3 className="text-lg font-semibold text-center">
                            Share to social media
                        </h3>
                        <div className="w-full flex flex-wrap gap-2 justify-center">
                            <FacebookShareButton hashtag="CookTab" url={shareUrl}>
                                <FacebookIcon size={35} />
                            </FacebookShareButton>
                            <WhatsappShareButton url={shareUrl}>
                                <WhatsappIcon size={35} />
                            </WhatsappShareButton>
                            <EmailShareButton url={shareUrl}>
                                <EmailIcon size={35} />
                            </EmailShareButton>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )  
}  

export default DetailRecipe  
