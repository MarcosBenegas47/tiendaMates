import redis
import os
from dotenv import load_dotenv
load_dotenv()

dbURL = os.getenv("DATABASE_URL")
HOST = os.getenv("HOST")
PORT = os.getenv("PORT")
DECODE =os.getenv("DECODERESPONSE")
reddisCliente = redis.Redis(
    host=HOST,
    port=PORT,
    decode_responses=DECODE
)