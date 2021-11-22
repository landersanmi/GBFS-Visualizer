import connexion
import six

from openapi_server.models.gbfs_free_bike_status import GbfsFreeBikeStatus  # noqa: E501
from openapi_server.models.gbfs_station_information import GbfsStationInformation  # noqa: E501
from openapi_server.models.gbfs_station_status import GbfsStationStatus  # noqa: E501
from openapi_server.models.gbfs_system import GbfsSystem  # noqa: E501
from openapi_server.models.gbfs_system_information import GbfsSystemInformation  # noqa: E501
from openapi_server import util

from openapi_server.services import gbfs_free_bike_status_service, gbfs_station_information_service, gbfs_station_status_service, gbfs_system_information_service, gbfs_system_service

import json

def get_free_bike_status(gbfs_system_id):  # noqa: E501
    """Get GBFS Free bike status information

    Retrieve all the Free bike status information of a specific GBFS # noqa: E501

    :param gbfs_system_id: ID of the GBFS system
    :type gbfs_system_id: str

    :rtype: GbfsFreeBikeStatus
    """
    gbfsFreeBikeStatus = gbfs_free_bike_status_service.get_free_bike_status(gbfs_system_id)
    return gbfsFreeBikeStatus


def get_gbfs(gbfs_system_id):  # noqa: E501
    """Get GBFS URLs information

    Retrieve all the accesible URLs of a specific GBFS System # noqa: E501

    :param gbfs_system_id: ID of the GBFS system
    :type gbfs_system_id: str

    :rtype: GbfsSystem
    """
    gbfsSystem = gbfs_system_service.get_gbfs(gbfs_system_id)
    
    if '_id' in gbfsSystem:
        del gbfsSystem['_id']
    
    return gbfsSystem


def get_station_information(gbfs_system_id):  # noqa: E501
    """Get GBFS Station information

    Retrieve all the Station information of a specific GBFS # noqa: E501

    :param gbfs_system_id: ID of the GBFS system
    :type gbfs_system_id: str

    :rtype: GbfsStationInformation
    """
    gbfsStationInformation = gbfs_station_information_service.get_station_information(gbfs_system_id)
    
    if '_id' in gbfsStationInformation:
        del gbfsStationInformation['_id']
        
    return gbfsStationInformation


def get_station_status(gbfs_system_id):  # noqa: E501
    """Get GBFS Station status information

    Retrieve all the Station status information of a specific GBFS # noqa: E501

    :param gbfs_system_id: ID of the GBFS system
    :type gbfs_system_id: str

    :rtype: GbfsStationStatus
    """
    gbfsStationStatus = gbfs_station_status_service.get_station_status(gbfs_system_id)
    return gbfsStationStatus


def get_system_information(gbfs_system_id):  # noqa: E501
    """Get GBFS System information

    Retrieve all the System information of a specific GBFS # noqa: E501

    :param gbfs_system_id: ID of the GBFS system
    :type gbfs_system_id: str

    :rtype: GbfsSystemInformation
    """
    gbfsSystemInformation = gbfs_system_information_service.get_system_information(gbfs_system_id)
        
    if '_id' in gbfsSystemInformation:
        del gbfsSystemInformation['_id']

    return gbfsSystemInformation


def post_gbfs(gbfs_system_id):  # noqa: E501
    """Posts GBFS URLs information

    Posts new URLs for a specific GBFS System # noqa: E501

    :param gbfs_system_id: ID of the GBFS system
    :type gbfs_system_id: str
    :param gbfs_system: 
    :type gbfs_system: dict | bytes

    :rtype: str
    """
    if connexion.request.is_json:
        gbfs_system = connexion.request.get_json()  # noqa: E501
        result = gbfs_system_service.post_gbfs(gbfs_system)
        return result
    else:
        return "Request is no in JSON Format"


def post_station_information(gbfs_system_id):  # noqa: E501
    """Posts GBFS Station information

    Posts new Station information for a specific GBFS # noqa: E501

    :param gbfs_system_id: ID of the GBFS system
    :type gbfs_system_id: str
    :param gbfs_station_information: 
    :type gbfs_station_information: dict | bytes

    :rtype: str
    """
    if connexion.request.is_json:
        gbfs_station_information = connexion.request.get_json()  # noqa: E501
        result = gbfs_station_information_service.post_station_information(gbfs_station_information)
        return result
    else:
        return "Request is no in JSON Format"


def post_system_information(gbfs_system_id):  # noqa: E501
    """Posts GBFS System information

    Posts new System information for a specific GBFS # noqa: E501

    :param gbfs_system_id: ID of the GBFS system
    :type gbfs_system_id: str
    :param gbfs_system_information: 
    :type gbfs_system_information: dict | bytes

    :rtype: str
    """
    if connexion.request.is_json:
        gbfs_system_information = connexion.request.get_json()  # noqa: E501
        result = gbfs_system_information_service.post_system_information(gbfs_system_information)
        return result
    else:
        return "Request is no in JSON Format"
