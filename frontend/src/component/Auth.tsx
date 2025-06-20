import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { forgetPassword, loginAdmin } from "../service/opreations/adminAPIContect";

interface AuthPageProps {
  type: "login" | "forget";
}

export const AuthPage = ({ type }: AuthPageProps) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    newPassword : "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { login } = useAuth();

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");
    try {
      if (type === "login") {
        const response = await loginAdmin(loginData.email, loginData.password);
        if (response.success) {
          const token = response.data?.token;
          login(response.data, token);
          toast.success("User Successfully Login");
          navigate("/AdminPage");
        } else {
          toast.error("Email or password wrong");
        }
      }

      if(type === "forget"){
         const response = forgetPassword(loginData.email, loginData.newPassword)
          if ((await response).success) {
          toast.success("Password Update, please login");
          navigate("/login");
        } else {
          toast.error("Email or password wrong");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Login failed");
    }
    toast.dismiss(toastId);
  };

  return (
    <div className="flex justify-center items-center h-screen max-w-[440px] mx-auto ">
      <section className="w-full bg-gray-950 px-6 py-10 rounded-2xl">
        <h1 className="mb-5 text-center text-xl font-semibold">
            {
                type === "login" ? "Sign in to your account" : "Update Your Password"
            }
          
        </h1>

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmitLogin}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>

          {type === "login" && (
            <>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  to="/forget-password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>
            </>
          )}

          {type === "forget" && (
            <>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={loginData.newPassword}
                  onChange={handleChange}
                  id="newPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="New Password"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </section>
    </div>
  );
};
