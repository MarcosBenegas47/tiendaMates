from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserSchema
from app.core.security import hashPassword
class userRepository:
    def getUserById(self,db:Session,userId):
        return db.query(User).filter(User.id == userId).first()
    def getUserByEmail(self,db:Session,email:str):
        print(email)
        return db.query(User).filter(User.email == email).first()
    def createUser(self, db:Session, user:UserSchema):

        hashedPassword = hashPassword(user.password)
        print(hashedPassword)
        newUser =User(
            email=user.email,
            password= hashedPassword,
            role = "admin"
        )
        db.add(newUser)
        db.commit()
        db.refresh(newUser)
        return newUser
    def getByEmail(self, db:Session, email:str):
        return db.query(User).filter(User.email ==email).first()
    

