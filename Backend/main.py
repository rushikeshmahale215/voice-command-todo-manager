from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime
import sqlite3

class StatusUpdate(BaseModel):
    status: str

app = FastAPI(title="VoiceTodo API")

# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["https://voice-command-todo-manager-sh2m.vercel.app/"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Database Setup
# =========================
DB_NAME = "todos.db"

def get_db():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            user_id TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            category TEXT DEFAULT 'General',
            created_at TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

init_db()

# =========================
# Category Extraction
# =========================
def extract_category(text: str):
    text_lower = text.lower()

    if any(word in text_lower for word in ["buy", "shop", "grocer"]):
        return "Shopping"

    if any(word in text_lower for word in ["gym", "exercise", "health"]):
        return "Health"

    if any(word in text_lower for word in ["meeting", "project", "work"]):
        return "Work"

    if any(word in text_lower for word in ["read", "book", "study"]):
        return "Personal"

    return "General"

# =========================
# Health Check
# =========================
@app.get("/")
def health():
    return {"status": "ok"}

# =========================
# Create Todo
# =========================
@app.post("/api/todos")
def create_todo(todo: dict):
    conn = get_db()
    cursor = conn.cursor()

    category = todo.get("category") or extract_category(todo["text"])
    created_at = datetime.utcnow().isoformat()

    cursor.execute("""
        INSERT INTO todos (text, user_id, status, category, created_at)
        VALUES (?, ?, 'pending', ?, ?)
    """, (
        todo["text"],
        todo["user_id"],
        category,
        created_at
    ))

    todo_id = cursor.lastrowid
    conn.commit()

    cursor.execute("SELECT * FROM todos WHERE id = ?", (todo_id,))
    row = cursor.fetchone()
    conn.close()

    return dict(row)

# =========================
# Get All Todos
# =========================
@app.get("/api/todos")
def get_todos(user_id: str):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM todos
        WHERE user_id = ?
        ORDER BY datetime(created_at) DESC
    """, (user_id,))

    rows = cursor.fetchall()
    conn.close()

    return [dict(row) for row in rows]

# =========================
# Complete Todo
# =========================
@app.put("/api/todos/{todo_id}")
def update_todo(todo_id: int, payload: StatusUpdate):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM todos WHERE id = ?", (todo_id,))
    todo = cursor.fetchone()

    if not todo:
        conn.close()
        raise HTTPException(status_code=404, detail="Todo not found")

    cursor.execute(
        "UPDATE todos SET status = ? WHERE id = ?",
        (payload.status.lower(), todo_id),
    )

    conn.commit()

    cursor.execute("SELECT * FROM todos WHERE id = ?", (todo_id,))
    updated = cursor.fetchone()

    conn.close()

    return dict(updated)


# =========================
# Delete Todo
# =========================
@app.delete("/api/todos/{todo_id}")
def delete_todo(todo_id: int):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM todos WHERE id = ?", (todo_id,))
    deleted = cursor.rowcount
    conn.commit()
    conn.close()

    if deleted == 0:
        raise HTTPException(status_code=404, detail="Todo not found")

    return {"message": "Todo deleted"}

# =========================
# Search Todos
# =========================
@app.get("/api/todos/search")
def search_todos(query: str, user_id: str):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM todos
        WHERE user_id = ?
        AND text LIKE ?
        ORDER BY datetime(created_at) DESC
    """, (user_id, f"%{query}%"))

    rows = cursor.fetchall()
    conn.close()

    return [dict(row) for row in rows]

@app.get("/api/todos/{todo_id}/summary")
def generate_summary(todo_id: int):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT text FROM todos WHERE id = ?", (todo_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return {"summary": "Todo not found."}

    text = row["text"]

    # Simple AI-like summary (replace with Gemini/Groq later)
    summary = f"This task involves: {text}. Make sure to complete it on time for better productivity."

    return {"summary": summary}

@app.get("/api/todos/{todo_id}")
def get_single_todo(todo_id: int):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM todos WHERE id = ?", (todo_id,))
    row = cursor.fetchone()

    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Todo not found")

    return dict(row)


