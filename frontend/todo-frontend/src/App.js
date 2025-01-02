import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import ToDoList from "./Components/ToDoList";
import ProtectedRoute from "./Context/ProtectedRoute";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  );
}

export default App;
