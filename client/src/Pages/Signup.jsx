import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";

export default function Signup() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  async function createNewAccount(event) {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API request delay
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 2000);
  }

  return (
    <Layout>
      <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh]">
        <form
          onSubmit={createNewAccount}
          autoComplete="off"
          noValidate
          className="flex flex-col dark:bg-base-100 gap-4 rounded-lg md:py-5 py-7 md:px-7 px-3 md:w-[500px] w-full shadow-custom dark:shadow-xl"
        >
          <h1 className="text-center dark:text-purple-500 text-4xl font-bold font-inter">
            Registration Page
          </h1>
          {/* name */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-xl font-[500] text-blue-600 dark:text-white font-lato"
            >
              Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={signupData.fullName}
              onChange={handleUserInput}
              placeholder="Enter your name..."
              className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-base-200 dark:text-base-200"
              required
            />
          </div>
          {/* email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-xl font-[500] text-blue-600 dark:text-white font-lato"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={signupData.email}
              onChange={handleUserInput}
              placeholder="Enter your email..."
              className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-base-200 dark:text-base-200"
              required
            />
          </div>
          {/* password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-xl font-[500] text-blue-600 dark:text-white font-lato"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={signupData.password}
              onChange={handleUserInput}
              placeholder="Enter your password..."
              className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-base-200 dark:text-base-200"
              required
            />
          </div>
          {/* submit btn */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-yellow-500 text-white font-[500] text-lg py-2 rounded-md hover:bg-yellow-300 transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>
        {/* link */}
        <p className="text-center font-inter text-gray-500 dark:text-slate-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-lato cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </section>
    </Layout>
  );
}
