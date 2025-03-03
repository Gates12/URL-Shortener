import os


class Config:
    REDIS_HOST = os.getenv("REDIS_HOST", "localhost")  # Default to localhost
    REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))  # Redis default port
    REDIS_DB = int(os.getenv("REDIS_DB", 0))  # Using default DB 0
