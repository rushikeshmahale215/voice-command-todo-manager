import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Sidebar from "../pages/Sidebar";
import TodoCard from "../components/TodoCard";


const Completed = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompletedTodos = async () => {
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
          `http://localhost:8000/api/todos?user_id=${user.uid}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await res.json();

        const completedTodos = data.filter(
          (todo) =>
            typeof todo.status === "string" &&
            todo.status.toLowerCase() === "completed"
        );

        setTodos(completedTodos);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load completed todos.");
        setLoading(false);
      }
    };

    fetchCompletedTodos();
  }, []);

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        

        {loading && <p>Loading...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && todos.length === 0 && (
          <p>No completed todos yet.</p>
        )}

        {!loading &&
          !error &&
          todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
      </div>
    </div>
  );
};

export default Completed;

