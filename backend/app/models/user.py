from sqlalchemy import Column, Integer, String,TIMESTAMP, Boolean
from sqlalchemy.sql import func
from app.db.classDatabase import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique = True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="admin")
    estado = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP, server_default=func.now())