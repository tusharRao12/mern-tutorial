import { useContext } from 'react';
import { TodoItemsContext } from '../store/todo-items-store';
import styles from './ToDOItems.module.css'
import TodoItem from './TodoItem';

const TodoItems = () => {
  const { todoItems} = useContext(TodoItemsContext);
  return (
    <div className={styles.itemsContainer}>
      {todoItems.map((item, index) => (
        <TodoItem
          key={index}
          todoDate={item.dueDate}
          todoName={item.name}
          onDeleteClick={deleteItem}
        />
      ))}
    </div>
  );
};

export default TodoItems;