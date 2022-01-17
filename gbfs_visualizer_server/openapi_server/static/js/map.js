let map;
let markers = [];
let infoWindows = [];
var filtered_stations = [];
var loadingDiv;

//////////////////////////////////////////////////////////////////
//                            MAP                               //
//////////////////////////////////////////////////////////////////

// Funcion callback ejecutada para cargar el mapa
function initMap() {
    $( document ).ready(function() {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 43.262985, lng: -2.935013},
            zoom:11,
            optimize:true,
            fullscreenControl: false,
        });

        // Añadir elementos superpuestos al mapa
        const filterContainer = document.getElementById("filter_container");
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(filterContainer);

        loadingDiv = document.getElementById("loading_div");
        loadingDiv.style.visibility = 'hidden';
        map.controls[google.maps.ControlPosition.CENTER].push(loadingDiv);

        // Carga inicial del mapa
        const minBikesRange = document.getElementById("min_bikes_range");
        const minStationsRange = document.getElementById("min_stations_range");

        var selectedGBFSName = $('#input_gbfs').val();
        var gbfs_system_id = $('#selector_gbfs option[value="' + selectedGBFSName + '"]').attr('id');
        if(gbfs_system_id===undefined){
            gbfs_system_id='nextbike_bo';
        }
        var minBikes = minBikesRange.value;
        var minStations = minStationsRange.value;
        
        loadingDiv.style.visibility = 'visible';
        loadingDiv.style.display = 'block';
        loadStationStatusAjax(gbfs_system_id, minBikes, minStations);            

        // funciones ON CHANGE para el filtrado
        $('#input_gbfs').on('change',  function(){
            loadingDiv.style.visibility = 'visible';
            loadingDiv.style.display = 'block';
            var selectedGBFSName = $('#input_gbfs').val();
            gbfs_system_id = $('#selector_gbfs option[value="' + selectedGBFSName + '"]').attr('id');
            loadStationStatusAjax(gbfs_system_id, minBikes, minStations);
            
        });

        $('#min_bikes_range').on('change', function(){
            loadingDiv.style.visibility = 'visible';
            loadingDiv.style.display = 'block';
            minBikes = minBikesRange.value;
            document.getElementById('label_min_bikes').innerHTML = _('MIN_BIKES') + minBikes;
            loadStationStatusAjax(gbfs_system_id, minBikes, minStations);
        });

        $('#min_stations_range').on('change', function(){
            loadingDiv.style.visibility = 'visible';
            loadingDiv.style.display = 'block';
            minStations = minStationsRange.value;
            document.getElementById('label_min_stations').innerHTML = _('MIN_STATIONS') + minStations;
            loadStationStatusAjax(gbfs_system_id, minBikes, minStations);
        });

        zoomChangeListener = google.maps.event.addListener(map,'zoom_changed',function (event) {
            zoomChangeBoundsListener = google.maps.event.addListener(map,'bounds_changed',function (event) {  
                loadingDiv.style.visibility= 'hidden';
                loadingDiv.style.display = 'none';
            google.maps.event.removeListener(zoomChangeBoundsListener);
            });
        });

    });
}

//////////////////////////////////////////////////////////////////
//                            AJAX                              //
////////////////////////////////////////////////////////////////// 

// Cargar en el mapa las info-windows y los markers relacionados con las estaciones y bicicletas sueltas
function loadStationStatusAjax(gbfs_system_id, minBikes, minStations){
    return $.ajax({
        type: "get",
        url: 'api/v1/gbfs/' + gbfs_system_id + '/station_status',
        success: function(result){
            result = JSON.parse(JSON.stringify(result));
            stations_status = result['stations'];
            if(stations_status.length !== 0){
                infoWindows = [];
                filtered_stations = [];
                stations_status.forEach(station_status_json => {
                    if(station_status_json['num_bikes_available'] >= minBikes && station_status_json['num_docks_available'] >= minStations){
                        filtered_stations.push(station_status_json['station_id']);
                        addInfoWindowStation(gbfs_system_id, station_status_json['num_bikes_available'], station_status_json['num_docks_available']);
                    }
                });
            }
            loadStationInfAndFreeBikesAjax(gbfs_system_id);
        },
        error: function(result){
            loadFreeBikeMarkersAjax(gbfs_system_id);
            loadFreeBikeInfoWindowsAjax(gbfs_system_id);    
        }
    });
}

// Cargar en el mapa los markers de estaciones o bicicletas sueltas
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
                    if(filtered_stations.includes(station_json['station_id'])){
                        position = new google.maps.LatLng(station_json['lat'], station_json['lon']);
                        addMarker(position, "https://iframe.nextbike.net/4com/icons/bilbaobizi_icon_22x33.png", index);
                        index++;
                    }
                });
                showMarkers();
            }
            loadingDiv.style.visibility= 'hidden';
            loadingDiv.style.display='none';
        }
    });
}

// Cargar en el mapa las info windows de las bicicletas sueltas
function loadFreeBikeInfoWindowsAjax(gbfs_system_id){
    return $.ajax({
        type: "get",
        url: 'api/v1/gbfs/' + gbfs_system_id + '/free_bike_status',
        success: function(result){
            result = JSON.parse(JSON.stringify(result));
            var bikes = [];
            bikes = result['bikes'];
            if(bikes.length !== 0){
                infoWindows = [];
                bikes.forEach(bikes_json => {
                    addInfoWindowFreeBike(bikes_json['bike_id'], bikes_json['is_disabled'], bikes_json['is_reserved']);
                });
            }
        },
        error: function(result) {
            alert(_('ERROR_LOADING_GBFS'));
        }
    });
}

// Cargar en el mapa los marcadores de las bicicletas sueltas
function loadFreeBikeMarkersAjax(gbfs_system_id){
    return $.ajax({
        type: "get",
        url: 'api/v1/gbfs/' + gbfs_system_id + '/free_bike_status',
        success: function(result){
            result = JSON.parse(JSON.stringify(result));
            console.log(result);
            var bikes = [];
            bikes = result['bikes'];
            var center = new google.maps.LatLng(bikes[Math.floor(bikes.length/2)]['lat'], bikes[Math.floor(bikes.length/2)]['lon']);
            map.setCenter(center);
            if(bikes.length !== 0){
                deleteMarkers();
                var index = 0;
                bikes.forEach(bikes_json => {
                    position = new google.maps.LatLng(bikes_json['lat'], bikes_json['lon']);
                    addMarker(position, "https://iframe.nextbike.net/4com/icons/bilbaobizi_icon_22x33.png", index);
                    index++;
                });
                showMarkers();
            }     
            loadingDiv.style.visibility= 'hidden';
            loadingDiv.style.display = 'none';
        },
        error: function(result) {
            console.log("Error al cargar el sistema GBFS");
        }
    });
}

//////////////////////////////////////////////////////////////////
//                        INFO WINDOWS                          //
//////////////////////////////////////////////////////////////////
function addInfoWindowStation(gbfs_name, bikes_free, docks_free){
    const infoWindowStation = new google.maps.InfoWindow({
        content:    '<div id="content">'+
                        '<h6><strong>GBFS:&nbsp;</strong> '+ gbfs_name +'</h6>' +
                        '<div id="bodyContent">'+
                            '<hr>'+
                            '<ul>'+
                                '<li><p> '+ _("BIKES_REMAINING") + ' &rarr; ' + bikes_free + '</p></li>' + 
                                '<li><p> '+ _("ANCHORS_REMAINING") + ' &rarr; ' + docks_free + '</p></li>' +
                            '</ul>'+
                        '</div>' +
                    '</div>'
    });
    infoWindows.push(infoWindowStation);
}

function addInfoWindowFreeBike(bike_id, is_disabled, is_reserved){
    var disabled = reserved = _('NO');
    if(is_disabled === true){
        disabled = _('YES');
    }else if(is_reserved === true){
        reserved = _('YES');
    }
    const infoWindowFreeBike = new google.maps.InfoWindow({
        content:    '<div id="content">'+
                        '<h6><strong>ID:&nbsp;</strong> '+ bike_id +'</h6>' +
                        '<div id="bodyContent">'+
                            '<hr>'+
                            '<ul>'+
                                '<li><p> '+ _("IS_DISABLED") + ' &rarr; ' + disabled + '</p></li>' + 
                                '<li><p> '+ _("IS_RESERVED") + ' &rarr; ' + reserved + '</p></li>' +
                            '</ul>'+
                        '</div>' +
                    '</div>'
    });
    infoWindows.push(infoWindowFreeBike);
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

