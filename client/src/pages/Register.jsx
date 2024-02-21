import { useState } from "react"

const Register = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        loading: false,
        message: "",
        success: false,
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true, message: "" });

        const response = await fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.status === 201) {
            setValues({
                ...values,
                loading: false,
                success: true,
                message: data.message,
            });
        } else {
            setValues({
                ...values,
                loading: false,
                success: false,
                message:
                    data?.error === "Firebase: Error (auth/email-already-in-use)."
                        ? "Email already in use"
                        : data?.error,
            });
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                action=""
                className="sm:w-96 w-full p-3 sm:rounded-sm sm:border sm:shadow space-y-3"
            >
                <h1 className="font-bold text-xl sm:text-2xl text-center my-5">
                    Register CookTab
                </h1>

                {values.message && (
                    <p
                        className={`text-center ${values.success ? "text-green-500" : "text-red-500"
                            }`}
                    >
                        {values.message}
                    </p>
                )}

                <label htmlFor="email" className="w-full font-semibold block">
                    Email
                </label>
                <input
                    type="email"
                    required
                    value={values.email}
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                    id="email"
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
                    value={values.password}
                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                    className="w-full p-2 border rounded-sm"
                    placeholder="Enter your password"
                />
                <label htmlFor="password2" className="w-full font-semibold block">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="password2"
                    required
                    value={values.confirmPassword}
                    onChange={(e) =>
                        setValues({ ...values, confirmPassword: e.target.value })
                    }
                    className="w-full p-2 border rounded-sm"
                    placeholder="Enter your password again"
                />
                <button
                    type="submit"
                    disabled={values.loading}
                    className="w-full p-2 rounded-sm bg-slate-800 text-white disabled:opacity-80 font-semibold"
                >
                    {values.loading ? "Loading..." : "Register"}
                </button>
                <p className="text-sm">
                    Have an account?{" "}
                    <a href="/login" className="text-slate-800">
                        Login
                    </a>
                </p>
            </form>
        </div>
    )
}

export default Register  
