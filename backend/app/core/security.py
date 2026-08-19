from argon2 import PasswordHasher
from sqlalchemy.orm import Session
from app.models.user import User

from datetime import datetime,UTC, timedelta
from jose import jwt,JWTError
import os
from dotenv import load_dotenv
load_dotenv()
secretKey = os.getenv("SECRET_KEY")

algoritmo = os.getenv("ALOGRITHM")

pwdContext = PasswordHasher()
ACCESS_TOKEN_EXPIRE_MINUTES = 40
def hashPassword(password: str):
    return pwdContext.hash(password)

def verfyPassword(plainPass, hashedPassword):
    return pwdContext.verify(hashedPassword,plainPass)
def createAccesToken(data:dict):
    toEncode = data.copy()
    expire = datetime.now(UTC) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    toEncode.update({"exp":expire})
    return jwt.encode(toEncode,secretKey,algorithm=algoritmo)
def veryToken(token:str, db:Session):
    try:
        decode = jwt.decode(token,secretKey,algorithms=[algoritmo] )
        userId = decode.get("userID")
        if not userId: 
            return False
        user = db.query(User).filter(User.id == int(userId)).first
        if not user:
            return False
        
        return True
    except JWTError:
        return None
    
