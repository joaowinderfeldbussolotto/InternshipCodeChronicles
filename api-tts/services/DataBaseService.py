import boto3
from core.config import settings

dynamodb = boto3.resource('dynamodb')
database_table = dynamodb.Table(settings.DYNAMODB_TABLE_NAME)


def saveToDatabase(item, table=database_table):
    table.put_item(
        Item=item
    )


def checkInDatabase(id, table=database_table):
    response = table.get_item(Key={'unique_id': id})
    if 'Item' in response:
        return response['Item']
    return False
