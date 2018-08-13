var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var tempUnit = 'C';
var currentTempInCelsius;

$( document ).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
    $("#error").text("Geolocation is not supported by this browser.");
  }

  $("#tempunit").click(function () {
    var currentTempUnit = $("#tempunit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempunit").text(newTempUnit);
    if (newTempUnit == "F") {
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahTemp + " " + String.fromCharCode(176));
    } else {
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
    }
  });
  $("#se-btnn").click(function(){
    var x = document.getElementById("se-text").value;
    
    var apii ="https://maps.googleapis.com/maps/api/geocode/json?address=";

    if(x==""){
       alert("please enter something..!");
       }
    else{
      
      x.toLowerCase();
      var UrlApi= apii+x;         
     
    $.ajax({url: UrlApi,success: function(result){
        var slat ="lat=" + result.results[0].geometry.location.lat;
         var slon ="lon="+ result.results[0].geometry.location.lng;
      getWeather(slat, slon);
    }
  });
      
     
    }
  });
})

function getWeather(lat, lon) {
  
  var urlString = api + lat + "&" + lon;
  $.ajax({
    url: urlString, success: function (result) {
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
      currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      $("#tempunit").text(tempUnit);
      $("#desc").text(result.weather[0].main);
       IconGen(result.weather[0].main);
    }
  });
}
function IconGen(desc) {
  var desc = desc.toLowerCase()
  switch (desc) {
    case 'drizzle':
      $("#wicon").html("<i class='wi wi-day-sleet'></i>");
      break;
    case 'clouds':
      $("#wicon").html("<i class='wi wi-day-cloudy></i>");
      break;
    case 'rain':
      $("#wicon").html("<i class='wi wi-day-rain'></i>");
      break;
    case 'snow':
      $("#wicon").html("<i class='wi wi-day-snow'></i>");
      break;
    case 'clear':
      $("#wicon").html("<i class='wi wi-day-sunny'></i>");
      break;
    case 'thunderstom':
      $("#wicon").html("<i class='wi wi-day-lightning'></i>");
      break;
    default:
      $("#wicon").html("<i class='wi wi-alien'></i>");
      $("#desc").html("<b>Our System Can Not recognized Weather Conditons</b><i class='em em-disappointed'></i>");
  }
}