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
    imgURL:str
    
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
    eliminado:bool
    estado:bool
    query_link:str
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
    imgFirst:str
    galery:list[str]
    configuracion:ConfiProductCreate
    query_link: str

class ProductUpdate(BaseModel):
    id: int
    codigo: str
    nombre: str
    precio_unitario:str
    descripcion:str
    cantidad:int
    eliminado:bool
    estado:bool
    query_link:str
    imgURL:str
    galery:list[str]
    configuracion:ConfiProductCreate



