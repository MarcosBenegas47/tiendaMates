from fastapi import APIRouter, Depends, Form
from sqlalchemy.orm import Session

from app.db.database import getDataBase, getDbAdmin
from app.repositories.product_repositoriy import ProducRepository

from app.schemas.product import ProductCreate, ProductUpdate
import json

from typing import Optional 

router = APIRouter( prefix="/store", tags=["Productos"])
responseProduct = ProducRepository()

@router.get("/products")
def getproducts(db:Session = Depends(getDataBase)):
    return responseProduct.get_all(db)

@router.get("/product/{queryLink}")
def getProduct(queryLink:str,db:Session = Depends(getDataBase)):
    return responseProduct.getProd(db,queryLink)

@router.get("/search/{queryLink}")
def searchProduct(queryLink:str,db:Session = Depends(getDataBase)):
    return responseProduct.searchByQueryLink(db,queryLink)

@router.get("/categorys")
def getCategory(db:Session = Depends(getDataBase)):
    return responseProduct.getCategory(db)

@router.get("/categorys/products")
def getproducts(db:Session = Depends(getDataBase), id:Optional[str] = None,limit:int = 6 ,offset:int=0):
    ids_list= None
    if id:
        ids_list = json.loads(id)  
    return responseProduct.get_all(db, id = ids_list ,limit = limit, offset = offset)

@router.get("/destacados")
def getDestacados(db:Session = Depends(getDataBase)):
    return responseProduct.getDestacados(db)

