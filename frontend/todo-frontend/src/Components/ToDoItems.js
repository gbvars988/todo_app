import React from "react";
import { useEffect, useState } from "react";
import { getAllToDos, deleteToDo } from "../Data/respository";

export default function ToDoItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllToDos(); // this line without await returns an unresolved
      // promise into data, causing it to have typeof undefined (rather than an array of objects)
      console.log(data);
      setItems(data);
    };
    fetchData();
  }, []);

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
      const data = await getAllToDos();
      setItems(data);
    } catch (e) {
      console.error("Failed to delete To-Do", e);
    }
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
