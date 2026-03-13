from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
import os
from dotenv import load_dotenv
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from app.repositories.userRepository import userRepository
from app.models.user import User

load_dotenv()

dbURL = os.getenv("DATABASE_URL")
secretKey = os.getenv("SECRET_KEY")
algoritmo = os.getenv("ALOGRITHM")

engine = create_engine(dbURL)

sessionLocal = sessionmaker( autoflush=False, autocommit= False, bind=engine)


def getDataBase():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()

oAuthSchema = OAuth2PasswordBearer(tokenUrl="/api/routes/auth/login")
userRepo = userRepository()
def getDbUser(token:str = Depends(oAuthSchema), db:Session =Depends(getDataBase)):
    try:
        payload = jwt.decode(token,secretKey, algorithms=[algoritmo] )
        userID = payload.get("sub")
        if userID is None:
            raise HTTPException(status_code=401, detail="token invalido")
    except Exception:
        raise HTTPException(status_code=401,detail="token invalido")
    print(userID)
    user  = userRepo.getUserByEmail(db, userID)
    return user


def getDbAdmin(user:User = Depends(getDbUser)):
    if user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="No autorizado"
        )
    return user

