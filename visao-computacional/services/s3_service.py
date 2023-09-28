import pytz
import boto3
from core.config import settings
from exceptions.aws_exceptions.s3_exception import S3Exception
def created_image_datetime(imageName, bucketName=settings.BUCKET_NAME):
    """
    Get the datetime when the image was created.
    @param imageName (str): The image name.
    @param bucketName (str): The bucket name.
    @return str: The datetime when the image was created.
    """
    if bucketName is None:
     bucketName = settings.BUCKET_NAME
    try:
        s3 = boto3.client('s3')
        imageInfo = s3.head_object(Bucket=bucketName, Key=imageName)
        tz = pytz.timezone('America/Sao_Paulo')
        response = imageInfo['LastModified'].astimezone(tz).strftime("%d-%m-%Y %H:%M:%S")
        return response
    except Exception as e:
        error_code = e.response['Error']['Code']
        raise S3Exception.handle_s3_exception(error_code)