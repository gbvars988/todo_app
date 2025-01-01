import React, { useState } from "react";
import { LoginUser } from "../Data/respository";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const token = await LoginUser({ username, password });
      if (token) {
        login(token);
        toast.success("Login successful!");
        navigate("/todo");
      }
    } catch (error) {
      console.error("failed to login", error);
      toast.error("Login failed. Please check your username and password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-xl w-full max-w-md transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-800">
        Login to Your Account
      </h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-transparent"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-4 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-transparent"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 font-semibold"
      >
        Login
      </button>
    </div>
  );
}
