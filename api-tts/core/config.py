import os
from dotenv import load_dotenv
load_dotenv()

class Settings:
    AWS_REGION_NAME = os.getenv("AWS_REGION_NAME")
            
settings = Settings()
