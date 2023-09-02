import json
from controllers.tts_handler import handleTTS
from utils import createResponseData

def v2_description(event, context):
    body = {
        "message": "TTS api version 2."
    }

    return createResponseData(200, body)

def post_v2_tts(event,context):
    return handleTTS(event, return_id = True, save_db = True, check_db=False)