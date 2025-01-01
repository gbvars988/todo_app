import React, { useState } from "react";
import { RegisterUser } from "../Data/respository";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await RegisterUser({ username, password });
      if (response && response.status === 200) {
        alert("Registration successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Something went wrong", error);
      alert("Registration failed. User may already exist");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button
        onClick={handleRegister}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
      >
        Register
      </button>
    </div>
  );
}
