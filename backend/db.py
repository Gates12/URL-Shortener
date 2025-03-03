import redis
from config import Config


# Initialize Redis connection
redis_client = redis.StrictRedis(
    host=Config.REDIS_HOST, 
    port=Config.REDIS_PORT, 
    db=Config.REDIS_DB, 
    decode_responses=True  # Ensures data is stored as readable text
)
