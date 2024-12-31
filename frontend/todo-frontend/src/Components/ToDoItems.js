import React from "react";
import { useEffect, useState } from "react";
import { getAllToDos, deleteToDo } from "../Data/respository";

export default function ToDoItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllToDos();
      console.log(data);
      setItems(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllToDos();
      console.log(data);
      setItems(data);
    };
    fetchData();
  }, [items]);

  const handleDelete = async (id) => {
    console.log(`Delete todo with ID: ${id}`);
    const data = await deleteToDo(id);
  };

  return (
    <div>
      <ul>
        {items.map((element) => (
          <li key={element.id}>
            {element.title}
            <button onClick={() => handleDelete(element.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
