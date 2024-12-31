import { React, useState, useEffect } from "react";
import { addToDo, getAllToDos } from "../Data/respository";
import ToDoItems from "./ToDoItems";

export default function ToDolist() {
  const [todo, setTodo] = useState();
  const [items, setItems] = useState([]);

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

  const handleinput = (event) => {
    const todo = event.target.value;
    setTodo(todo);
    console.log(todo);
  };

  const handleSubmit = async () => {
    const payload = {
      title: todo,
      body: "",
    };
    const response = await addToDo(payload);
    if (response) {
      setItems((prevItems) => [...prevItems, response]);
    }
  };
  return (
    <div>
      <input
        name="todotitle"
        type="text"
        id="todotitle"
        placeholder="Enter your todo..."
        // value="dumbo"
        onChange={handleinput}
      />
      <button onClick={handleSubmit}>Create</button>
      <div>
        <ToDoItems items={items} setItems={setItems}></ToDoItems>
      </div>
    </div>
  );
}
