from utils import createResponseData


def health(event, context):
    body = {
        "message": "Go Serverless v3.0! Your function executed successfully!",
        "input": event
    }

    return createResponseData(200, body)

