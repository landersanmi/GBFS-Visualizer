$(document).ready(function(){

    let map;
    let markers = [];
    let infoWindows = [];

    //////////////////////////////////////////////////////////////////
    //                            MAP                               //
    //////////////////////////////////////////////////////////////////
    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 43.262985, lng: -2.935013},
            zoom:11,
        });

        // Add a style-selector control to the map.
        const selector = document.getElementById("selector_gbfs");
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(selector);
        var gbfs_system_id = selector.options[selector.selectedIndex].id;
        loadMapBikes(gbfs_system_id);

        $('#selector_gbfs').on('change', function(){
            loadMapBikes(this.options[this.selectedIndex].id);
        });
    }

    //////////////////////////////////////////////////////////////////
    //                            AJAX                              //
    //////////////////////////////////////////////////////////////////
    function loadMapBikes(gbfs_system_id){
       $.when(loadStationStatusAjax(gbfs_system_id)).then(loadStationInfAndFreeBikesAjax(gbfs_system_id));
    }
    
    function loadStationStatusAjax(gbfs_system_id){
        return $.ajax({
            type: "get",
            url: 'api/v1/gbfs/' + gbfs_system_id + '/station_status',
            success: function(result){
                result = JSON.parse(JSON.stringify(result));
                var stations_status = [];
                stations_status = result['stations'];
                if(stations_status.length !== 0){
                    deleteInfoWindows();
                    stations_status.forEach(station_status_json => {
                        addInfoWindowStation(gbfs_system_id, station_status_json['num_bikes_available'], station_status_json['num_docks_available']);
                    });
                }else{
                    loadFreeBikeInfoWindowsAjax(gbfs_system_id)
                }
            },
            error: function(result){
                 loadFreeBikeInfoWindowsAjax(gbfs_system_id)        
            }
        });
    }

    function loadStationInfAndFreeBikesAjax(gbfs_system_id){
        return $.ajax({
            type: "get",
            url: 'api/v1/gbfs/' + gbfs_system_id + '/station_information',
            success: function(result){
                result = JSON.parse(JSON.stringify(result));
                var stations = [];
                stations = result['stations'];
                var center = new google.maps.LatLng(stations[Math.floor(stations.length/2)]['lat'], stations[Math.floor(stations.length/2)]['lon']);
                map.panTo(center);
                if (stations.length !== 0){
                    deleteMarkers();
                    var index = 0;
                    stations.forEach(station_json => {
                        position = new google.maps.LatLng(station_json['lat'], station_json['lon']);
                        addMarker(position, "https://iframe.nextbike.net/4com/icons/bilbaobizi_icon_22x33.png", index);
                        index++;
                    });
                    showMarkers();
                }else{
                    loadFreeBikeMarkersAjax(gbfs_system_id)
                }
            },
            error: function(result) {
                loadFreeBikeMarkersAjax(gbfs_system_id)
            }
        });
    }

    function loadFreeBikeInfoWindowsAjax(gbfs_system_id){
        return $.ajax({
            type: "get",
            url: 'api/v1/gbfs/' + gbfs_system_id + '/free_bike_status',
            success: function(result){
                result = JSON.parse(JSON.stringify(result));
                var bikes = [];
                bikes = result['bikes'];
                if(bikes.length !== 0){
                    deleteInfoWindows();
                    bikes.forEach(bikes_json => {
                        addInfoWindowFreeBike(bikes_json['bike_id'], bikes_json['is_disabled'], bikes_json['is_reserved']);
                    });
                }  
            },
            error: function(result) {
                alert('Error on loadMapBikes AJAX.get FREE_BIKE_STATUS 1');
            }
        });
    }

    function loadFreeBikeMarkersAjax(gbfs_system_id){
        return $.ajax({
            type: "get",
            url: 'api/v1/gbfs/' + gbfs_system_id + '/free_bike_status',
            success: function(result){
                result = JSON.parse(JSON.stringify(result));
                var bikes = [];
                bikes = result['bikes'];
                var center = new google.maps.LatLng(bikes[Math.floor(bikes.length/2)]['lat'], bikes[Math.floor(bikes.length/2)]['lon']);
                map.setCenter(center);
                if(bikes.length !== 0){
                    deleteMarkers();
                    var index = 0;
                    bikes.forEach(bikes_json => {
                        position = new google.maps.LatLng(station_json['lat'], station_json['lon']);
                        addMarker(position, "https://iframe.nextbike.net/4com/icons/bilbaobizi_icon_22x33.png", index);
                        index++;
                    });
                    showMarkers();
                }     
            },
            error: function(result) {
                alert('Error on loadMapBikes AJAX.get FREE_BIKE_STATUS');
            }
        });
    }

    //////////////////////////////////////////////////////////////////
    //                        INFO WINDOWS                          //
    //////////////////////////////////////////////////////////////////
    function addInfoWindowStation(nombre, bikes_free, docks_free){
        const infoWindowStation = new google.maps.InfoWindow({
            content:  "<strong>"+ nombre +"</strong>" +
                      "<p> Bicicletas Libres -> " + bikes_free + "</p>" + 
                      "<p> Anclajes Libres -> " + docks_free + "</p>"
        });
        infoWindows.push(infoWindowStation);
    }

    function addInfoWindowFreeBike(bike_id, is_disabled, is_Reserved){
        const infoWindowFreeBike = new google.maps.InfoWindow({
            content:  "<strong>"+ bike_id +"</strong>" +
                      "<p> Esta deshabilitada -> " + is_disabled + "</p>" + 
                      "<p> Esta Reservada -> " + is_Reserved + "</p>" 
        });
        infoWindows.push(infoWindowFreeBike);
    }

    function deleteInfoWindows(){
        infoWindows = [];
    }

    //////////////////////////////////////////////////////////////////
    //                          MARKERS                             //
    //////////////////////////////////////////////////////////////////
    // Adds a marker to the map and push to the array.
    function addMarker(position, icon_url, index) {
        const marker = new google.maps.Marker({
            position: position,
            icon: icon_url,
            animation: google.maps.Animation.DROP,
            map,
        });
        markers.push(marker);

        // HOVER
        google.maps.event.addListener(marker, 'mouseover', (function(marker, index) {
            return function() {
                infoWindows[index].open(map, marker);
            }
        })(marker, index));

        // HOVER OFF
        google.maps.event.addListener(marker, 'mouseout', (function(marker, index) {
            return function() {
                infoWindows[index].close();
            }
        })(marker, index));
    }
    // Set all the markers to the map
    function setMapOnAll(map) {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }
    // Removes the markers from the map, but keeps them in the array.
    function hideMarkers() {
        setMapOnAll(null);
    }
    // Shows any markers currently in the array.
    function showMarkers() {
        setMapOnAll(map);
    }
    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        hideMarkers();
        markers = [];
    }
});
