import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TodoDetail.css";

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // Fetch Todo + AI Summary
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);

        const res = await fetch(`https://voice-command-todo-manager.onrender.com/api/todos/${id}`);
        if (!res.ok) throw new Error("Failed to fetch todo");

        const data = await res.json();
        setTodo(data);

        // Fetch AI summary
        try {
          const descRes = await fetch(
            `https://voice-command-todo-manager.onrender.com/api/todos/${id}/summary`
          );
          const descData = await descRes.json();
          setDescription(descData.summary);
        } catch (err) {
          setDescription("AI summary not available.");
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load todo.");
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleStatusUpdate = async () => {
  if (!todo) return;

  const newStatus =
    todo.status?.toLowerCase() === "completed"
      ? "pending"
      : "completed";

  try {
    setUpdating(true);

    const response = await fetch(
      `https://voice-command-todo-manager.onrender.com/api/todos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.log("Server error:", text);
      throw new Error("Update failed");
    }

    const updated = await response.json();
    setTodo(updated);
    setUpdating(false);
  } catch (err) {
    console.error(err);
    setUpdating(false);
    setError("Failed to complete todo.");
  }
};



  const formattedDate =
    todo?.created_at
      ? new Date(todo.created_at).toLocaleString()
      : "Not available";

  if (loading) return <div className="detail-loading">Loading...</div>;
  if (error) return <div className="detail-error">{error}</div>;
  if (!todo) return <div className="detail-error">Todo not found</div>;

  return (
    <div className="layout">
      <div className="content detail-content">
        <div className="detail-card">
          <h1 className="detail-title">{todo.text}</h1>

          <div className="detail-meta">
            <span
              className={`status-badge ${
                todo.status?.toLowerCase() === "completed"
                  ? "completed"
                  : "pending"
              }`}
            >
              {todo.status?.toUpperCase()}
            </span>

            {todo.category && (
              <span className="category-badge">
                {todo.category}
              </span>
            )}
          </div>

          <div className="detail-section">
            <h3>Created</h3>
            <p>{formattedDate}</p>
          </div>

          <div className="detail-section">
            <h3>Description</h3>
            <p>
              {description
                ? description
                : "Generating intelligent summary..."}
            </p>
          </div>

          <div className="detail-actions">
            <button
              onClick={handleStatusUpdate}
              disabled={updating}
              className={`btn ${
                todo.status?.toLowerCase() === "completed"
                  ? "warning"
                  : "success"
              }`}
            >
              {updating
                ? "Updating..."
                : todo.status?.toLowerCase() === "completed"
                ? "Mark as Pending"
                : "Mark as Complete"}
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="btn secondary"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;