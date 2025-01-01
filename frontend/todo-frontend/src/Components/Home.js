import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-extrabold mb-6 drop-shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to ToDo App
      </motion.h1>

      <div className="flex gap-4 mb-6">
        <motion.button
          onClick={() => setIsLogin(true)}
          className={`py-2 px-6 rounded-lg shadow-lg ${
            isLogin
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 hover:bg-gray-300"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
        <motion.button
          onClick={() => setIsLogin(false)}
          className={`py-2 px-6 rounded-lg shadow-lg ${
            !isLogin
              ? "bg-green-600 text-white"
              : "bg-white text-green-600 hover:bg-gray-300"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Register
        </motion.button>
      </div>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-2xl text-gray-800">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Login />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Register />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
