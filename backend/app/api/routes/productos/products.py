from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime

from app.db.database import getDataBase
from app.repositories.product_repositoriy import ProducRepository

router = APIRouter( prefix="/store", tags=["Productos"])
responseProduct = ProducRepository()

@router.get("/product")
def get_products(db:Session = Depends(getDataBase)):
    return responseProduct.get_all(db)

