import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import TodoList from "../components/TodoList";
import VoiceInput from "../components/VoiceInput";
import Header from "../pages/Header";
import Sidebar from "../pages/Sidebar";

import "./Dashboard.css";

const API_BASE = "http://localhost:8000";

// -------------------------
// Category detection (VOICE)
// -------------------------
const detectCategory = (text) => {
  const t = text.toLowerCase();

  if (t.includes("buy") || t.includes("grocer") || t.includes("shop"))
    return "Shopping";

  if (t.includes("gym") || t.includes("health") || t.includes("exercise"))
    return "Health";

  if (t.includes("book") || t.includes("read"))
    return "Personal";

  if (t.includes("meeting") || t.includes("project") || t.includes("work"))
    return "Work";

  return "General";
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, [auth]);

  useEffect(() => {
    if (!user) return;

    const loadTodos = async () => {
      try {
        setLoading(true);
        const data = await fetchTodos(user.uid);
        setTodos(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [user]);

  const handleVoiceResult = async (text) => {
    try {
      setLoading(true);

      const newTodo = await createTodo({
        text,
        user_id: user.uid,
        category: detectCategory(text),
      });

      setTodos((prev) => [newTodo, ...prev]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id) => {
    await completeTodo(id);

    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "completed" } : t
      )
    );
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  if (!user) return <p>Loading dashboard...</p>;

  return (
    <div className="layout">
      <Sidebar collapsed={collapsed} />

      <div className="main">
        <Header user={user} onMenuClick={() => setCollapsed(!collapsed)} />

        <main className="content">
          <div className="voice-section">
            <VoiceInput onFinalResult={handleVoiceResult} />
          </div>

          {loading && <p>Processing...</p>}
          {error && <p className="error">{error}</p>}

          <TodoList
            todos={todos}
            onDelete={handleDelete}
            onComplete={handleComplete}
          />
        </main>


        {/* ✅ Footer restored */}
        <footer className="app-foot">
          <p>© {new Date().getFullYear()} VoiceTodo. All rights reserved.</p>
        </footer>

        <VoiceCommandButton />

      </div>
    </div>
  );
};

export default Dashboard;


