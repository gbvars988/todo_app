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
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
