const SkeletonRecipe = () => {
    return (
        <div className="w-full grid sm:grid-cols-4 grid-cols-2 gap-3 animate-pulse">
            <div
                className="w-full border rounded-sm p-3"
                style={{ height: "250px", backgroundColor: "#ccc" }}
            ></div>
            <div
                className="w-full border rounded-sm p-3"
                style={{ height: "250px", backgroundColor: "#ccc" }}
            ></div>
            <div
                className="w-full border rounded-sm p-3"
                style={{ height: "250px", backgroundColor: "#ccc" }}
            ></div>
            <div
                className="w-full border rounded-sm p-3"
                style={{ height: "250px", backgroundColor: "#ccc" }}
            ></div>
        </div>
    );
};

export default SkeletonRecipe;
