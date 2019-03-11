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
    var Disney = new google.maps.LatLng(33.8121, -117.9190);


    var mapOptions = {
        zoom: 9,
        center: {lat: 34.2805, lng: -119.2945},
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false
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
        origin: myLocation,
        destination: CSUCI,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
            document.getElementById('travelTime').innerHTML = convertSeoncdsToTime(result.routes[0].legs[0].duration.value);

        }
    });

}

function convertSeoncdsToTime(time){
    var sec_num = parseInt(time, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if(hours < 1 && minutes > 10)
        return minutes + ' mins to work';
    else if(hours < 1 && minutes < 10)
        return minutes + ' min to work';
    else if(hours < 10 && minutes > 10)
        return hours + ' hr ' + minutes + ' mins to work';
    else if(hours < 10 && minutes < 10)
        return hours + ' hr ' + minutes + ' min to work';
    else if(hours > 10 && minutes > 10)
        return hours + ' hrs ' + minutes + ' mins to work';
    else if(hours > 10 && minutes < 10)
        return hours + ' hrs ' + minutes + ' min to work';
    else
        return 'nope'
}

function locationError() {
    alert("Couldn't get location");
}