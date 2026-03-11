from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import getDataBase, getDbAdmin
from app.repositories.product_repositoriy import ProducRepository

from app.schemas.product import ProductCreate

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

@router.post("/create/product")
def createProduct(product:ProductCreate,
                  db:Session=Depends(getDataBase),
                  admin =Depends(getDbAdmin)):
    return responseProduct.productNew(db, product)

@router.put("/product/delete/{id}")
def deleteProduct(id:int, db:Session = Depends(getDataBase), admin = Depends(getDbAdmin)):
    return responseProduct.deleteLogic(db, id)

@router.delete("/product/delete/fisica/{id}")
def deleteProduct(id:int, db:Session = Depends(getDataBase), admin = Depends(getDbAdmin)):
    return responseProduct.delete(db,id)
