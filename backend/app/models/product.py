from sqlalchemy import Column, Integer, String, Text, Numeric, Boolean
from app.db.database import base

class Product(base):
    __tablename__ = "productos"
    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(50))
    descripcion = Column(Text)
    precio_unitario = Column(Numeric(10,2))
    cantidad = Column(Integer)
    eliminado = Column(Boolean)
    estado = Column(Boolean)
    query_link = Column(Text)