import json
from services.DataBaseService import saveToDatabase, checkInDatabase
from services.BucketService import upload_to_bucket
from services.TextToSpeechService import generate_audio
from utils import create_hash, createBody, createItem, createResponseData


def handleTTS(event, return_id, save_db, check_db=None):
    try:
        request_data = json.loads(event['body'])
        phrase = request_data['phrase']
        hash_id = create_hash(phrase)
        item_exists = False
        if check_db:
             item_exists = checkInDatabase(hash_id)
        if item_exists:
            body = item_exists
        else:
          audio = generate_audio(phrase)
          audio_url = upload_to_bucket(audio)
          item = createItem(hash_id, audio_url, phrase)
 
        if save_db:
            saveToDatabase(item)
        if return_id == True:
            body = createBody(phrase, audio_url, hash_id)
        else:
            body = createBody(phrase, audio_url)

        return createResponseData(200, body)

    except Exception:
        return createResponseData(500, {"error": "Internal Server error."})
