import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

export default function ToDoItems({
  items,
  setItems,
  onDrop,
  onDelete,
  onEdit,
}) {
  const categories = ["todo", "doing", "done"];

  const categorizedItems = {
    todo: items.filter((item) => item.status === "todo"),
    doing: items.filter((item) => item.status === "doing"),
    done: items.filter((item) => item.status === "done"),
  };

  const renderItems = (category) =>
    categorizedItems[category].map((item) => (
      <DraggableToDoItem
        key={item.id}
        item={item}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    ));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <DroppableCategory key={category} category={category} onDrop={onDrop}>
          <h2 className="text-2xl font-bold text-indigo-600 mb-4 capitalize">
            {category}
          </h2>
          <div className="space-y-4">{renderItems(category)}</div>
        </DroppableCategory>
      ))}
    </div>
  );
}

function DraggableToDoItem({ item, onDelete, onEdit }) {
  const [{ isDragging }, drag] = useDrag({
    type: "todo",
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const [expanded, setExpanded] = useState(false);

  const handleSave = () => {
    onEdit(item.id, editTitle);
    setEditMode(false);
  };

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.8 : 1,
        transform: isDragging ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.2s ease",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      className="p-4 bg-gradient-to-br from-white via-indigo-50 to-indigo-100 rounded-lg shadow-lg flex flex-col hover:shadow-2xl transition-shadow"
    >
      {editMode ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="p-3 border border-indigo-300 rounded-full focus:ring-4 focus:ring-indigo-400"
        />
      ) : (
        <span
          className={`text-lg font-medium text-gray-800 break-words ${
            !expanded ? "truncate" : ""
          }`}
          onClick={() => setExpanded(!expanded)}
          title="Click to expand/collapse"
        >
          {item.title}
        </span>
      )}

      <div className="flex gap-2 mt-3">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white py-1 px-2 rounded-full hover:bg-green-600 transform transition-all duration-300"
            >
              ✔️
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-300 text-gray-800 py-1 px-2 rounded-full hover:bg-gray-400 transform transition-all duration-300"
            >
              ❌
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditMode(true)}
              className="bg-yellow-500 text-white py-1 px-2 rounded-full hover:bg-yellow-600 transform transition-all duration-300"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="bg-red-500 text-white py-1 px-2 rounded-full hover:bg-red-600 transform transition-all duration-300"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function DroppableCategory({ category, onDrop, children }) {
  const [{ isOver }, drop] = useDrop({
    accept: "todo",
    drop: (item) => onDrop(item.id, category),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? "#e0f7fa" : "white",
        transition: "background-color 0.2s ease",
      }}
      className="bg-white shadow-lg p-6 rounded-lg border-t-4 border-indigo-500 space-y-4"
    >
      {children}
    </div>
  );
}
