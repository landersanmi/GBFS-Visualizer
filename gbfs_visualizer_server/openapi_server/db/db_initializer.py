import pandas as pd
import requests
import datetime

def initialize_db_data():
    df = pd.read_csv('gbfs_systems.csv')

    for index, gbfs in df.iterrows():
        gbfs_system_json = {
            "gbfs_system_id" : gbfs['System ID'],
            "name" : gbfs['Name'],
            "url" : gbfs['Auto-Discovery URL']
        }
        print(index, '-->', gbfs_system_json)
        req_post_gbfs = requests.post('http://127.0.0.1:8080/api/v1/gbfs/' + gbfs['System ID'], json=gbfs_system_json)

        if req_post_gbfs.status_code == 200:
            req_get_gbfs_system = requests.get('http://127.0.0.1:8080/api/v1/gbfs/'+ gbfs['System ID']).json()
            req_get_gbfs_urls = requests.get(req_get_gbfs_system['url']).json()
            
            try:
                for json in req_get_gbfs_urls['data']['en']['feeds']:
                    if json['name'] == 'system_information':
                        system_information_url = json['url']
                        req_get_system_inf = requests.get(system_information_url).json()
            except:
                try:
                    for json in req_get_gbfs_urls['data']['feeds']:
                        if json['name'] == 'system_information':
                            system_information_url = json['url']
                            req_get_system_inf = requests.get(system_information_url).json()
                except:
                    try:
                        for json in req_get_gbfs_urls['data']['nl']['feeds']:
                            if json['name'] == 'system_information':
                                system_information_url = json['url']
                                req_get_system_inf = requests.get(system_information_url).json()
                    except:
                        try:
                            for json in req_get_gbfs_urls['data']['fr']['feeds']:
                                if json['name'] == 'system_information':
                                    system_information_url = json['url']
                                    req_get_system_inf = requests.get(system_information_url).json()
                        except:
                            try:
                                for json in req_get_gbfs_urls['data']['it']['feeds']:
                                    if json['name'] == 'system_information':
                                        system_information_url = json['url']
                                        req_get_system_inf = requests.get(system_information_url).json()
                            except:
                                try:
                                    for json in req_get_gbfs_urls['data']['de']['feeds']:
                                        if json['name'] == 'system_information':
                                            system_information_url = json['url']
                                            req_get_system_inf = requests.get(system_information_url).json()
                                except:
                                    try:
                                        for json in req_get_gbfs_urls['data']['nb']['feeds']:
                                            if json['name'] == 'system_information':
                                                system_information_url = json['url']
                                                req_get_system_inf = requests.get(system_information_url).json() 
                                    except:
                                        for json in req_get_gbfs_urls:
                                            station_information_url = json['url']
                                            req_get_station_inf = requests.get(station_information_url).json()                               
            
            operator = company_url = phone_number = email = license_url = timezone = ""
            try:
                operator = req_get_system_inf['data']['operator']
            except:
                print("Operator does not exist on", gbfs['System ID'])
            try:
                company_url = req_get_system_inf['data']['url']
            except:
                company_url = gbfs['URL']
                print("Company url does not exist on", gbfs['System ID'], "but it was inserted from CSV")
            try:
                phone_number = req_get_system_inf['data']['phone_number'],
            except:
                print("Phone number does not exist on", gbfs['System ID'])
            try:
                email = req_get_system_inf['data']['email']
            except:
                print("Email does not exist on", gbfs['System ID'])
            try:
                license_url = req_get_system_inf['data']['license_url']
            except:
                print("License URL does not exist on", gbfs['System ID'])
            try:
                license_url = req_get_system_inf['data']['timezone']
            except:
                print("Timezone does not exist on", gbfs['System ID'])


            system_information_json = {
                "gbfs_system_id" : gbfs['System ID'],
                "url": system_information_url,
                "name":  req_get_system_inf['data']['name'],
                "operator": str(operator),
                "company_url": str(company_url),
                "phone_number": str(phone_number),
                "email": str(email),
                "timezone": str(timezone),
                "license_url": str(license_url)
            }
            
            requests.post('http://127.0.0.1:8080/api/v1/gbfs/' + gbfs['System ID'] + '/system_information', json=system_information_json)

            req_get_station_inf = None
            try:
                for json in req_get_gbfs_urls['data']['en']['feeds']:
                    if json['name'] == 'station_information':
                        station_information_url = json['url']
                        req_get_station_inf = requests.get(station_information_url).json()
            except:
                try:
                    for json in req_get_gbfs_urls['data']['feeds']:
                        if json['name'] == 'station_information':
                            station_information_url = json['url']
                            req_get_station_inf = requests.get(station_information_url).json()
                except:
                    try:
                        for json in req_get_gbfs_urls['data']['nl']['feeds']:
                            if json['name'] == 'station_information':
                                station_information_url = json['url']
                                req_get_station_inf = requests.get(station_information_url).json()
                    except:
                        try:
                            for json in req_get_gbfs_urls:
                                station_information_url = json['url']
                                req_get_station_inf = requests.get(station_information_url).json()
                        except:
                            try:
                                for json in req_get_gbfs_urls['data']['fr']['feeds']:
                                    if json['name'] == 'station_information':
                                        station_information_url = json['url']
                                        req_get_station_inf = requests.get(station_information_url).json()                 
                            except:
                                try:
                                    for json in req_get_gbfs_urls['data']['it']['feeds']:
                                        if json['name'] == 'station_information':
                                            station_information_url = json['url']
                                            req_get_station_inf = requests.get(station_information_url).json()
                                except:
                                    try:
                                        for json in req_get_gbfs_urls['data']['de']['feeds']:
                                            if json['name'] == 'station_information':
                                                station_information_url = json['url']
                                                req_get_station_inf = requests.get(station_information_url).json()
                                    except: 
                                        continue

            if(req_get_station_inf != None):           
                stations = []
                for json in req_get_station_inf['data']['stations']:
                    shortname = region_id = capacity = ""
                    try:
                        shortname = json['short_name']
                    except:
                        shortname = json['name']
                    try:
                        region_id = json['region_id']
                    except:
                        None
                    try:
                        capacity = json['capacity']
                    except:
                        capacity = "0"
                    station = {
                        "station_id" : str(json['station_id']),
                        "name": json['name'],
                        "short_name": shortname,
                        "lat": str(json['lat']),
                        "lon": str(json['lon']),
                        "region_id": region_id,
                        "capacity": str(capacity)
                    }
                    stations.append(station)
                
                
                station_information_json = {
                    "gbfs_system_id": gbfs['System ID'],
                    "url": station_information_url,
                    "stations": stations
                }

                requests.post('http://127.0.0.1:8080/api/v1/gbfs/' + gbfs['System ID'] + '/station_information', json=station_information_json)
        else:
            print("NOTHING DONE WITH", gbfs['System ID'])

start = datetime.datetime.now()        
initialize_db_data()
end = datetime.datetime.now()
print("Tiempo transcurrido -->", end-start)
