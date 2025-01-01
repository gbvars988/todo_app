import React, { useState } from "react";
import { deleteToDo, updateToDo } from "../Data/respository";

export default function ToDoItems({ items, setItems }) {
  const [editId, setEditId] = useState(null); // Tracks the todo being updated
  const [editTitle, setEditTitle] = useState(""); // Store the new todo 'title'
  //   const [items, setItems] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const data = await getAllToDos(); // this line without await returns an unresolved
  //       // promise into data, causing it to have typeof undefined (rather than an array of objects)
  //       console.log(data);
  //       setItems(data);
  //     };
  //     fetchData();
  //   }, []);

  // This useEffect causes an infinite loop, setItems will change [items] retriggering this
  // useeffect again.
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const data = await getAllToDos();
  //       console.log(data);
  //       setItems(data);
  //     };
  //     fetchData();
  //   }, [items]);

  const handleDelete = async (id) => {
    console.log(`Delete todo with ID: ${id}`);
    try {
      await deleteToDo(id);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (e) {
      console.error("Failed to delete To-Do", e);
    }
  };

  const handleEdit = (id, currentTitle) => {
    setEditId(id);
    setEditTitle(currentTitle);
  };

  const handleUpdate = async () => {
    const payload = { title: editTitle, body: "" };
    const success = await updateToDo(editId, payload);
    if (success) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editId ? { ...item, title: editTitle } : item
        )
      );
      setEditId(null);
    }
  };

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex justify-between items-center bg-gray-50 border border-gray-300 p-4 rounded shadow-sm"
        >
          {editId === item.id ? (
            <div className="flex items-center gap-2 w-full">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-grow border border-gray-300 rounded px-4 py-2 focus:ring focus:ring-blue-200"
              />
              <button
                onClick={handleUpdate}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditId(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-800">{item.title}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item.id, item.title)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
