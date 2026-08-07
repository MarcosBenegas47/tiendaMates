from sqlalchemy import Column, Integer, Text
from app.db.classDatabase import Base
from sqlalchemy.orm import relationship

class Category(Base):
    __tablename__ = "categorias"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(Text)
    productos = relationship(
        "Product",
        secondary="producto_categoria",
        back_populates="categorias"
    )