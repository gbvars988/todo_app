import React, { useState } from "react";
import { RegisterUser } from "../Data/respository";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await RegisterUser({ username, password });
      if (response && response.status === 200) {
        toast.success("Registration successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Something went wrong", error);
      toast.error("Registration failed. User may already exist");
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
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-4 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-transparent"
      />
      <button
        onClick={handleRegister}
        className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 px-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 font-semibold"
      >
        Register
      </button>
    </div>
  );
}
