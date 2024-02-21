import { useEffect, useState } from "react"  
import SkeletonRecipe from "../components/SkeletonRecipe"  
import { FaHeart, FaSearch } from "react-icons/fa"  
const Home = () => {
    const [loading, setLoading] = useState(true)  
    const [recipes, setRecipes] = useState([])  
    const [keyword, setKeyword] = useState("")  
    const [searchRecipes, setSearchRecipes] = useState([])  
    const [loadingSearch, setLoadingSearch] = useState(false)  

    const fetchRandomRecipe = async () => {
        setLoading(true)  
        const response = await fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=c6a4e5101df441fcbc9f9128bf81323c&number=4`,
            {
                method: "GET",
            }
        )  
        const data = await response.json()  
        setRecipes(data?.recipes)  
        setLoading(false)  
    }  

    useEffect(() => {
        fetchRandomRecipe()  
    }, [])  

    const handleSearch = async (e) => {
        e.preventDefault()  
        setLoadingSearch(true)  
        const response = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=c6a4e5101df441fcbc9f9128bf81323c&query=${keyword}`,
            {
                method: "GET",
            }
        )  
        const data = await response.json()  
        setSearchRecipes(data?.results)  
        setLoadingSearch(false)  
    }  

    return (
        <div className="w-full">
            <main className="max-w-7xl mx-auto space-y-5">
                <div className="w-full px-10 pt-20 pb-10 space-y-5">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center">
                        Welcome To CookTab
                    </h1>
                    <form action="" onSubmit={handleSearch} className="w-full flex gap-3">
                        <input
                            type="search"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            required
                            className="flex-1 p-3 rounded-sm border focus:outline-1 focus:outline-slate-800"
                            placeholder="Search.."
                        />
                        <button className="p-3 rounded-sm bg-slate-800 text-white">
                            <FaSearch />
                        </button>
                    </form>
                </div>
                {loadingSearch && (
                    <div className="w-full h-20 flex justify-center items-center">
                        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-slate-800"></div>
                    </div>
                )}
                {searchRecipes?.length > 0 && (
                    <div className="w-full px-10 pb-10 space-y-3">
                        <h1 className="text-3xl font-bold">Search : {keyword}</h1>
                        <div className="w-full grid sm:grid-cols-4 grid-cols-2 gap-3">
                            {searchRecipes?.map((item, index) => (
                                <a
                                    href={`/recipe/${item.id}`}
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
                                </a>
                            ))}
                        </div>
                    </div>
                )}
                <div className="w-full p-10 space-y-3">
                    <h1 className="text-3xl font-bold">Rekomendasi</h1>
                    {loading ? (
                        <div className="w-full">
                            <SkeletonRecipe />
                        </div>
                    ) : (
                        <div className="w-full grid sm:grid-cols-4 grid-cols-2 gap-3">
                            {recipes?.map((item, index) => (
                                <a
                                    href={`/recipe/${item.id}`}
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
                                    <p className="text-sm text-slate-500 flex gap-2 items-center">
                                        <span className="text-pink-500 text-lg font-bold">
                                            <FaHeart />
                                        </span>{" "}
                                        <span>:</span> <span>{item?.aggregateLikes}</span>
                                    </p>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )  
}  

export default Home  
