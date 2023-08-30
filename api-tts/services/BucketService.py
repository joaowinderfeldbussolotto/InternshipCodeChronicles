import boto3
from core.config import settings
from utils import getFormattedDateTime

s3_client = boto3.client('s3', 
                         region_name = settings.AWS_REGION_NAME,
                         aws_access_key_id = settings.AWS_ACCESS_KEY_ID,
                         aws_secret_access_key = settings.AWS_SECRET_ACCESS_KEY 
                        )


def get_file_url(bucket_name, key):
    return f'https://{bucket_name}.s3.amazonaws.com/{key}'


def upload_to_bucket(file, key = None, bucket_name = settings.BUCKET_NAME):
    
    if not key:
        key = f'audio-file-{getFormattedDateTime()}.mp3'
        
    response = s3_client.put_object(
        Bucket=bucket_name,
        Key=key,
        Body=file,
        ContentType='audio/mpeg'
    )
    
    return get_file_url(bucket_name, key)
    
        
