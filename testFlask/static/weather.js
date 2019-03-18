
var weather_api_url = 'http://api.openweathermap.org/data/2.5/weather?';
var api_key = '&appid=bb2dbfe7b82398ee904d7ef120240081';
var units = '&units=imperial';
var latitude = 'lat=';
var longitude = '&lon=';
var url;
var weatherDisplay = document.getElementById("weather");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else {
    weatherDisplay.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function getWeather(position) {
    url = weather_api_url + latitude + position.coords.latitude + longitude + position.coords.longitude + units + api_key;
    jQuery.getJSON(url,function (data) {
        weatherDisplay.innerHTML= "Weather<br>" + data.main.temp + "°F";
        var iconForWeather = document.getElementById("weatherIcon");
        var wIcon = "../icons/" + data.weather[0].icon + ".png";
        iconForWeather.setAttribute("src",wIcon);

    });

}