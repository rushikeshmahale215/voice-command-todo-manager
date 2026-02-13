import { useNavigate } from "react-router-dom";
import "./todocard.css";

const TodoCard = ({ todo, onDelete, onComplete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/todos/${todo.id}`);
  };

  return (
    <div className="todo-card" onClick={handleCardClick}>
      <div className="todo-header">
        <h3>{todo.text}</h3>
        <span className={`todo-status ${todo.status}`}>
          {todo.status}
        </span>
      </div>

      <p className="todo-category">
          Category: {todo.category}
      </p>


      <small>
        {new Date(todo.created_at).toLocaleString()}
      </small>
      
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();   
          onDelete(todo.id);
        }}
      >
        Delete
      </button>

    </div>
  );
};

export default TodoCard;

