from utils import create_response_data


def v1_description(event, context):
    body = {
        "message": "VISION api version 1."
    }
    return create_response_data(200, body)
