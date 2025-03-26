import React, { useState,useContext } from "react";
import { IoIosAdd } from "react-icons/io";
import { TodoItemsContext } from "../store/todo-items-store";

const AddTodo = () => {
  const { addNewItem } = useContext(TodoItemsContext);
  const [todoName, setTodoName] = useState("")
  const [dueDate, setdueDate] = useState("");

  const handleNameChange = (event) =>{
    setTodoName(event.target.value);
  }

  const handleDateChange = (event) =>{
    setdueDate(event.target.value);
  }

  const handleAddButtonClicked = (event)=>{
    event.preventDefault();
    addNewItem(todoName,dueDate);
    setdueDate("");
    setTodoName("");
  }

  return (
    <div className="container">
      <form className="row kg-row" onSubmit={handleAddButtonClicked}>
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
          >
            <IoIosAdd />
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
