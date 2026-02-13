const API_BASE = "http://localhost:8000";

// ==============================
// Fetch All Todos
// ==============================
export const fetchTodos = async (userId) => {
  const res = await fetch(`${API_BASE}/api/todos?user_id=${userId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return res.json();
};

// ==============================
// Create Todo
// ==============================
export const createTodo = async (data) => {
  const res = await fetch(`${API_BASE}/api/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Create API error:", text);
    throw new Error("Failed to create todo");
  }

  return res.json();
};

// ==============================
// Complete Todo
// ==============================
export const completeTodo = async (id) => {
  const res = await fetch(`${API_BASE}/api/todos/${id}/complete`, {
    method: "PUT",
  });

  if (!res.ok) {
    throw new Error("Failed to complete todo");
  }

  return res.json(); // IMPORTANT: return updated todo
};

// ==============================
// Delete Todo
// ==============================
export const deleteTodo = async (id) => {
  const res = await fetch(`${API_BASE}/api/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }

  return res.json();
};

// ==============================
// Search Todos
// ==============================
export const searchTodos = async (query, userId) => {
  const res = await fetch(
    `${API_BASE}/api/todos/search?query=${encodeURIComponent(
      query
    )}&user_id=${userId}`
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Search API error:", text);
    throw new Error("Search failed");
  }

  return res.json();
};


