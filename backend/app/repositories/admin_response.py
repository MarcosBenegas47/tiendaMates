from sqlalchemy.orm import Session
from app.models.product import Product,Capacidad, EstiloMate,Material,Virola , Producto_categoria, ProductoConfiguracion, ProductoImagen
from app.models.category import Categoy
from app.schemas.product import ProductResponse
from fastapi import Query, HTTPException,UploadFile
from app.schemas.product import ProductCreate , GetProductResponse, ConfigResponse,ProductUpdate
import re
from app.repositories.images import imagesProduct

from sqlalchemy import text
class AdminRepository:
    def getCategoryList(self, db:Session):
        categoy = db.query(Categoy).all()
        return categoy
    def getCapacidadList(self, db:Session):
        capacidad= db.query(Capacidad).all()
        return capacidad
    def getEstilosList(self, db:Session):
        estilo= db.query(EstiloMate).all()
        return estilo
    def getVirolaList(self, db:Session):
        virola = db.query(Virola).all()
        return virola
    def getMaterialList(self, db:Session):
        material = db.query(Material).all()
        return material

    async def productNew(self,db:Session, product:ProductCreate, imaFirst:UploadFile, galery:list[UploadFile]):
        imgfirtsURL = await imagesProduct.uploadImg(imaFirst)
        imgGalery = await imagesProduct.uploadGalery(galery)
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
            query_link = slug,
            img = imgfirtsURL
            
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

        for url in imgGalery:
            db.add(
                ProductoImagen(
                    producto_id=newProduct.id,
                    url=url
                )
            )

        for id in product.categoria:
            db.add(
                Producto_categoria(
                    producto_id =  newProduct.id,
                    categoria_id = id
                )
            )
        # db.commit()

        try:
            db.commit()
            db.refresh(newProduct)

            return {
                "success": True,
                "message": "Producto creado correctamente",
                "id": newProduct.id
            }

        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=500,
                detail=str(e)
            )
    
    def deleteLogic(self, db:Session, id):
        print(id)
        product = db.query(Product).filter(Product.id == id).first()
        product.eliminado = True
        db.commit()
        return {"message": "Producto Eliminado con exito"}
    
    def delete(self, db:Session, id):
        print(id)
        
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