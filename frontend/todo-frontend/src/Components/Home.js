import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <h1>Welcome to ToDo App</h1>
      <div>
        <button onClick={() => setIsLogin(true)}>Login</button>
        <button onClick={() => setIsLogin(false)}>Register</button>
      </div>
      <div>{isLogin ? <Login /> : <Register />}</div>
    </div>
  );
}
