import React, { useState } from "react";
import { LoginUser } from "../Data/respository";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

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
        alert("Login successful!");
        navigate("/todo");
      }
    } catch (error) {
      console.error("failed to login", error);
      alert("Login failed. Please check your username and password");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
}
