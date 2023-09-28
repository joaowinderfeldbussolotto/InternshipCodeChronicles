from exceptions.base_exception import BaseException

class UserException(BaseException):
    def __init__(self,message="Something went wrong", status_code=500):
        super().__init__(message, status_code)

class MissingParamException(UserException):
    def __init__(self,param_name, message = "Missing required parameter",status_code = 400):
        super().__init__(f"{message}: {param_name}", status_code)