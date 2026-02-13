import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Sidebar from "../pages/Sidebar";
import TodoCard from "../components/TodoCard";

const Pending = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPendingTodos = async () => {
      try {
        setLoading(true);

        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `https://voice-command-todo-manager.onrender.com/api/todos?user_id=${user.uid}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await res.json();

        const pendingTodos = data.filter(
          (todo) =>
            typeof todo.status === "string" &&
            todo.status.toLowerCase() === "pending"
        );

        setTodos(pendingTodos);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load pending todos.");
        setLoading(false);
      }
    };

    fetchPendingTodos();
  }, []);

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && todos.length === 0 ? (
          <div className="empty-state">
            <h3>No pending tasks 🎉</h3>
            <p>You're all caught up. Great work!</p>
          </div>
        ) : (
          <div className="todos-grid">
            {todos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pending;
