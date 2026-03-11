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



class ProductCreate(BaseModel):
    codigo: str
    nombre: str
    precio_unitario: Decimal
    cantidad: int
