from utils import createResponseData


def v1_description(event, context):
    body = {
        "message": "VISION api version 1."
    }
    return createResponseData(200, body)
