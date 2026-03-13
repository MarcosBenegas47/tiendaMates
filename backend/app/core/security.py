from argon2 import PasswordHasher
from datetime import datetime,UTC, timedelta
from jose import jwt
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