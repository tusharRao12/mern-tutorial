import AddTodo from "./components/AddTodo";
import AppName from "./components/AppName";
import "./App.css";
import TodoItems from "./components/TodoItems";
import { useReducer } from "react";
import WelcomeMessge from "./components/WelcomeMessge";

const todoItemsReducer = (currTodoItems, action) =>{
  let newTodoItems = currTodoItems;
   if(action.type === 'NEW_ITEM'){
    newTodoItems = [
      ...currTodoItems,
      {name:action.payload.itemName, dueDate:action.payload.dueDate},
    ];
   }else if (action.type === 'DELETE_ITEM'){
    newTodoItems = currTodoItems.filter(
      (item) => item.name !== action.payload.itemName
    );
   }
  return newTodoItems;
};

function App() {
  const [todoItems, dispatchTodoItems] = useReducer(todoItemsReducer, []);

  const handleNewItem = (itemName,itemDueDate) =>{
    const newItemAction = {
      type: "NEW_ITEM",
      payload:{
        itemName,
        itemDueDate
      }
    };
    dispatchTodoItems(newItemAction);
  }
  const handleDeleteItem = (todoItemName) =>{
    const deleteItemAction = {
      type: "DELETE_ITEM",
      payload: {
        itemName:todoItemName
      },
    };
    dispatchTodoItems(deleteItemAction);
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
