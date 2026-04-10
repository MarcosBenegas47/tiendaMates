from pydantic import BaseModel
from decimal import Decimal

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


class ConfigResponse(BaseModel):
    estilo: str
    material: str
    virola: str
    capacidad: str
    capacidad_ml: int

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
    configuracion: ConfigResponse
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



