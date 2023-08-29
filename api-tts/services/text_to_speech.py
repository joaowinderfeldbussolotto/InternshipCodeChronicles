import boto3
from core.config import settings

polly = boto3.client('polly', region_name = settings.AWS_REGION_NAME)

def generate_audio(text: str):
    audio = polly.synthesize_speech(
        Text = text,
        OutputFormat = 'mp3',
        VoiceId = 'Vitoria',
        LanguageCode ='pt-BR',
        Engine = 'neural',
    )
    
    return audio['AudioStream'].read()