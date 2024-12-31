import axios from "axios";

const API_HOST = "http://localhost:5140";

async function addToDo(todo) {
  const response = await axios.post(API_HOST + "/todo/add", todo);
  // headers: {
  //   "Content-Type": "application/json", // not required tbh axios does it auto
  // },

  return response.data;
}

async function getAllToDos() {
  const response = await axios.get(API_HOST + "/todo/get");
  return response.data;
}

async function deleteToDo(id) {
  const response = await axios.delete(API_HOST + `/todo/delete/${id}`);
  return response.data;
}

export { addToDo, getAllToDos, deleteToDo };
