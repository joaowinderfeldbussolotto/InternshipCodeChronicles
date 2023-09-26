import boto3
from core.config import settings
rekognition_client = boto3.client('rekognition', region_name='us-east-1')


def detect_labels(imageName, bucketName=settings.BUCKET_NAME):
    """
     Detect labels (objects) in an image using Amazon Rekognition.
     
     @param imageName (str) - Name of the image to detect labels
     @param bucketName (str, optional) - S3 bucket to use for detection

     @return dict: A dictionary containing the detected labels and their confidence scores.
    """
    try:
        response = rekognition_client.detect_labels(
            Image={
                "S3Object": {
                    "Bucket": bucketName,
                    "Name": imageName
                }
            },
            MaxLabels=10,
            MinConfidence=60.0
        )
        return response
    except Exception as e:
        return str(e)


def detect_faces(imageName, bucketName=settings.BUCKET_NAME):
  """
  Detect faces in an image using Amazon Rekognition.
  
  @param imageName (str): The name of the image to be analyzed.
  @param bucketName (str, optional): The name of the Amazon S3 bucket where the image is stored.
                                      Defaults to the value in settings.BUCKET_NAME.
  
  @return dict: A dictionary containing information about the detected faces.
  """

  try:
    response = rekognition_client.detect_faces(
      Image={
        'S3Object': {
          'Bucket': bucketName, 
          'Name': imageName
          }
      },
      Attributes=['ALL'])
    return response
  except Exception as e:
    return str(e)
