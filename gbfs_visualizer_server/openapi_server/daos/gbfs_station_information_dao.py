from pymongo import MongoClient

def get_client():
    mongoClient = MongoClient('127.0.0.1', 27017)
    return mongoClient

def get_collection(mongoClient):
    db = mongoClient.GBFS
    collection = db.GBFS_Station_Information
    return collection

def insert(GBFS_Station_Information_JSON):
    client = get_client()
    collec = get_collection(client)
    collec.insert(GBFS_Station_Information_JSON)
    client.close()
    return "OK"

def find_one(gbfs_system_id):
    client = get_client()
    collec = get_collection(client)
    result = collec.find_one({"gbfs_system_id": gbfs_system_id})
    client.close()
    return result

def find(params_JSON):
    client = get_client()
    collec = get_collection(client)
    result = collec.find(params_JSON)
    client.close()
    return result

def update(params_JSON):
    client = get_client()
    collec = get_collection(client)
    collec.update(params_JSON)
    client.close()

def remove(params_JSON):
    client = get_client()
    collec = get_collection(client)
    client.close()