import os

class Settings:
    AWS_REGION_NAME = os.environ.get("AWS_REGION_NAME")
    BUCKET_NAME = os.environ.get("BUCKET_NAME")
    DYNAMODB_TABLE_NAME = os.environ.get("DYNAMODB_TABLE_NAME")
            
settings = Settings()
