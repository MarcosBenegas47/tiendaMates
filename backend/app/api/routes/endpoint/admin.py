from fastapi import UploadFile,File, APIRouter, Depends, Form
from sqlalchemy.orm import Session

from app.db.database import getDataBase, getDbAdmin
from app.repositories.product_repositoriy import ProducRepository
from app.repositories.admin_response import AdminRepository


from app.schemas.product import ProductCreate, ProductUpdate
import json

from typing import Optional 

router = APIRouter( prefix="/admin", tags=["Administracion"])
# responseProduct = ProducRepository()
responseAdmin = AdminRepository()

@router.post("/create/product")
async def createProduct(product:str =Form(...),db:Session=Depends(getDataBase),imgFirst:UploadFile | None = File(None),galery: list[UploadFile] = File([]),admin =Depends(getDbAdmin)):
    product_obj = ProductCreate.model_validate_json(product)
    print(product_obj)

    return await responseAdmin.productNew(db, product_obj,imgFirst,galery )

@router.put("/product/delete/{id}")
def deleteProduct(id:int, db:Session = Depends(getDataBase), admin = Depends(getDbAdmin)):
    return responseAdmin.deleteLogic(db, id)

@router.delete("/product/delete/fisica/{id}")
def deleteProduct(id:int, db:Session = Depends(getDataBase), admin = Depends(getDbAdmin)):
    return responseAdmin.delete(db,id)

@router.put("/product/update/{id}")
def updateProduct(id:int, data:ProductUpdate, db:Session = Depends(getDataBase), admin = Depends(getDbAdmin) ):
    return responseAdmin.update(db, id, data)

@router.get("/product/categorys")
def getCategorys(  db:Session = Depends(getDataBase), admin = Depends(getDbAdmin) ):
    return responseAdmin.getCategoryList(db )

@router.get("/product/capacidad")
def getCategorys(  db:Session = Depends(getDataBase), admin = Depends(getDbAdmin) ):
    return responseAdmin.getCapacidadList(db )
@router.get("/product/estilos")
def getCategorys(  db:Session = Depends(getDataBase), admin = Depends(getDbAdmin) ):
    return responseAdmin.getEstilosList(db )
@router.get("/product/virola")
def getCategorys(  db:Session = Depends(getDataBase), admin = Depends(getDbAdmin) ):
    return responseAdmin.getVirolaList(db )

@router.get("/product/material")
def getCategorys(  db:Session = Depends(getDataBase), admin = Depends(getDbAdmin) ):
    return responseAdmin.getMaterialList(db )

@router.get("/categorys/products")
def getproducts(db:Session = Depends(getDataBase), id:Optional[str] = None,limit:int = 6 ,offset:int=0):
    ids_list= None
    if id:
        ids_list = json.loads(id)  
    return responseAdmin.get_all_admin(db, id = ids_list ,limit = limit, offset = offset)

