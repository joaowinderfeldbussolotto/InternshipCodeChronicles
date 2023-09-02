from controllers.tts_handler import handleTTS
from utils import createResponseData
from services.DataBaseService import checkInDatabase
def v1_description(event, context):
    body = {
        "message": "TTS api version 1."
    }
    return createResponseData(200, body)

def post_v1_tts(event, context):
    return handleTTS(event, return_id=False,save_db=False,check_db=False)