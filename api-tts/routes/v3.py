from controllers.tts_handler import handleTTS

def post_v3_tts(event, context):
    return handleTTS(event, return_id = True, save_db = True, check_db = True)