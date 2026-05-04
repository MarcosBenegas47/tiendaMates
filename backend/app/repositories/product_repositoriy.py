from sqlalchemy.orm import Session
from app.models.product import Product,Product_destacados ,Producto_categoria, ProductoConfiguracion, ProductoImagen
from app.models.category import Categoy
from app.schemas.product import ProductResponse
from fastapi import Query, HTTPException
from app.schemas.product import ProductCreate , GetProductResponse, ConfigResponse,ProductUpdate
import re
from app.repositories.images import imagesProduct

from sqlalchemy import text
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
            imgURL=product.img
            )
            )

        return results
    


    def getProd(self, db:Session, queryLink:str):
        product = db.query(Product).filter(Product.query_link ==queryLink).first()
        imageURL = imagesProduct.getImages(product.codigo)
        product.image_id = imageURL

        imagesUrls = db.query(ProductoImagen).filter(ProductoImagen.producto_id == product.id ).all()

        galeryImages = [imgs.url for imgs in imagesUrls]



        config = product.configuracion

        config_response = None

        if config:
            config_response = ConfigResponse(
                estilo=config.estilo.nombre if config.estilo else None,
                material=config.material.nombre if config.material else None,
                virola=config.virola.nombre if config.virola else None,
                capacidad=config.capacidad.descripcion if config.capacidad else None,
                capacidad_ml=config.capacidad.ml if config.capacidad else None
            )

        return GetProductResponse(  
            id=product.id,
            codigo=product.codigo,
            nombre=product.nombre,
            precio_unitario=product.precio_unitario,
            cantidad=product.cantidad,
            eliminado=product.eliminado,
            descripcion=product.descripcion,
            estado=product.estado,
            query_link=product.query_link,
            imgURL=product.img,
            galery=galeryImages,
            configuracion= config_response
    )
            
    
    def searchByQueryLink(self,db:Session,queryLink:str= Query(..., min_length=2, max_length=50) ):
        products = db.query(Product)\
            .filter(Product.estado ==True).filter(Product.eliminado == False)\
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
            imgURL=product.img
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
            imgURL=product.img
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
            descripcion = product.descripcion,
            cantidad = product.cantidad,
            eliminado = False,
            estado = True,
            query_link = slug
        )
        db.add(newProduct)
        db.flush()
        config = product.configuracion
        newConfig= ProductoConfiguracion(
            producto_id = newProduct.id ,
            estilo_id = config.idEstilo,
            virola_id = config.idVirola,
            material_id = config.idMaterial,
            capacidad_id = config.idCapacidad,
        )
        db.add(newConfig)
        db.commit()

        return newProduct
    
    def deleteLogic(self, db:Session, id):
        product = db.query(Product).filter(Product.id == id).first()
        product.eliminado = True
        db.commit()
        return {"message": "Producto Eliminado con exito"}
    
    def delete(self, db:Session, id):
        
        product = db.query(Product).filter(Product.id== id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Producto no encontrado")
        db.delete(product)
        db.commit()
        return {"message":"Producto eliminado de la base correctamente"}
    
    def update(self, db:Session, id:int, data:ProductUpdate):
        product = db.query(Product).filter(Product.id == id).first()

        if not product:
            raise HTTPException(status_code=404, detail="Producto no encontrado")


        product.codigo = data.codigo
        product.nombre = data.nombre
        product.precio_unitario = data.precio_unitario
        product.cantidad = data.cantidad
        product.descripcion = data.descripcion
        product.estado = data.estado
        product.query_link = data.query_link


        config = db.query(ProductoConfiguracion)\
            .filter(ProductoConfiguracion.producto_id == product.id)\
            .first()
        if not config:
            config = ProductoConfiguracion(
                producto_id=product.id
            )
            db.add(config)

        config.estilo_id = data.configuracion.idEstilo
        config.material_id = data.configuracion.idMaterial
        config.virola_id = data.configuracion.idVirola
        config.capacidad_id = data.configuracion.idCapacidad

   
       
        # -------------------------
        # 💾 GUARDAR
        # -------------------------
        db.commit()
        db.refresh(product)

        return {"message": "Producto actualizado correctamente"}