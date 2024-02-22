import { useState } from "react";
import { auth } from "../libs/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    loading: false,
    message: "",
    success: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, message: "" });
    if (values?.password !== values.confirmPassword) {
      setValues({
        ...values,
        loading: false,
        message: "Password does not match",
      });
      return;
    }
    const res = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    if (res) {
      setValues({
        ...values,
        loading: false,
        success: true,
      });
    } else {
      setValues({
        ...values,
        loading: false,
        message: "Something went wrong",
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
            className={`text-center ${
              values.success ? "text-green-500" : "text-red-500"
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
          <Link to={"/login"} className="text-slate-800">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
