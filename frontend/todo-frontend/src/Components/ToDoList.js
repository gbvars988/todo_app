import { React, useState } from "react";
import { addToDo } from "../Data/respository";

export default function ToDolist() {
  const [todo, setTodo] = useState();

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
  };
  return (
    <div>
      <input
        name="todotitle"
        id="todotitle"
        placeholder="Enter your todo..."
        value="dumbo"
        onChange={handleinput}
      />
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}
