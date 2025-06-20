import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export const NavbarComponets = () => {
  const { token, logout } = useAuth();
  console.log(token);
  const navigate = useNavigate();

  async function logOutFunction() {
    const toastId = toast.loading("Please wait...");
    try {
      logout();
      toast.success("User Logout...");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Logout issue");
    }
    toast.dismiss(toastId);
  }

  return (
    <div>
      <nav className="bg-white dark:bg-gray-800 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Feedback
            </span>
          </Link>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {token === null ? (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <Link to="/login">Login</Link>
              </button>
            ) : (
              <button
                type="button"
                onClick={logOutFunction}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
