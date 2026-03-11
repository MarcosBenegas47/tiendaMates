from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import getDataBase
from app.repositories.userRepository import userRepository

from app.schemas.user import UserResponse

router = APIRouter( prefix="/auth", tags=["Usuario"])
# responseClient = UserResponse()
