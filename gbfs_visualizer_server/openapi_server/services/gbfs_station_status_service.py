import requests
from openapi_server.services import gbfs_system_service

def get_station_status(gbfs_system_id):
    
    gbfsSystem = gbfs_system_service.get_gbfs(gbfs_system_id)
    requestURLS = requests.get(gbfsSystem['url']).json()
    
    for json in requestURLS['data']['en']['feeds']:
        if json['name'] == 'station_status':
            requestStatus = requests.get(json['url']).json()
    
    resultJson = {}
    resultJson['gbfs_system_id'] = gbfs_system_id
    resultJson['stations'] = requestStatus['data']['stations']
    return resultJson