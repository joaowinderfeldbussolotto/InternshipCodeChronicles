import boto3
from core.config import settings

dynamodb = boto3.resource('dynamodb')
database_table = dynamodb.Table(settings.DYNAMODB_TABLE_NAME)


def saveToDatabase(item, table=database_table):
    """
    Save an item to a DynamoDB table.

    @param item (dict): The item to be saved in the table.
    @param table: The DynamoDB table where the item will be saved (default is database_table).

    @returns None
    """
    table.put_item(
        Item=item
    )


def checkInDatabase(id, table=database_table):
    """
    Checks if an item exists in the database. This is useful for testing the existence of a user's data in the database
        
    @param id - The unique id of the item to check
    @param table - The table to use for the check. Defaults to : data : ` database_table `
        
    @return True if the item exists False if it doesn't
    """
    response = table.get_item(Key={'unique_id': id})
    if 'Item' in response:
        return response['Item']
    return False
