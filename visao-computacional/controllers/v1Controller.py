from utils import createResponseData, create_body
from services.RekognitionService import detect_labels
from services.S3Service import created_image_datetime
import json



def handle_v1_vision(event):
    """
    Handle the request for the v1/vision endpoint. 

    @param event (dict): The request body.
    
    @return dict: The response body.
    """

    try:
      # Obtain the image name and bucket name from the request body
      body = json.loads(event['body'])
      bucket = body.get('bucket')
      imageName = body.get('imageName')

      # Get labels from image
      detectLabelsResponse = detect_labels(imageName, bucket)

      # Get the datetime when the image was created
      createdImageResponse = created_image_datetime(imageName, bucket)
      
      # Prepare response body
      labels = [{'Confidence': label['Confidence'],'Name': label['Name']} for label in detectLabelsResponse['Labels']]

      responseBody = create_body(bucket, imageName, createdImageResponse, labels, 'labels')

      # Log of results in CloudWatch
      print(responseBody)

      # Return the answer
      return createResponseData(200, responseBody)
    except Exception as e:
        return createResponseData(500, {"error": e})