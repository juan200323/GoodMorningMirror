function initMap() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    }
    else {
        alert("Geolocation not supported");
    }

}

function locationSuccess(position) {

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var trafficLayer = new google.maps.TrafficLayer();

    var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var LA = new google.maps.LatLng(34.0522, -118.2437);
    var Ventura = new google.maps.LatLng(34.2805, -119.2945);
    var CSUCI = new google.maps.LatLng(34.1621, -119.0434);


    var mapOptions = {
        zoom: 9,
        center: {lat: 34.2805, lng: -119.2945}
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
    trafficLayer.setMap(map);

    //This will mark the current location if found
    // var myLocationMarker = new google.maps.Marker({
    //     position: myLocation,
    //     map: map,
    //     title: 'Current location'
    // });

    map.setCenter(myLocation);

    var request = {
        origin: Ventura,
        destination: CSUCI,
        travelMode: 'DRIVING'
    };

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK)
            directionsDisplay.setDirections(result);
    });

}

function locationError() {
    alert("Couldn't get location");
}