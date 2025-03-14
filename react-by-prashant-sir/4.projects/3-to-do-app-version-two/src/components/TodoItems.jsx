import styles from './ToDOItems.module.css'
import TodoItem from './TodoItem';
const TodoItems = ({todoItems}) => {
  return (
    <div className={styles.itemsContainer}>
      {todoItems.map((item, index) => (
        <TodoItem key={index} todoDate={item.dueDate} todoName={item.name} />
      ))}
    </div>
  )
}

export default TodoItems;