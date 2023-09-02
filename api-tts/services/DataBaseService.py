import boto3
from core.config import settings

dynamodb = boto3.resource('dynamodb')
database_table = dynamodb.Table(settings.DYNAMODB_TABLE_NAME)


def saveToDatabase(item, table = database_table):
   table.put_item(
        Item = item
    )
    
