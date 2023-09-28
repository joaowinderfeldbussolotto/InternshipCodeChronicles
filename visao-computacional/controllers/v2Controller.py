from utils import create_response_data, create_body, get_data_from_body
from services.rekognition_service import detect_faces
from services.s3_service import created_image_datetime
from exceptions.base_exception import BaseException
from middleware.exception_handler import exception_handler_middleware
import json


@exception_handler_middleware
def handle_v2_vision(event):
    """
    Handle the request for the v2/vision endpoint. 

    @param event (dict): The request body.
    
    @return dict: The response body.
    """

    # Obtain the image name and bucket name from the request body
    bucket, imageName = get_data_from_body(json.loads(event['body']))


    # Get the datetime when the image was created
    createdImageResponse = created_image_datetime(imageName, bucket)
    # Get labels from image
    detectFacesResponse = detect_faces(imageName, bucket)
        
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

    # detectFacesResponse log for CloudWatch
    print(detectFacesResponse)

    # Return the answer
    return create_response_data(200, responseBody)
 