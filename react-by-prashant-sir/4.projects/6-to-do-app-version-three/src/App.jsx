import AddTodo from "./components/AddTodo";
import AppName from "./components/AppName";
import "./App.css";
import TodoItems from "./components/TodoItems";

function App() {
  const todoItems = [
    {
    name: 'Buy Milk',
    dueDate: '4-10-2025'
  },
  {
    name: 'Buy Soda',
    dueDate: '3-10-2025'
  }, 
  {
    name: 'Like',
    dueDate: '14-03-2025'
  }  
]
  return (
    <center className="todo-container">
      <AppName />
      <AddTodo />
      <TodoItems todoItems={todoItems}/>
    </center>
  );
}

export default App;
