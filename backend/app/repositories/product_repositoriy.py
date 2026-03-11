from sqlalchemy.orm import Session
from app.models.product import Product
from fastapi import Query
from app.schemas.product import ProductCreate
import re

class ProducRepository:
    def get_all(self, db:Session):
        return (db.query(Product).filter(Product.estado ==True).filter(Product.eliminado == False).all())
    
    def getProd(self, db:Session, queryLink:str):
        return(db.query(Product).filter(Product.query_link ==queryLink).first())
    
    def searchByQueryLink(self,db:Session,queryLink:str= Query(..., min_length=2, max_length=50) ):
        return(db.query(Product).filter(Product.query_link.ilike(f"%{queryLink}%")).all())
    
    def productNew(self,db:Session, product:ProductCreate):
        slug = product.nombre.lower()
        slug =slug.replace(" ", "-")
        slug = re.sub(r'[^a-z0-9-]', '', slug)
        newProduct = Product(
            codigo= product.codigo,
            nombre = product.descripcion,
            precio_unitario = product.precio_unitario,
            cantidad = product.cantidad,
            eliminado = False,
            estado = True,
            query_link = slug
        )
        db.add(newProduct)
        db.commit()
        db.refresh(newProduct)
        return newProduct
    
    def deleteLogic(self, db:Session, id):
        product = db.query(Product).filter(Product.id == id).first()
        product.eliminado = True
        db.commit()
        return {"message": "Producto Eliminado con exito"}
    
    def delete(self, db:Session, id):
        product = db.query(Product).filter(Product.id== id).first()
        db.delete(product)
        db.commit()
        return {"message":"Producto eliminado de la base correctamente"}