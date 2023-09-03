from datetime import datetime
import hashlib
import json



def getFormattedDateTime():
    return datetime.now().strftime("%Y-%m-%d_%H-%M-%S")


def create_hash(text):
    text_hash = hashlib.sha256()
    text_hash.update(text.encode('utf-8'))
    return text_hash.hexdigest()


def createItem(hash_id, audio_url, phrase):
    return {
        'id': hash_id,
        's3_url': audio_url,
        'phrase': phrase
    }


def createBody(received_phrase, url_to_audio, unique_id=None):
    body = {
        "received_phrase": received_phrase,
        "url_to_audio": url_to_audio,
        "created_audio": getFormattedDateTime()
    }

    if unique_id is not None:
        body["unique_id"] = unique_id

    return body


def createResponseData(statusCode, body):
    return {
        'statusCode': statusCode,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        'body': json.dumps(body)
    }
