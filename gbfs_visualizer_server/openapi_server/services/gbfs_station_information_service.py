from openapi_server.daos.gbfs_station_information_dao import insert, find_one

def get_station_information(gbfs_system_id):
    return find_one(gbfs_system_id)

def post_station_information(gbfs_station_information_JSON):
    return insert(gbfs_station_information_JSON)