import { React, useState, useEffect } from "react";
import { addToDo, getAllToDos } from "../Data/respository";
import ToDoItems from "./ToDoItems";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ToDolist() {
  const [todo, setTodo] = useState("");
  const [items, setItems] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getAllToDos(); // this line without await returns an unresolved
      // promise into data, causing it to have typeof undefined (rather than an array of objects)
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
    const payload = {
      title: todo,
      body: "",
    };
    const response = await addToDo(payload);
    if (response) {
      setItems((prevItems) => [...prevItems, response]);
      setTodo(""); // Clear the input field after adding a todo
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded shadow-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">My ToDo List</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
        <div className="mt-6">
          <div className="flex gap-2">
            <input
              name="todotitle"
              type="text"
              id="todotitle"
              placeholder="Enter your todo..."
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              className="flex-grow border border-gray-300 rounded px-4 py-2 focus:ring focus:ring-blue-200"
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Create
            </button>
          </div>
        </div>
        <div className="mt-8">
          <ToDoItems items={items} setItems={setItems} />
        </div>
      </div>
    </div>
  );
}
