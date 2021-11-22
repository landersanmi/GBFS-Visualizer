from openapi_server.daos.gbfs_system_information_dao import insert, find_one
from openapi_server.models.gbfs_system_information import GbfsSystemInformation  # noqa: E501


def get_system_information(gbfs_system_id):
    return find_one(gbfs_system_id)

def post_system_information(gbfs_system_information_JSON):
    return insert(gbfs_system_information_JSON)