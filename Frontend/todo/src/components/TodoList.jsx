import TodoCard from "./TodoCard";
import "./todolist.css";

const TodoList = ({ todos, onDelete, onComplete }) => {
  if (!todos.length) {
    return (
      <div className="empty-state">
        <h3>No todos yet 📒</h3>
        <p>Speak to create your first task</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
};

export default TodoList;

