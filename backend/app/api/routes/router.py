from fastapi import APIRouter
from app.api.routes.endpoint import products, auth, admin


apiRouter = APIRouter()

apiRouter.include_router(products.router)
apiRouter.include_router(auth.router)
apiRouter.include_router(admin.router)