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
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editId === item.id ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {item.title}
                <button onClick={() => handleEdit(item.id, item.title)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
