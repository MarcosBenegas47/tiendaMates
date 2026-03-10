from sqlalchemy.orm import Session
from app.models.product import Product


class ProducRepository:
    def get_all(self, db:Session):
        return (db.query(Product).filter(Product.estado ==True).filter(Product.eliminado == False).all())
    
    