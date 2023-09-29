from exceptions.base_exception import BaseException

class S3Exception(BaseException):
    def __init__(self,message="An error ocurred in Amazon S3", status_code=500):
        super().__init__(message, status_code)

    @staticmethod
    def handle_s3_exception(error_code):

        s3_exceptions = {
            "NoSuchBucket": S3BucketNotFoundException(),
            "NoSuchKey": S3KeyNotFoundException(),
            "AccessDenied": S3BucketAccessDeniedException()
        }

        return s3_exceptions.get(error_code, S3Exception())

class S3BucketNotFoundException(BaseException):
    def __init__(self,message="The requested resource could not be found. Please double-check the bucket name and try again.",
                 status_code=404):
        super().__init__(message, status_code)

class S3BucketAccessDeniedException(BaseException):
    def __init__(self, message="You don't have permission to access this bucket", status_code=403):
        super().__init__(message, status_code)

class S3KeyNotFoundException(BaseException):
    def __init__(self, message="The requested file could not be found in the bucket. Please double-check the imageName and try again", status_code=404):
        super().__init__(message, status_code)
