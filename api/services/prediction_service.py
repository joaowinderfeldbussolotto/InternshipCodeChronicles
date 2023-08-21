import os
import boto3
import sagemaker
import numpy as np
from dotenv import load_dotenv
from sagemaker.serializers import CSVSerializer

from schemas.Booking import Booking
from schemas.Prediction import Prediction
from . import booking_formatter
load_dotenv()

class PredictionService:
    @staticmethod
    def predict(data: Booking):
        boto_session = boto3.Session(
            aws_access_key_id     = os.environ.get("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY"),
            region_name           = os.environ.get("AWS_REGION_NAME")
        )
        session  = sagemaker.Session(boto_session=boto_session)
        endpoint = os.environ.get("ML_MODEL_ENDPOINT")
        predictor = sagemaker.predictor.Predictor(
            endpoint_name     = endpoint, 
            sagemaker_session = session
        )
        predictor.serializer = CSVSerializer()

        dummied_booking_values = booking_formatter.dummy_transform(data)

        X_entries = np.array(dummied_booking_values)
        X_entries.shape
        prediction = predictor.predict(X_entries).decode('utf-8')

        return Prediction(result = prediction)