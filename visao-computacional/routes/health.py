from utils import createResponseData


def health(event, context):
    body = {
        "message": "Go Serverless v3.0! Your function executed successfully!",
        "input": event,
    }
    response = createResponseData(200, body)
    return response
