import React, { useState } from "react";
import { deleteToDo, updateToDo } from "../Data/respository";
import { motion, AnimatePresence } from "framer-motion";

export default function ToDoItems({ items, setItems }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleDelete = async (id) => {
    await deleteToDo(id);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleUpdate = async () => {
    const payload = { title: editTitle, body: "" };
    await updateToDo(editId, payload);
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === editId ? { ...item, title: editTitle } : item
      )
    );
    setEditId(null);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-4 bg-gradient-to-br from-white via-indigo-50 to-indigo-100 rounded-lg shadow-lg flex justify-between items-center hover:shadow-2xl transition-shadow"
          >
            {editId === item.id ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-grow mr-4 p-3 border border-indigo-300 rounded-full focus:ring-4 focus:ring-indigo-400"
              />
            ) : (
              <span className="text-lg font-medium text-gray-800">
                {item.title}
              </span>
            )}

            <div className="flex gap-3">
              {editId === item.id ? (
                <>
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transform transition-all duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-full hover:bg-gray-400 transform transition-all duration-300"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditId(item.id);
                      setEditTitle(item.title);
                    }}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600 transform transition-all duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transform transition-all duration-300"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
