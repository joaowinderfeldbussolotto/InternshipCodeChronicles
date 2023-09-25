from utils import createResponseData

def v2_description(event, context):
    body = {
        "message": "VISION api version 2."
    }
    return createResponseData(200, body)