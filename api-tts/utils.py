from datetime import datetime
import hashlib

def getFormattedDateTime():
    return datetime.now().strftime("%Y-%m-%d_%H-%M-%S")

def create_hash(text):
    text_hash = hashlib.sha256()
    text_hash.update(text.encode('utf-8'))
    return text_hash.hexdigest()