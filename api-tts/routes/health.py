import json

from services.homeService import home


def health(event, context):
    body = {
        "message": "Go Serverless v3.0! Your function executed successfully!",
        "input": event,
        "id" : home()
    }

    response = {"statusCode": 200, "body": json.dumps(body)}

    return response

