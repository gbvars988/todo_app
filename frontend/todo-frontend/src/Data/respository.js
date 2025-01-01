import axios from "axios";

const API_HOST = "http://localhost:5140";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

async function updateToDo(id, newTitle) {
  const response = await axios.put(API_HOST + `/todo/update/${id}`, newTitle);
  return response.data;
}

// ----- Auth

async function RegisterUser(userDetails) {
  const response = await axios.post(API_HOST + `/auth/register`, userDetails);
  return response;
}

async function LoginUser(userDetails) {
  const response = await axios.post(API_HOST + `/auth/login`, userDetails);
  return response.data.token;
}

export {
  addToDo,
  getAllToDos,
  deleteToDo,
  updateToDo,
  RegisterUser,
  LoginUser,
};
