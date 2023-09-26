import pytz
import boto3

def created_image_datetime(imageName, bucket):
    """
    Get the datetime when the image was created.
    @param imageName (str): The image name.
    @param bucket (str): The bucket name.
    @return str: The datetime when the image was created.
    """
    try:
        s3 = boto3.client('s3')
        imageInfo = s3.head_object(Bucket=bucket, Key=imageName)
        tz = pytz.timezone('America/Sao_Paulo')
        response = imageInfo['LastModified'].astimezone(tz).strftime("%d-%m-%Y %H:%M:%S")
        return response
    except Exception as e:
        return str(e)