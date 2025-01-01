import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import ToDoList from "./Components/ToDoList";
import ProtectedRoute from "./Context/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <ToDoList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
