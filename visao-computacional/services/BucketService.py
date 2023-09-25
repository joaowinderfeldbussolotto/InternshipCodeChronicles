import boto3
from core.config import settings


def get_object_from_s3(bucket_name, imageName):
    s3_client = boto3.client('s3')
    if bucket_name is None:
        bucket_name = settings.BUCKET_NAME
    try:
        response = s3_client.get_object(Bucket=bucket_name, Key=imageName)
        object_data = response['Body'].read()
        return object_data
    except Exception as e:
        print(f"Error while getting object from S3: {e}")
        return None