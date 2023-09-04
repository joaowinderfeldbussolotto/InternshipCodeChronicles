from datetime import datetime
import hashlib
import json
import pytz


def getFormattedDateTime():
    """
     Returns date and time in human readable format.
     @return A string of the form YYYY - MM - DD HH : MM :
    """
    brazil_timezone = pytz.timezone('America/Sao_Paulo')
    return datetime.now(brazil_timezone).strftime("%Y-%m-%d %H:%M:%S")


def create_hash(text):
    """
     Creates a sha256 hash of the text.
     
     @param text - The text to hash. Must be utf - 8 encoded.
     @return The sha256 hash of the text as a hex string.
    """
    text_hash = hashlib.sha256()
    text_hash.update(text.encode('utf-8'))
    return text_hash.hexdigest()

def createBody(received_phrase, url_to_audio, unique_id=None, created_audio=None):
    """
    Create a response body dictionary with received phrase, audio URL, and optional unique ID.
     
    @param received_phrase (str): The received phrase.
    @param url_to_audio (str): The URL to the audio.
    @param unique_id (str, optional): The unique ID (default is None).
    @param created_audio (str, optional): The created_audio (default is None).

    @return dict: A dictionary representing the response body.
    """
    body = {
        "received_phrase": received_phrase,
        "url_to_audio": url_to_audio,
        "created_audio": getFormattedDateTime()
    }

    if created_audio:
        body["created_audio"] = created_audio
    if unique_id:
        body["unique_id"] = unique_id

    return body

def createResponseData(statusCode, body):
    """
     Create response data to send to API.
     
     @param statusCode - status code of the response
     @param body - JSON - encoded body of the response. It is assumed that the content type is application / json
     
     @return dict with response data in JSON format.
    """
    return {
        'statusCode': statusCode,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        'body': json.dumps(body)
    }
