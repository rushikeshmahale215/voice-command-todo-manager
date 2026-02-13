from click import DateTime
from pydantic import BaseModel
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database.db import Base

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    category = Column(String, default="General")
    status = Column(String, default="pending")
    user_id = Column(String, index=True)  # Firebase UID
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class TodoCreate(BaseModel):
    text: str
    user_id: str
    category: str = "General"

class TodoStatusUpdate(BaseModel):
    status: str
    title: str | None = None
    description: str | None = None

class TodoResponse(BaseModel):
    id: int
    text: str
    category: str
    status: str
    user_id: str
    created_at: datetime

    class Config:
        orm_mode = True
