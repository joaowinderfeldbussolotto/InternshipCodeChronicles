from dotenv import load_dotenv
import os
load_dotenv()

class Settings:
    BUCKET_NAME = os.environ.get('BUCKET_NAME')

settings = Settings()