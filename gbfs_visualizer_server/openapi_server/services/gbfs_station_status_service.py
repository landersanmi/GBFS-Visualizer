import requests
from openapi_server.services import gbfs_system_service

def get_station_status(gbfs_system_id):
    
    gbfsSystem = gbfs_system_service.get_gbfs(gbfs_system_id)
    requestURLS = requests.get(gbfsSystem['url']).json()
    
    try:
        for json in requestURLS['data']['en']['feeds']:
            if json['name'] == 'station_status':
                requestStatus = requests.get(json['url']).json()
    except:
        try:
            for json in requestURLS['data']['feeds']:
                if json['name'] == 'free_bike_status':
                    requestStatus = requests.get(json['url']).json()

        except:
            try:
                for json in requestURLS['data']['nl']['feeds']:
                    if json['name'] == 'free_bike_status':
                        requestStatus = requests.get(json['url']).json()

            except:
                try:
                    for json in requestURLS['data']['fr']['feeds']:
                        if json['name'] == 'free_bike_status':
                            requestStatus = requests.get(json['url']).json()
                            
                except:
                    try:
                        for json in requestURLS['data']['it']['feeds']:
                            if json['name'] == 'free_bike_status':
                                requestStatus = requests.get(json['url']).json()

                    except:
                        try:
                            for json in requestURLS['data']['de']['feeds']:
                                if json['name'] == 'free_bike_status':
                                    requestStatus = requests.get(json['url']).json()

                        except:
                            try:
                                for json in requestURLS['data']['nb']['feeds']:
                                    if json['name'] == 'free_bike_status':
                                        requestStatus = requests.get(json['url']).json()

                            except:
                                for json in requestURLS:
                                    requestStatus = requests.get(json['url']).json()

    
    resultJson = {}
    resultJson['gbfs_system_id'] = gbfs_system_id
    resultJson['stations'] = requestStatus['data']['stations']
    return resultJson