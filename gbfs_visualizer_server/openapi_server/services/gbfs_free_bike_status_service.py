import requests
from openapi_server.services import gbfs_system_service

def get_free_bike_status(gbfs_system_id):
    
    gbfsSystem = gbfs_system_service.get_gbfs(gbfs_system_id)
    req_get_gbfs_urls = requests.get(gbfsSystem['url']).json()
    
    try:
        for json in req_get_gbfs_urls['data']['en']['feeds']:
            if json['name'] == 'free_bike_status':
                free_bike_status_url = json['url']
                req_get_free_bike_status_inf = requests.get(free_bike_status_url).json()
    except:
        try:
            for json in req_get_gbfs_urls['data']['feeds']:
                if json['name'] == 'free_bike_status':
                    free_bike_status_url = json['url']
                    req_get_free_bike_status_inf = requests.get(free_bike_status_url).json()
        except:
            try:
                for json in req_get_gbfs_urls['data']['nl']['feeds']:
                    if json['name'] == 'free_bike_status':
                        free_bike_status_url = json['url']
                        req_get_free_bike_status_inf = requests.get(free_bike_status_url).json()
            except:
                try:
                    for json in req_get_gbfs_urls['data']['fr']['feeds']:
                        if json['name'] == 'free_bike_status':
                            free_bike_status_url = json['url']
                            req_get_free_bike_status_inf = requests.get(free_bike_status_url).json()
                except:
                    try:
                        for json in req_get_gbfs_urls['data']['it']['feeds']:
                            if json['name'] == 'free_bike_status':
                                free_bike_status_url = json['url']
                                req_get_free_bike_status_inf = requests.get(free_bike_status_url).json()
                    except:
                        try:
                            for json in req_get_gbfs_urls['data']['de']['feeds']:
                                if json['name'] == 'free_bike_status':
                                    free_bike_status_url = json['url']
                                    req_get_free_bike_status_inf = requests.get(free_bike_status_url).json()
                        except:
                            try:
                                for json in req_get_gbfs_urls['data']['nb']['feeds']:
                                    if json['name'] == 'free_bike_status':
                                        free_bike_status_url = json['url']
                                        req_get_free_bike_status_inf = requests.get(free_bike_status_url).json() 
                            except:
                                for json in req_get_gbfs_urls:
                                    free_bike_status_url = json['url']
                                    req_get_free_bike_status_inf = requests.get(free_bike_status_url).json()
    resultJson = {}
    resultJson['gbfs_system_id'] = gbfs_system_id
    resultJson['bikes'] = req_get_free_bike_status_inf['data']['bikes']
    return resultJson