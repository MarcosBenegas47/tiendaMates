from sqlalchemy import Column, Integer, Text
from app.db.classDatabase import Base

class Categoy(Base):
    __tablename__ = "categorias"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(Text)