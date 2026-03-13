from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import getDataBase
from app.repositories.userRepository import userRepository
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.user import UserResponse, UserSchema
from app.core.security import verfyPassword, createAccesToken

router = APIRouter( prefix="/auth", tags=["Autenticacion"])
userRepo = userRepository()

@router.post("/register", response_model=UserResponse)
def regiser(user:UserSchema, db:Session= Depends(getDataBase)):
    existingUser =userRepo.getByEmail(db,user.email)
    if existingUser:
        raise HTTPException(
            status_code=400,
            detail="El usuario ya existe"
        )
    newUser = userRepo.createUser(db,user)
    return newUser 


# @router.post("/login")
# def login(user:UserSchema, db:Session =Depends(getDataBase)):
#     dbUser = userRepo.getUserByEmail(db, user.email)
#     if not dbUser:
#         raise HTTPException(401, "Credencial incorrectas" )
#     if not verfyPassword(user.password, dbUser.password):
#         raise HTTPException(401,"Credencial incorrectas")
#     token = createAccesToken({"sub":dbUser.email,"userID":dbUser.id})
#     return {"token": token, "tokenType":"bearer"}


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(getDataBase)
):

    user = userRepo.getUserByEmail(db, form_data.username)

    if not user:
        raise HTTPException(401, "Credenciales incorrectas")

    if not verfyPassword(form_data.password, user.password):
        raise HTTPException(401, "Credenciales incorrectas")

    token = createAccesToken({"sub":user.email,"userID":user.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }