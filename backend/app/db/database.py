from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv
load_dotenv()

dbURL = os.getenv("DATABASE_URL")

engine = create_engine(dbURL)

sessionLocal = sessionmaker( autoflush=False, autocommit= False, bind=engine)

base = declarative_base()
def getDataBase():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()