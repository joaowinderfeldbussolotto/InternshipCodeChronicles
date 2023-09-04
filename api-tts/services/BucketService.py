import boto3
from core.config import settings
from utils import getFormattedDateTime

s3_client = boto3.client('s3',region_name = settings.AWS_REGION_NAME)


def get_file_url(bucket_name, key):
    """
    Get the URL for a file. This is useful for downloading files from S3.

    @param bucket_name (str)- The name of the bucket to use.
    @param key - The key under which to look for the file.

    @return The URL for the file in S3 with the bucket and key specified in the arguments as a string
    """
    return f'https://{bucket_name}.s3.amazonaws.com/{key}'


def upload_to_bucket(file, key = None, bucket_name = settings.BUCKET_NAME):
    """
     Uploads a file to S3 and returns the URL to the uploaded file. If you don't specify a key the file will be named " audio - { timestamp }. mp3 "
     
     @param file - The file to upload.
     @param key - The key to store the file in. If not specified a key will be generated based on the time of upload.
     @param bucket_name - The name of the bucket to upload the file to.
     
     @return The URL to the uploaded file. Note that this URL is different from the URL returned by get_file_url
    """
    
    # Get the key for the audio file
    if not key:
        key = f'audio-file-{getFormattedDateTime().replace(" ", "_")}.mp3'
    
    response = s3_client.put_object(
        Bucket=bucket_name,
        Key=key,
        Body=file,
        ContentType='audio/mpeg'
    )
    
    return get_file_url(bucket_name, key)
    
        
