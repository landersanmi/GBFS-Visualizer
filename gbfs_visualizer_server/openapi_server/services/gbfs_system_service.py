from openapi_server.daos.gbfs_system_dao import insert, find_one
from openapi_server.models.gbfs_system import GbfsSystem  # noqa: E501

from openapi_server.daos import gbfs_system_dao


def get_gbfs(gbfs_system_id):
    return find_one(gbfs_system_id)

def post_gbfs(gbfs_system_JSON):
    return insert(gbfs_system_JSON)