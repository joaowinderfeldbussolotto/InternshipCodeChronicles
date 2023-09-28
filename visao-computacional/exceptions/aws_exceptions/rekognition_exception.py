from exceptions.base_exception import BaseException

class RekognitionException(BaseException):
    def __init__(self,message="An error ocurred in Amazon Rekognition", status_code=500):
        super().__init__(message, status_code)

    @staticmethod
    def handle_rekognition_exception(error_code):
        """
        Handle Amazon Rekognition exceptions based on the error code.

        @param error_code (str): Error code returned by Amazon Rekognition.

        @return RekognitionException: Custom Rekognition exception based on the error code.
        """
        rekognition_exceptions = {
            "InvalidS3ObjectException": RekognitionInvalidS3ObjectException(),
            "ProvisionedThroughputExceededException": RekognitionRateLimitExceededException()
        }

        return rekognition_exceptions.get(error_code, RekognitionException())

class RekognitionInvalidS3ObjectException(RekognitionException):
    def __init__(self, message="Invalid S3 Object or S3 Image"):
        super().__init__(message,status_code=404)

class RekognitionRateLimitExceededException(RekognitionException):
    def __init__(self, message="Rate limit exceeded while processing the request"):
        super().__init__(message, status_code=429)

