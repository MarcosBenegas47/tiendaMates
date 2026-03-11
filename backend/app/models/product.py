from sqlalchemy import Column, Integer, String, Text, Numeric, Boolean
from app.db.classDatabase import Base

class Product(Base):
    __tablename__ = "productos"
    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(50))
    nombre = Column(Text)
    precio_unitario = Column(Numeric(10,2))
    cantidad = Column(Integer)
    eliminado = Column(Boolean)
    estado = Column(Boolean)
    query_link = Column(Text)
