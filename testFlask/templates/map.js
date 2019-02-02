function initMap() {

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var trafficLayer = new google.maps.TrafficLayer();
    var Ventura = new google.maps.LatLng(34.2805, -119.2945);
    var CSUCI = new google.maps.LatLng(34.1621, -119.0434);
    var infoWindow = new google.maps.InfoWindow();

    var mapOptions = {
        zoom: 8,
        center: {lat: 34.2805, lng: -119.2945}
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var pos =
                    {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };


                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                infoWindow.open(map);
                map.setCenter(pos);

                var request = {
                    origin: pos,
                    destination: CSUCI,
                    travelMode: 'DRIVING'
                };

                directionsService.route(request, function (result, status) {
                    if (status == 'OK')
                        directionsDisplay.setDirections(result);
                });

                directionsDisplay.setMap(map);
                trafficLayer.setMap(map);


            });
    }


}