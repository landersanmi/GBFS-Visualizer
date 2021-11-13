import connexion
import six

from openapi_server import util

from services import gbfs_visualizing_service


def get_map(gbfs_system_id):  # noqa: E501
    """Get GBFS Map of the stations or free bike status

    Retrieve all the Free bike status information of a specific GBFS in a Map # noqa: E501

    :param gbfs_system_id: ID of the GBFS system
    :type gbfs_system_id: str

    :rtype: str
    """
    return gbfs_visualizing_service.get_map(gbfs_system_id)
