import AddTodo from "./components/AddTodo";
import AppName from "./components/AppName";
import "./App.css";
import TodoItems from "./components/TodoItems";
import { useState } from "react";
import WelcomeMessge from "./components/WelcomeMessge";

function App() {
  let [todoItems, setTodoItems] = useState([]);

  const handleNewItem = (itemName,itemDueDate)=>{
    const newTodoItems = [...todoItems,{name:itemName,dueDate:itemDueDate}];
    setTodoItems(newTodoItems);
  }

  const handleDeleteItem = (todoItemName) =>{
    const newTodoItems = todoItems.filter((item) => item.name !== todoItemName);
    setTodoItems(newTodoItems);
  }
  return (
    <center className="todo-container">
      <AppName />
      <AddTodo onNewItem={handleNewItem} />
      {todoItems.length === 0 && <WelcomeMessge />}
      <TodoItems todoItems={todoItems} onDeleteClick={handleDeleteItem} />
    </center>
  );
}

export default App;
