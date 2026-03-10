from fastapi import FastAPI
from app.api.routes.productos.products import router 
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
load_dotenv()
ALLOWED_ORIGINS= os.getenv("ALLOWED_ORIGINS")

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins= ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"]
    )
app.include_router(router,prefix="/api/routes")

@app.get("/",include_in_schema=False)
async def root():
    return{
        "docs":"/docs"
    }