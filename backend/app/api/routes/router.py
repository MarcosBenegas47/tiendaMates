from fastapi import APIRouter
from app.api.routes.endpoint import products, auth


apiRouter = APIRouter()

apiRouter.include_router(products.router)
apiRouter.include_router(auth.router)