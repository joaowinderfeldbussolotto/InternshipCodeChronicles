import boto3
from core.config import settings

polly = boto3.client('polly', region_name = settings.AWS_REGION_NAME)

def generate_audio(text: str):
    """
    Generate audio from text using Amazon Polly.

    @param text (str) - The text to be converted into audio.

    @return bytes - The audio data in bytes.
    """
    audio = polly.synthesize_speech(
        Text = text,
        OutputFormat = 'mp3',
        VoiceId = 'Vitoria',
        LanguageCode ='pt-BR',
        Engine = 'neural',
    )
    
    return audio['AudioStream'].read()