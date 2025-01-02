import React, { useState } from "react";
import { RegisterUser } from "../Data/respository";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await RegisterUser({ username, password });
      if (response && response.status === 200) {
        toast.success("Registration successful! Please login.");
        navigate("/");
      }
    } catch (error) {
      console.error("Something went wrong", error);
      toast.error("Registration failed. User may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-lg shadow-xl w-full max-w-md transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-green-800">
        Create an Account
      </h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-transparent"
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-4 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-transparent"
        disabled={loading}
      />
      <button
        onClick={handleRegister}
        className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 px-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 font-semibold"
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Loading...
          </div>
        ) : (
          "Register"
        )}
      </button>
    </div>
  );
}
