import os
from dotenv import load_dotenv
load_dotenv()

class Settings:
    AWS_REGION_NAME = os.getenv("AWS_REGION_NAME")
    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
    BUCKET_NAME = os.getenv("BUCKET_NAME")
    DYNAMODB_TABLE_NAME = os.getenv("DYNAMODB_TABLE_NAME")
            
settings = Settings()
