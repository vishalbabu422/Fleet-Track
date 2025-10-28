import { useState } from "react";
import Logo from "../../assets/fleet-logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toastr from "toastr";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toastr.success(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      if (err.response && err.status == 422) {
        setMessage(err.response.data.message);
      }

      if (err.response && err.status == 401) {
        toastr.error(err.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <img alt="Your Company" src={Logo} className="mx-auto h-30 w-auto" />
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <div class="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={handleChange}
                />
              </div>
              <span className="text-sm text-red-500 flex item-start ms-1 mt-1">
                {message && message?.email ? message.email[0] : ""}
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={handleChange}
                />
              </div>
              <span className="text-sm text-red-500 flex item-start ms-1 mt-1">
                {message && message?.password ? message.password[0] : ""}
              </span>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </div>
          </form>
          <p class="mt-10 text-center text-sm/6 text-gray-500 ">
            Not a member?
            <Link
              to="/register"
              class="font-semibold text-indigo-600 hover:text-indigo- ml-1"
            >
              
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
