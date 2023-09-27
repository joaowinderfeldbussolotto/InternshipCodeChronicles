from utils import create_response_data


def v2_description(event, context):
    body = {
        "message": "VISION api version 2."
    }
    return create_response_data(200, body)
