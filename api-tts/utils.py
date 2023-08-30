from datetime import datetime 

def getFormattedDateTime():
    return datetime.now().strftime("%Y-%m-%d_%H-%M-%S")