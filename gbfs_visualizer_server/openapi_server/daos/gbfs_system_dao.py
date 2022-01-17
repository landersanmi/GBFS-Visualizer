from pymongo import MongoClient

def get_client():
    mongoClient = MongoClient('127.0.0.1', 27017)
    return mongoClient

def get_collection(mongoClient):
    db = mongoClient.GBFS
    collection = db.GBFS_System
    return collection

def insert(GBFS_System_JSON):
    client = get_client()
    collec = get_collection(client)
    collec.insert(GBFS_System_JSON)
    client.close()
    return "OK"

def find_one(gbfs_system_id):
    client = get_client()
    collec = get_collection(client)
    result = collec.find_one({"gbfs_system_id": gbfs_system_id})
    client.close()
    return result
