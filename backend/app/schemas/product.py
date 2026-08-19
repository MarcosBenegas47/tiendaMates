from pydantic import BaseModel
from decimal import Decimal
from typing import Optional

class ProductResponse(BaseModel):
    id:int
    codigo:str
    nombre:str
    precio_unitario:Decimal
    cantidad:int
    eliminado:bool
    estado:bool
    query_link:str
    imgURL:Optional[str] = None
    
    class Config:
        from_attributes = True



class EstiloMate(BaseModel):
    id:int
    nombre:str


class Material(BaseModel):
    id:int
    nombre:str


class Virola(BaseModel):
    id:int
    nombre:str


class Capacidad(BaseModel):
    id:int
    ml:int
    descripcion:str
class ConfigResponse(BaseModel):
    estilo: EstiloMate
    material: Material
    virola: Virola
    capacidad: Capacidad

class GetProductResponse(BaseModel):
    id:int
    codigo:str
    nombre:str
    descripcion:str
    precio_unitario:Decimal
    cantidad:int
    destacado:bool
    eliminado:bool
    estado:bool
    query_link:str
    categorias:Optional[list[int]] = None
    imgURL:str
    galery:list[str]
    configuracion: Optional[ConfigResponse] = None
    class Config:
        from_attributes = True

class ConfiProductCreate(BaseModel):
    idEstilo: int
    idMaterial: int
    idVirola: int
    idCapacidad: int


class ProductCreate(BaseModel):
    codigo: str
    nombre: str
    precio_unitario: Decimal
    cantidad: int
    descripcion:str
    categoria:list[int]
    configuracion:ConfiProductCreate

class ProductUpdate(BaseModel):
    id: int
    codigo: str
    nombre: str
    precio_unitario:str
    descripcion:str
    destacado:bool
    cantidad:int
    eliminado:bool
    estado:bool
    query_link:str
    categoria:list[int]
    configuracion:ConfiProductCreate

class ProductResponseAdmin(BaseModel):
    id:int
    codigo:str
    nombre:str
    precio_unitario:Decimal
    cantidad:int
    eliminado:bool
    estado:bool
    destacado:bool
    query_link:str
    categoria: Optional[list[int]] = None
    imgURL:Optional[str] = None
    descripcion:str
    galery:Optional[list[str]] = None
    class Config:
        from_attributes = True


