from utils import createResponseData, create_body
from services.RekognitionService import detect_faces
from services.S3Service import created_image_datetime
import json



def handle_v2_vision(event):
    """
    Handle the request for the v2/vision endpoint. 

    @param event (dict): The request body.
    
    @return dict: The response body.
    """

    try:
      # Obtain the image name and bucket name from the request body
      body = json.loads(event['body'])
      bucket = body.get('bucket')
      imageName = body.get('imageName')

      # Get labels from image
      detectFacesResponse = detect_faces(imageName, bucket)

      # Get the datetime when the image was created
      createdImageResponse = created_image_datetime(imageName, bucket)
         
      # Prepare response body
      faces = [
        {'position': 
          {'Height': element['BoundingBox']['Height'],
            'Left': element['BoundingBox']['Left'],
            'Top': element['BoundingBox']['Top'],
            'Width': element['BoundingBox']['Width'],
          },
          'classified_emotion': element['Emotions'][0]['Type'],
          'classified_emotion_confidence': element['Emotions'][0]['Confidence'],
          } for element in detectFacesResponse['FaceDetails']]

      responseBody = create_body(bucket, imageName, createdImageResponse, faces, 'faces')

      # Log of results in CloudWatch
      print(responseBody)

      # Return the answer
      return createResponseData(200, responseBody)
    except Exception as e:
        return createResponseData(500, {"error": e})