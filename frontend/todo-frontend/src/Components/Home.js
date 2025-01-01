import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Welcome to ToDo App
      </h1>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`py-2 px-6 rounded-lg ${
            isLogin
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-blue-600 hover:bg-gray-300"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`py-2 px-6 rounded-lg ${
            !isLogin
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-green-600 hover:bg-gray-300"
          }`}
        >
          Register
        </button>
      </div>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
}
