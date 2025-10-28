import { useState } from "react";
import Logo from "../../assets/fleet-logo.png";
import axios from "axios";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useNavigate, Link } from "react-router-dom";
import toastr from "toastr";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
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
        "http://localhost:8000/api/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toastr.success(res.data.message);
      navigate("/login");
    } catch (err) {
      if (err.response && err.status == 422) {
        setMessage(err.response.data.message);
      }
    }
  };

  return (
    <>
      {message && message == "success" && (
        <div className="fixed top-5 right-5 z-50 rounded-lg bg-green-600 px-4 py-3 text-white shadow-lg">
          <div className="flex items-center justify-between d-none">
            <span>Registration successful</span>
            <button className="ml-4 text-white hover:text-gray-200">✕</button>
          </div>
        </div>
      )}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <img alt="Your Company" src={Logo} className="mx-auto h-30 w-auto" />
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <div class="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={handleChange}
                />
              </div>
              <span className="text-sm text-red-500 flex item-start ms-1 mt-1">
                {message && message?.name ? message.name[0] : ""}
              </span>
            </div>

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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="country"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Role
                </label>
              </div>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="role"
                  name="role"
                  autoComplete="role-name"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="dispatcher">Dispatcher</option>
                  <option value="driver">Driver</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
              <span className="text-sm text-red-500 flex item-start ms-1 mt-1">
                {message && message?.role ? message.role[0] : ""}
              </span>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
          </form>
          <p class="mt-10 text-center text-sm/6 text-gray-500 ">
            Already a member?
            <Link
              to="/login"
              class="font-semibold text-indigo-600 hover:text-indigo- ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
