from pydantic import BaseModel
from decimal import Decimal

class ProductResponse(BaseModel):
    id:int
    codigo:str
    descripcion:str
    precio_unitario:Decimal
    cantidad:int
    eliminado:bool
    estado:bool
    query_link:str
    
    class Config:
        from_attributes = True