from sqlalchemy.orm import Session
from app.models.user import User

class userRepository:
    def getUserById(self,db:Session,userId):
        return db.query(User).filter(User.id == userId).first()
    def getUserByEmail(self,db:Session,email:str):
        return db.query(User).filter(User.email == email).first()