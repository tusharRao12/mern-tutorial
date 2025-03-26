import AddTodo from "./components/AddTodo";
import AppName from "./components/AppName";
import "./App.css";
import TodoItems from "./components/TodoItems";
import { useState } from "react";
import WelcomeMessge from "./components/WelcomeMessge";
import { TodoItemsContext } from "./store/todo-items-store";

function App() {
  let [todoItems, setTodoItems] = useState([]);

  const addNewItem = (itemName,itemDueDate)=>{
    const newTodoItems = [...todoItems,{name:itemName,dueDate:itemDueDate}];
    setTodoItems(newTodoItems);
  }

  const deleteItem = (todoItemName) =>{
    const newTodoItems = todoItems.filter((item) => item.name !== todoItemName);
    setTodoItems(newTodoItems);
  }  
  return (
    <TodoItemsContext.Provider value={{
      todoItems,
      addNewItem,
      deleteItem,
      }}>
    <center className="todo-container">
      <AppName />
      <AddTodo />
      <WelcomeMessge/>
      <TodoItems />
    </center>
    </TodoItemsContext.Provider>
  );
}

export default App;
