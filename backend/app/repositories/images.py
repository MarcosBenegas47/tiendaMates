import cloudinary
import cloudinary.utils
import cloudinary.search
import cloudinary.uploader
import os
import re
from fastapi import UploadFile 
from dotenv import load_dotenv
load_dotenv()

CLOUD_NAME= os.getenv("CLOUD_NAME")
API_KEY= os.getenv("API_KEY")
API_SECRET= os.getenv("API_SECRET")
cloudinary.config(
    cloud_name= CLOUD_NAME,
    api_key=API_KEY,
    api_secret=API_SECRET 
)

BASE_URL = f"https://res.cloudinary.com/dbw43etz4/image/upload"

class imagesProduct:
    def getImages(codigo:str):
        url =  cloudinary.utils.cloudinary_url(
            codigo,
            format="webp"
        )
        return url[0]
    def getProductImages(codigo: str):

        search_expression = f"folder:images/{codigo}/*"
    
        result = cloudinary.search.Search() \
            .expression(search_expression) \
            .max_results(500) \
            .execute()
        
        return [recurse["secure_url"] for recurse in result.get('resources', [])]
    async def uploadImg(imgFirst:UploadFile):
        if(imgFirst):
            result= cloudinary.uploader.upload(
                await imgFirst.read()
            )
            print(result["secure_url"])
            return result["secure_url"]
    async def uploadGalery(galery:list[UploadFile]):
        urls = []
        for img in galery:
            result= cloudinary.uploader.upload(
                await img.read()
            )
            urls.append(result["secure_url"])
            print(result["secure_url"])
        return urls
    def deleteImg(urlImage:str):
        urlSplit = urlImage.split('upload')
        segmentos_sin_version = re.sub(r'^v\d+/', '', urlSplit[1])
        public_id = segmentos_sin_version.rsplit('.', 1)[0]
        public_id = public_id.split('/', 1)[1]
        print(public_id)
        resultado = cloudinary.uploader.destroy(public_id)
        return resultado
    def deleteGaleryImg(urlImage:str):
            urlSplit = urlImage.split('upload')
            segmentos_sin_version = re.sub(r'^v\d+/', '', urlSplit[1])
            public_id = segmentos_sin_version.rsplit('.', 1)[0]
            public_id = public_id.split('/', 1)[1]
            print(public_id)
            cloudinary.api.delete_resources([])
            return resultado