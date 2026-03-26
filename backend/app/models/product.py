from sqlalchemy import Column, Integer, String, Text, Numeric, Boolean,ForeignKey
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

class Product_destacados(Base):
    __tablename__= "productos_destacados"
    producto_id = Column(Integer, ForeignKey("productos.id"), primary_key=True)

class Producto_categoria(Base):
    __tablename__= "producto_categoria"
    producto_id = Column(Integer, ForeignKey("productos.id"), primary_key=True)
    categoria_id = Column(Integer, ForeignKey("categoria.id"), primary_key=True)
    
    