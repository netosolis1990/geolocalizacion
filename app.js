var map,mar;
var lat,lon;
$(document).ready(function() {
    map = cargarMapa(map,lat = 19.044515,lon = -98.198736);
    gps();
});

function cargarMapa(map,lat,lon){
    if(map == undefined){
        var mapOptions = {
            center: new google.maps.LatLng(lat, lon),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT,
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            scrollwheel: false,
            panControl:false,
            streetViewControl:false,
            disableDoubleClickZoom: true
        };
        map = new google.maps.Map(document.getElementById('map'),mapOptions);
    }
    else{
        centrarMapa(map,lat,lon);
    }
    return map;
}

//funcion que centra el mapa
function centrarMapa(map,lat,lon){
    map.panTo(new google.maps.LatLng(lat, lon));
}

//funcion para poner un marcador
function cargarMarcador(mar,map,lat,lon,dr,im){
    if(mar == undefined){
       var mar = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            draggable:dr,
            icon: im,
        });
        mar.setMap(map);
    }
    else{
        mar.setPosition(new google.maps.LatLng(lat, lon));
    }
    centrarMapa(map,lat,lon);
    return mar;
}

function gps(){
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(pos){
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;
            mar = cargarMarcador(mar,map,lat,lon,true,'marker.png');
            alert("Localizado Correctamente");
        }, function(err){
            lat = 19.044515;
            lon = -98.198736;
            mar = cargarMarcador(mar,map,lat,lon,true,'marker.png');
            alert("Error");
        }, {enableHighAccuracy:true, timeout: 10000,maximumAge: 500});
    }
    else
    {
        lat = 19.044515;
        lon = -98.198736;
        mar = cargarMarcador(mar,map,lat,lon,true,'marker.png');
        alert("Error");
    }
}


