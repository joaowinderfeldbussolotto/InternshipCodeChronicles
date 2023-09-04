import json
from services.DataBaseService import saveToDatabase, checkInDatabase
from services.BucketService import upload_to_bucket
from services.TextToSpeechService import generate_audio
from utils import create_hash, createBody, createResponseData


def handleTTS(event, return_id, save_db, check_db=None):
    """
    Handle Text-to-Speech (TTS) request.
    This is the entry point for the client to create a new item in S3
     
    @param event - The event that triggered the call
    @param return_id - If this is true the id of the newly created item will be returned
    @param save_db - If this is true the database will be saved to
    @param check_db - If this is true the database will be checked for the item
     
    @return A dictionary containing the response
    """
    try:
        request_data = json.loads(event['body'])
        phrase = request_data['phrase']
        hash_id = create_hash(phrase)
        item_exists = False
        if check_db:
             item_exists = checkInDatabase(hash_id)
        if item_exists:
            audio_url,created_audio, unique_id, phrase = item_exists.values()
            body = createBody(phrase, audio_url, unique_id,created_audio)
            return createResponseData(200, body)
        else:
          audio = generate_audio(phrase)
          audio_url = upload_to_bucket(audio)
          body = createBody(phrase,audio_url, hash_id)
 
        if save_db:
            saveToDatabase(body)
        if not return_id:
            body = createBody(phrase, audio_url)

        return createResponseData(200, body)

    except Exception as e:
        return createResponseData(500, {"error": e})
