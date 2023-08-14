import random
from schemas.Booking import Booking
from schemas.Prediction import Prediction
class PredictionService:
    @staticmethod
    def predict(data: Booking):
        result = round(random.random())
        return Prediction(result = result)

