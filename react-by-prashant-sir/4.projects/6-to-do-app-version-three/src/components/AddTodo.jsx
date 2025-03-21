import React, { useState } from "react";

const AddTodo = ({ onNewItem }) => {

  const [todoName, setTodoName] = useState("")
  const [dueDate, setdueDate] = useState("");

  const handleNameChange = (event) =>{
    setTodoName(event.target.value);
  }

  const handleDateChange = (event) =>{
    setdueDate(event.target.value);
  }

  const handleAddButtonClicked = ()=>{
    onNewItem(todoName,dueDate);
    setdueDate("");
    setTodoName("");
  }

  return (
    <div className="container">
      <div className="row kg-row">
        <div className="col-6">
          <input
            type="text"
            placeholder="Enter Todo Here"
            name="name"
            value={todoName}
            onChange={handleNameChange}
          />
        </div>
        <div className="col-4">
          <input
            type="date"
            name="date"
            onChange={handleDateChange}
            value={dueDate}
          />
        </div>
        <div className="col-2">
          <button
            className="btn btn-success kg-button"
            onClick={handleAddButtonClicked}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
