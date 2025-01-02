import React, { useState, useEffect } from "react";
import {
  addToDo,
  getAllToDos,
  updateStatus,
  deleteToDo,
  updateToDo,
} from "../Data/respository";
import ToDoItems from "./ToDoItems";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ToDoList() {
  const [todo, setTodo] = useState("");
  const [items, setItems] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getAllToDos();
      if (data) {
        setItems(data);
      }
    };
    fetchItems();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSubmit = async () => {
    const payload = { title: todo, body: "" };
    const response = await addToDo(payload);
    if (response) {
      setItems((prevItems) => [...prevItems, response]);
      setTodo("");
    }
  };

  const handleDrop = async (id, newStatus) => {
    try {
      await updateStatus(id, { newStatus });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteToDo(id);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  const handleEdit = async (id, newTitle) => {
    try {
      const payload = { title: newTitle, body: "" };
      await updateToDo(id, payload);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, title: newTitle } : item
        )
      );
    } catch (error) {
      console.error("Failed to edit item", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-white to-indigo-200">
      <header className="w-full flex justify-between items-center p-6 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-10">
        <h1 className="text-4xl font-extrabold text-white tracking-wide">
          My To-Do List
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-red-600 transform hover:scale-105 transition-all duration-300"
        >
          Logout
        </button>
      </header>

      <main className="flex flex-col items-center py-10 px-4 space-y-6">
        <div className="w-full max-w-4xl flex gap-4">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter a new to-do..."
            className="flex-grow p-4 text-lg border border-indigo-300 rounded-full shadow-md focus:ring-4 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            Add
          </button>
        </div>
        <div className="w-full max-w-4xl">
          <ToDoItems
            items={items}
            setItems={setItems}
            onDrop={handleDrop}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </main>
    </div>
  );
}
