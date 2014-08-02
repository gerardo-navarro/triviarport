function Timer(fn, countdown) {
    var ident, complete = false;

    function _time_diff(date1, date2) {
        return date2 ? date2 - date1 : new Date().getTime() - date1;
    }

    function cancel() {
        clearTimeout(ident);
    }

    function pause() {
        clearTimeout(ident);
        total_time_run = _time_diff(start_time);
        complete = total_time_run >= countdown;
    }

    function resume() {
        ident = complete ? -1 : setTimeout(fn, countdown - total_time_run);
    }

    var start_time = new Date().getTime();
    ident = setTimeout(fn, countdown);

    return { cancel: cancel, pause: pause, resume: resume };
}

function AirportDataAdapter(datasource) {

  this.new_airport_object = function(name, city, iata, latitude, longitude, wikipedia, zoom_start_level, optional_keywords) {
    return {
      name: name,
      city: city,
      iata_code: iata,
      latitude: latitude,
      longitude: longitude,
      wikipedia_url: wikipedia,
      initial_zoom_level: zoom_start_level,
      optional_keywords: optional_keywords || []
    };    
  };

  // Keeping track of already used indices
  excluding_indices = [];
  
  datasource = [
    this.new_airport_object("San Francisco International", "San Francisco", "SFO", 37.618972, -122.374889, "http://en.wikipedia.org/wiki/SFO", 16),
    this.new_airport_object("Haneda Airport", "Tokyo", "HND", 35.552258, 139.779694, "http://en.wikipedia.org/wiki/Haneda_Airport", 16, ["Haneda"]),
    this.new_airport_object("London Heathrow Airport", "London", "LHR", 51.4775, -0.461389, "http://en.wikipedia.org/wiki/London_Heathrow_Airport", 16, ["London Heathrow", "Heathrow"]),
    this.new_airport_object("Los Angeles International Airport", "Los Angeles", "LAX", 33.942536, -118.408075, "http://en.wikipedia.org/wiki/Los_Angeles_International_Airport", 16),
    this.new_airport_object("O'Hare International Airport", "Chicago", "ORD", 41.978603, -87.904842, "http://en.wikipedia.org/wiki/O%27Hare_International_Airport", 16, ["O'Hare", "O Hare"]),
    this.new_airport_object("Hong Kong International Airport", "Hong Kong", "HKG", 22.308919, 113.914603, "http://en.wikipedia.org/wiki/Hong_Kong_International_Airport", 16),
    this.new_airport_object("Dubai International Airport", "Dubai", "DXB", 25.252778, 55.364444, "http://en.wikipedia.org/wiki/Dubai_International_Airport", 16),
    this.new_airport_object("Dallas/Fort Worth International Airport", "Dallas", "DFW", 32.896828, -97.037997, "http://en.wikipedia.org/wiki/Dallas-Fort_Worth_International_Airport", 16, ["Fort Worth", "Dallas Fort Worth"]),
    this.new_airport_object("Charles de Gaulle Airport", "Paris", "CDG", 49.012779, 2.55, "http://en.wikipedia.org/wiki/Charles_de_Gaulle_Airport", 16, ["Charles de Gaulle"]),
    this.new_airport_object("Frankfurt Airport", "Frankfurt", "FRA", 50.026421, 8.543125, "http://en.wikipedia.org/wiki/Frankfurt_Airport", 16)
  ];
  

  this.get_random_airport = function() {
    var random_index = Math.floor(Math.random() * datasource.length);
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
  
  current_map.zoom_out = function() {
    
    if (current_map.getZoom() > 3) {

      current_map.setZoom(current_map.getZoom()-1);
      
      if (current_map.getZoom() == 12) {
        var image = 'images/airport_icon_marker_small.png';
        var beachMarker = new google.maps.Marker({
            position: current_airport_coordinates,
            map: current_map,
            icon: image
        });
      }

      // Start a new timer for the next zoom out
      zoom_out_thread = new Timer(current_map.zoom_out, 5000);
    }
  }

  // Start zooming out when the modal was hidden 
  $('#helpModal').on('hidden.bs.modal', function (e) {
    if (typeof(Storage) !== "undefined") {
      localStorage.airportrivia_newbee = false;
    }
    zoom_out_thread.resume();
  });

  $('#helpModal').on('show.bs.modal', function (e) {
    zoom_out_thread.pause();
  });

  var zoom_out_thread = new Timer(current_map.zoom_out, 5000);

  if (typeof(Storage) !== "undefined") {
    if (!localStorage.getItem("airportrivia_newbee")) {
      $("#helpModal").modal("show");
    }
  }
  
});

  
function check() {

  var answer = document.getElementById("airport_answer").value.trim();

  if (answer == undefined || answer == "" || answer.length > 100) return;

  // TODO:: Refactor this function, too much code duplication
  if (current_airport.iata_code.toLowerCase() == answer.toLowerCase() ) {
    alert("Nice work!!!1");
    return;
  }

  // We allow only one typo error
  if (new Levenshtein(answer.toLowerCase(), current_airport.city.toLowerCase()).distance <= 1) {
    alert("Nice work!!!2");
    return;
  }

  for (var i = 0; i < current_airport.optional_keywords.length; i++) {

    var keyword = current_airport.optional_keywords[i];
    var lev_distance = new Levenshtein(answer.toLowerCase(), keyword.toLowerCase()).distance;

    if (lev_distance <= 1) {
      alert("Nice work!!!3");
      return;   
    } else if (answer.length > keyword.length + 1 && answer.length - keyword.length <= lev_distance + 1) {
        alert("Nice work!!!4");
        return;   
    }
  }

  // if (current_airport.name.toLowerCase().score(answer.toLowerCase(), 0.5) > 0.8) {
  //   alert("Nice work!!!");
  // }
  
  alert("Sorry, that's wrong. Try again!!!");
}
