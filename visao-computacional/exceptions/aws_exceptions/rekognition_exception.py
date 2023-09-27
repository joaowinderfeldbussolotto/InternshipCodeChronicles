from exceptions.base_exception import BaseException

class RekognitionException(BaseException):
    def __init__(self,message="An error ocurred in Amazon Rekognition", status_code=500):
        super().__init__(message, status_code)

class RekognitionInvalidS3ObjectException(RekognitionException):
    def __init__(self, message="Invalid S3 Object or S3 Image"):
        super().__init__(message,status_code=404)

class RekognitionRateLimitExceededException(RekognitionException):
    def __init__(self, message="Rate limit exceeded while processing the request"):
        super().__init__(message, status_code=429)

