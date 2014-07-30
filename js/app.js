function AirportDataAdapter(datasource) {

  this.new_airport_object = function(name, city, iata, latitude, longitude, wikipedia, zoom_start_level) {
    return {
      name: name,
      city: city,
      iata_code: iata,
      latitude: latitude,
      longitude: longitude,
      wikipedia_url: wikipedia,
      initial_zoom_level: zoom_start_level
    };    
  };

  // Keeping track of already used indices
  excluding_indices = [];
  
  datasource = [
    this.new_airport_object("San Francisco International", "San Francisco", "SFO", 37.618972, -122.374889, "http://en.wikipedia.org/wiki/SFO", 16),
    this.new_airport_object("Haneda Airport", "Tokyo", "HND", 35.552258, 139.779694, "http://en.wikipedia.org/wiki/Haneda_Airport", 16),
    this.new_airport_object("London Heathrow Airport", "London", "LHR", 51.4775, -0.461389, "http://en.wikipedia.org/wiki/London_Heathrow_Airport", 16),
    this.new_airport_object("Los Angeles International Airport", "Los Angeles", "LAX", 33.942536, -118.408075, "http://en.wikipedia.org/wiki/Los_Angeles_International_Airport", 16),
    this.new_airport_object("O'Hare International Airport", "Chicago", "ORD", 41.978603, -87.904842, "http://en.wikipedia.org/wiki/O%27Hare_International_Airport", 16),
    this.new_airport_object("Hong Kong International Airport", "Hong Kong", "HKG", 22.308919, 113.914603, "http://en.wikipedia.org/wiki/Hong_Kong_International_Airport", 16),
    this.new_airport_object("Dubai International Airport", "Dubai", "DXB", 25.252778, 55.364444, "http://en.wikipedia.org/wiki/Dubai_International_Airport", 16),
    this.new_airport_object("Dallas/Fort Worth International Airport", "Dallas", "DFW", 32.896828, -97.037997, "http://en.wikipedia.org/wiki/Dallas-Fort_Worth_International_Airport", 16),
    this.new_airport_object("Charles de Gaulle Airport", "Paris", "CDG", 49.012779, 2.55, "http://en.wikipedia.org/wiki/Charles_de_Gaulle_Airport", 16),
    this.new_airport_object("Frankfurt Airport", "Frankfurt", "FRA", 50.026421, 8.543125, "http://en.wikipedia.org/wiki/Frankfurt_Airport", 16)
  ];
  

  this.get_random_airport = function() {
    var random_index = Math.floor(Math.random() * datasource.length) + 1;
    return datasource[random_index];
  };

}

var airport_datasource = new AirportDataAdapter();

var current_airport;   //shared variables

google.maps.event.addDomListener(window, 'load', function() {

  var airport_datasource = new AirportDataAdapter();
  current_airport = airport_datasource.get_random_airport();
  var current_airport_coordinates = new google.maps.LatLng(current_airport.latitude, current_airport.longitude);

  var mapProp = {
    center: current_airport_coordinates,
    zoom: current_airport.initial_zoom_level, // should depend on the screen size
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    // Disable all user interaction ...
    disableDefaultUI: true, draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true
  };

  var current_map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  
  var image = 'images/airport_icon_marker.png';
  var beachMarker = new google.maps.Marker({
      position: current_airport_coordinates,
      map: current_map,
      icon: image
  });


  current_map.zoom_out = function() {
    
    if (current_map.getZoom() > 3) {
      current_map.setZoom(current_map.getZoom()-1);
      setTimeout(function() {
        current_map.zoom_out();
      }, 5000);
    }
  }

  setTimeout(function() {
    current_map.zoom_out();
  }, 5000);
  
});

  
function check() {

  var answer = document.getElementById("answer").value.trim();

  if (answer == undefined || answer == "") return;

  console.log('"' + current_airport.iata_code.toLowerCase() + '".score("' + answer.toLowerCase() + '") => ' + current_airport.iata_code.toLowerCase().score(answer.toLowerCase()));
  console.log('"' + current_airport.city.toLowerCase() + '".score("' + answer.toLowerCase() + ', 0.5") => ' + current_airport.city.toLowerCase().score(answer.toLowerCase(), 0.5));
  console.log('"' + current_airport.name.toLowerCase() + '".score("' + answer.toLowerCase() + ', 0.5") => ' + current_airport.name.toLowerCase().score(answer.toLowerCase(), 0.5));
  if (current_airport.iata_code.toLowerCase().score(answer.toLowerCase()) > 0.9 ||
    current_airport.city.toLowerCase().score(answer.toLowerCase(), 0.5) > 0.8 ||
    current_airport.name.toLowerCase().score(answer.toLowerCase(), 0.5) > 0.8) {
    alert("Nice work!!!");
    
  } else {
    alert("Sorry, that's wrong. Try again!!!");
  }
}
