import axios from "axios";

const API_HOST = "http://localhost:5140";

async function addToDo(todo) {
  const response = await axios.post(API_HOST + "/todo/add", todo, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export { addToDo };
