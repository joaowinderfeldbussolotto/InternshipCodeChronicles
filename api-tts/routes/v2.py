import json
from services.DataBaseService import save
from services.BucketService import upload_to_bucket
from services.TextToSpeechService import generate_audio
from utils import create_hash, getFormattedDateTime

def v2_description(event, context):
    body = {
        "message": "TTS api version 2."
    }

    response = {"statusCode": 200, "body": json.dumps(body)}

    return response

def post_v2_tts(event, context):
    try:
        request_data = json.loads(event['body'])
        phrase = request_data['phrase']
        audio = generate_audio(phrase)
        audio_url = upload_to_bucket(audio)
        hash_id = create_hash(phrase)
        item = {
            'id': hash_id,
            's3_url': audio_url,
            'phrase': phrase
        }
        save(item)
        
        body = {
            "received_phrase": phrase,
            "url_to_audio": audio_url,
            "created_audio": getFormattedDateTime(),
            "unique_id": hash_id
        }
        
        return {
            'statusCode': 200,
            'body': json.dumps(body)
        }
    
    except Exception as e:
        return {
            "statusCode": 500,
            "message": str(e)
        }