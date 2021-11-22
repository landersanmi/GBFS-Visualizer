import connexion
import six

from openapi_server import util

from openapi_server.services import gbfs_visualizing_service
import flask


def get_map(gbfs_system_id):  # noqa: E501
    """Get GBFS Map of the stations or free bike status

    Retrieve all the Free bike status information of a specific GBFS in a Map # noqa: E501

    :param gbfs_system_id: ID of the GBFS system
    :type gbfs_system_id: str

    :rtype: str
    """

    #map = gbfs_visualizing_service.get_map(gbfs_system_id)
    return flask.render_template('login.html', error =None)
