import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import TodoList from "../components/TodoList";
import VoiceInput from "../components/VoiceInput";
import Header from "../pages/Header";
import Sidebar from "../pages/Sidebar";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../category/CategoryFilter";


import {
  fetchTodos,
  createTodo,
  deleteTodo,
  completeTodo,
  searchTodos,
} from "../api/todo";

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
  const auth = getAuth();

  const [user, setUser] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState("");

  // ===============================
  // Auth Listener
  // ===============================
  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, [auth]);

  // ===============================
  // Load Todos
  // ===============================
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

  // ===============================
  // Voice Command Handler
  // ===============================
  const handleVoiceResult = async (text) => {
    if (!user) return;

    const lower = text.toLowerCase();

    try {
      setLoading(true);
      setError("");

      // SEARCH
      if (lower.startsWith("search for")) {
        const query = text.replace(/search for/i, "").trim();
        await handleSearch(query);
        return;
      }

      if (lower.startsWith("find")) {
        const query = text.replace(/find/i, "").trim();
        await handleSearch(query);
        return;
      }

      // DELETE
      if (lower.includes("delete") || lower.includes("remove")) {
        const keyword = lower
          .replace("delete", "")
          .replace("remove", "")
          .trim();

        const todoToDelete = todos.find((t) =>
          t.text.toLowerCase().includes(keyword)
        );

        if (!todoToDelete) {
          setError("Todo not found for deletion");
          return;
        }

        await deleteTodo(todoToDelete.id, user.uid);

        setTodos((prev) =>
          prev.filter((t) => t.id !== todoToDelete.id)
        );

        setVoiceMessage(`Deleted ${todoToDelete.text}`);
        return;
      }

      // COMPLETE
      if (
        lower.includes("complete") ||
        lower.includes("done") ||
        lower.includes("mark")
      ) {
        const keyword = lower
          .replace("complete", "")
          .replace("done", "")
          .replace("mark", "")
          .replace("as", "")
          .trim();

        const todoToUpdate = todos.find((t) =>
          t.text.toLowerCase().includes(keyword)
        );

        if (!todoToUpdate) {
          setError("Todo not found to update");
          return;
        }

        const updated = await completeTodo(
          todoToUpdate.id,
          user.uid
        );

        setTodos((prev) =>
          prev.map((t) =>
            t.id === todoToUpdate.id ? updated : t
          )
        );

        setVoiceMessage(
          `Marked ${todoToUpdate.text} as complete`
        );

        return;
      }

      // DEFAULT → CREATE
      const newTodo = await createTodo({
        text,
        user_id: user.uid,
        category: detectCategory(text),
      });

      setTodos((prev) => [newTodo, ...prev]);

      setVoiceMessage(`Added ${text} to your todos`);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Delete (Manual)
  // ===============================
  const handleDelete = async (id) => {
    try {
      setLoading(true);

      const todoToDelete = todos.find((t) => t.id === id);

      await deleteTodo(id, user.uid);

      setTodos((prev) =>
        prev.filter((t) => t.id !== id)
      );

      setVoiceMessage(`Deleted ${todoToDelete?.text}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Toggle Status
  // ===============================
  const handleToggleStatus = async (todo) => {
    try {
      setLoading(true);

      const updated = await completeTodo(
        todo.id,
        user.uid
      );

      setTodos((prev) =>
        prev.map((t) =>
          t.id === todo.id ? updated : t
        )
      );

      setVoiceMessage(
        `Updated status for ${todo.text}`
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Search
  // ===============================
  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError("");

      const results = await searchTodos(query, user.uid);

      setTodos(results);
      setSearchQuery(query);
      setIsSearching(true);
    } catch (e) {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = async () => {
    setIsSearching(false);
    setSearchQuery("");

    const data = await fetchTodos(user.uid);
    setTodos(data);
  };

  // ===============================
  // Category Filtering
  // ===============================
  const categories = [
    ...new Set(todos.map((t) => t.category)),
  ];

  const filteredTodos =
    selectedCategory === "All"
      ? todos
      : todos.filter(
          (t) => t.category === selectedCategory
        );

  if (!user) return <p>Loading dashboard...</p>;

  return (
    <div className="layout">
      <Sidebar collapsed={collapsed} />

      <div className="main">
        <Header
          user={user}
          onMenuClick={() =>
            setCollapsed(!collapsed)
          }
        />

        <main className="content">
          {/* Voice */}
          <div className="voice-section">
            <VoiceInput onFinalResult={handleVoiceResult} />
          </div>

          {loading && <p>Processing...</p>}
          {error && <p className="error">{error}</p>}

          {/* Search */}
          <SearchBar
            onSearch={handleSearch}
            onClear={handleClearSearch}
          />

          {/* Category */}
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          {/* Todos */}
          <TodoList
            todos={filteredTodos}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />

          {isSearching && todos.length === 0 && (
            <p>No results found for "{searchQuery}"</p>
          )}
        </main>


        {/* ✅ Footer restored */}
        <footer className="app-foot">
          <p>© {new Date().getFullYear()} VoiceTodo. All rights reserved.</p>

        </footer>

        

      </div>
    </div>
  );
};

export default Dashboard;