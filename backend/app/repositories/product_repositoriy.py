from sqlalchemy.orm import Session
from app.models.product import Product,Product_destacados ,Producto_categoria
from app.models.category import Categoy
from app.schemas.product import ProductResponse
from fastapi import Query
from app.schemas.product import ProductCreate , GetProductResponse
import re
from app.repositories.images import imagesProduct
class ProducRepository:
    def get_all(self, db:Session, id = None,limit = 6, offset = 0):
        products = db.query(Product)
        if id:
            print(id)
            products= products.select_from(Producto_categoria)\
            .join(Product, Product.id ==Producto_categoria.producto_id)\
            .filter(Product.estado ==True).filter(Product.eliminado == False)\
                .filter(Producto_categoria.categoria_id.in_(id))
        else:
            products=products.filter(Product.estado ==True).filter(Product.eliminado == False)
        
        querys = products.offset(offset).limit(limit).all()
        results =[]
        for product in querys:
            imageURL = imagesProduct.getImages(product.codigo)
          
            results.append(
                ProductResponse(
            id=product.id,
            codigo=product.codigo,
            nombre=product.nombre,
            precio_unitario=product.precio_unitario,
            cantidad=product.cantidad,
            eliminado=product.eliminado,
            estado=product.estado,
            query_link=product.query_link,
            imgURL=imageURL
            )
            )

        return results
    



    def getProd(self, db:Session, queryLink:str):
        product = db.query(Product).filter(Product.query_link ==queryLink).first()
        imageURL = imagesProduct.getImages(product.codigo)
        product.image_id = imageURL
        galeryImages = imagesProduct.getProductImages(product.codigo)
        return GetProductResponse(
            id=product.id,
            codigo=product.codigo,
            nombre=product.nombre,
            precio_unitario=product.precio_unitario,
            cantidad=product.cantidad,
            eliminado=product.eliminado,
            estado=product.estado,
            query_link=product.query_link,
            imgURL=imageURL,
            galery=galeryImages
            )
    
    def searchByQueryLink(self,db:Session,queryLink:str= Query(..., min_length=2, max_length=50) ):
        products = db.query(Product)\
            .select_from(Product_destacados)\
            .join(Product, Product.id ==Product_destacados.producto_id)\
            .filter(Product.query_link.ilike(f"%{queryLink}%")).all()
        results =[]
        for product in products:
            imageURL = imagesProduct.getImages(product.codigo)
          
            results.append(
                ProductResponse(
            id=product.id,
            codigo=product.codigo,
            nombre=product.nombre,
            precio_unitario=product.precio_unitario,
            cantidad=product.cantidad,
            eliminado=product.eliminado,
            estado=product.estado,
            query_link=product.query_link,
            imgURL=imageURL
            )
            )

        return results

    
    def getCategory(self, db:Session):
        return (db.query(Categoy).all())
    
    def getDestacados(self, db:Session):
        products = db.query(Product).select_from(Product_destacados).join(Product, Product.id ==Product_destacados.producto_id).all()
        results =[]
        for product in products:
            imageURL = imagesProduct.getImages(product.codigo)
          
            results.append(
                ProductResponse(
            id=product.id,
            codigo=product.codigo,
            nombre=product.nombre,
            precio_unitario=product.precio_unitario,
            cantidad=product.cantidad,
            eliminado=product.eliminado,
            estado=product.estado,
            query_link=product.query_link,
            imgURL=imageURL
            )
            )
        return results
    

    def productNew(self,db:Session, product:ProductCreate):
        slug = product.nombre.lower()
        slug =slug.replace(" ", "-")
        slug = re.sub(r'[^a-z0-9-]', '', slug)
        newProduct = Product(
            codigo= product.codigo,
            nombre = product.nombre,
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