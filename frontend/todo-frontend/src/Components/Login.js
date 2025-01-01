import React, { useState } from "react";
import { LoginUser } from "../Data/respository";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const token = await LoginUser({ username, password });
      if (token) {
        localStorage.setItem("authToken", token);
        alert("Login successful!");
      }
    } catch (error) {
      console.error("failed to login", error);
      alert("Login failed. Please check your username and password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
