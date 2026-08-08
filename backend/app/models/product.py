from sqlalchemy import  Column, Integer, String, Text, Numeric, Boolean,ForeignKey
from app.db.classDatabase import Base
from sqlalchemy.orm import relationship
from app.models.category import Category
class Product(Base):
    __tablename__ = "productos"
    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(50))
    nombre = Column(Text)
    descripcion= Column(Text)
    precio_unitario = Column(Numeric(10,2))
    cantidad = Column(Integer)
    eliminado = Column(Boolean)
    estado = Column(Boolean)
    query_link = Column(Text)
    img = Column(Text)
    
    configuracion = relationship(
        "ProductoConfiguracion",
        back_populates="producto",
        uselist=False,  # 👈 clave: 1 a 1
        passive_deletes=True
    )
    imagenes = relationship(
        "ProductoImagen",
        back_populates="producto",
        cascade="all, delete-orphan"
    )
    categorias = relationship(
    "Category",
    secondary="producto_categoria",
    back_populates="productos"
    )


class ProductoImagen(Base):
    __tablename__ = "producto_imagenes"

    id = Column(Integer, primary_key=True)
    producto_id = Column(Integer, ForeignKey("productos.id"))
    url = Column(String)

    producto = relationship("Product", back_populates="imagenes")



class Product_destacados(Base):
    __tablename__= "productos_destacados"
    producto_id = Column(Integer, ForeignKey("productos.id"), primary_key=True)

class Producto_categoria(Base):
    __tablename__= "producto_categoria"
    producto_id = Column(Integer, ForeignKey("productos.id"), primary_key=True)
    categoria_id = Column(Integer, ForeignKey("categorias.id"), primary_key=True)
    
class EstiloMate(Base):
    __tablename__ = "estilos_mate"
    id = Column(Integer, primary_key=True)
    nombre = Column(String)


class Material(Base):
    __tablename__ = "material"
    id = Column(Integer, primary_key=True)
    nombre = Column(String)


class Virola(Base):
    __tablename__ = "virola"
    id = Column(Integer, primary_key=True)
    nombre = Column(String)


class Capacidad(Base):
    __tablename__ = "capacidad"
    id = Column(Integer, primary_key=True)
    ml = Column(Integer)
    descripcion=Column(String)

class ProductoConfiguracion(Base):
    __tablename__ = "producto_configuracion"

    id = Column(Integer, primary_key=True)

    producto_id = Column(Integer, ForeignKey("productos.id"))
    estilo_id = Column(Integer, ForeignKey("estilos_mate.id"))
    material_id = Column(Integer, ForeignKey("material.id"))
    virola_id = Column(Integer, ForeignKey("virola.id"))
    capacidad_id = Column(Integer, ForeignKey("capacidad.id"))


    producto = relationship("Product", back_populates="configuracion")
    estilo = relationship("EstiloMate")
    material = relationship("Material")
    virola = relationship("Virola")
    capacidad = relationship("Capacidad")