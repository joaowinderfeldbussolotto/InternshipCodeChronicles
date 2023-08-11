from fastapi import APIRouter
from schemas.Booking import Booking

router = APIRouter()

@router.post('/', status_code = 200)
def post_predict(booking: Booking):
    return booking
