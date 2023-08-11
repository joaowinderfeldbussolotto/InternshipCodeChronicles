from fastapi import APIRouter, status, HTTPException
from schemas.Booking import Booking
from schemas.Prediction import Prediction
import random

router = APIRouter()

@router.post('/', response_model = Prediction, status_code = status.HTTP_200_OK)
def post_predict(booking: Booking):
    try:
        result = round(random.random()) # This is where we use the model
        return Prediction(result = result)
    except Exception as e:
        raise HTTPException(detail = "Internal Server Error", status_code = status.HTTP_500_INTERNAL_SERVER_ERROR)
    

