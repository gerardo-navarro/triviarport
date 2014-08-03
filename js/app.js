String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

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

  this.new_airport_object = function(name, city, iata, latitude, longitude, description_text, wikipedia_url, zoom_start_level, optional_keywords) {
    return {
      name: name,
      city: city,
      iata_code: iata,
      latitude: latitude,
      longitude: longitude,
      description_text: description_text,
      wikipedia_url: wikipedia_url,
      initial_zoom_level: zoom_start_level,
      optional_keywords: optional_keywords || []
    };    
  };

  // Keeping track of already used indices
  excluding_indices = [];
  
  // Cheater!! Cheater!! Cheater!! Cheater!! Cheater!! Cheater!! Cheater!! Cheater!!
  // Yeah yeah, come on! Please don't look at the possible airport written in plain text!! Respect the others that are not as smart as you. Next version will be better ...
  datasource = [
    
    this.new_airport_object("San Francisco International", "San Francisco", "SFO", 37.618972, -122.374889, "San Francisco International Airport (IATA: SFO) is an international airport located 13 miles (21 km) south of downtown San Francisco, California, USA.", "http://en.wikipedia.org/wiki/SFO", 16),

    this.new_airport_object("Haneda Airport", "Tokyo", "HND", 35.552258, 139.779694, "Tokyo International Airport (東京国際空港 Tōkyō Kokusai Kūkō?), commonly known as Haneda Airport (羽田空港 Haneda Kūkō?) or Tokyo Haneda Airport (IATA: HND), is one of the two primary airports that serve the Greater Tokyo Area. It is the primary base of Japan's two major domestic airlines, Japan Airlines (Terminal 1) and All Nippon Airways (Terminal 2).", "http://en.wikipedia.org/wiki/Haneda_Airport", 16, ["Haneda", "Tokyo Haneda"]),

    this.new_airport_object("London Heathrow Airport", "London", "LHR", 51.4775, -0.461389, "London Heathrow Airport or Heathrow (IATA: LHR) is a major international airport serving London, England, known as London Airport from 1946 until 1965. Heathrow is the busiest airport in the United Kingdom and the fifth busiest airport in the world (as of 2014) in total passenger traffic, handling more international passengers than any other airport around the globe.", "http://en.wikipedia.org/wiki/London_Heathrow_Airport", 16, ["London Heathrow", "Heathrow"]),

    this.new_airport_object("Los Angeles International Airport", "Los Angeles", "LAX", 33.942536, -118.408075, "Los Angeles International Airport (IATA: LAX) is the primary airport serving the Greater Los Angeles Area, the second-most populated metropolitan area in the United States. It is most often referred to by its IATA airport code LAX, with the letters pronounced individually.", "http://en.wikipedia.org/wiki/Los_Angeles_International_Airport", 16, ["LAX"]),

    this.new_airport_object("O'Hare International Airport", "Chicago", "ORD", 41.978603, -87.904842, "Chicago O'Hare International Airport (IATA: ORD), also known as O'Hare Airport, O'Hare Field, Chicago International Airport, or simply O'Hare, is a major airport located in the northwestern-most corner of Chicago, Illinois, USA.", "http://en.wikipedia.org/wiki/O%27Hare_International_Airport", 16, ["O'Hare", "O Hare", "O'Hare Field"]),

    this.new_airport_object("Hong Kong International Airport", "Hong Kong", "HKG", 22.308919, 113.914603, "Hong Kong International Airport (IATA: HKG) is the main airport in Hong Kong located on the island of Chek Lap Kok, which largely comprises land reclaimed for the construction of the airport itself. The airport is also colloquially known as Chek Lap Kok Airport (赤鱲角機場), to distinguish it from its predecessor, the closed Kai Tak Airport (啟德機場).", "http://en.wikipedia.org/wiki/Hong_Kong_International_Airport", 16, ["Chek Lap Kok"]),

    this.new_airport_object("Dubai International Airport", "Dubai", "DXB", 25.252778, 55.364444, "Dubai International Airport (IATA: DXB) (Arabic: مطار دبي الدولي‎) is an international airport serving Dubai. The airport is a major airline hub in the Middle East, is operated by the Dubai Airports Company and is the home base of Dubai's international airline, Emirates,", "http://en.wikipedia.org/wiki/Dubai_International_Airport", 16),

    this.new_airport_object("Dallas/Fort Worth International Airport", "Dallas", "DFW", 32.896828, -97.037997, "Dallas/Fort Worth International Airport (IATA: DFW) is the primary international airport serving the Dallas-Fort Worth metroplex in Texas, USA. It is the largest hub for American Airlines.", "http://en.wikipedia.org/wiki/Dallas-Fort_Worth_International_Airport", 16, ["Fort Worth", "Dallas Fort Worth"]),

    this.new_airport_object("Charles de Gaulle Airport", "Paris", "CDG", 49.012779, 2.55, "Paris Charles de Gaulle Airport (French: Aéroport de Paris-Charles-de-Gaulle, IATA: CDG), also known as Roissy Airport (or just Roissy in French), is one of the world's principal aviation centres, as well as France's largest airport.", "http://en.wikipedia.org/wiki/Charles_de_Gaulle_Airport", 16, ["Charles de Gaulle", "Roissy Airport", "Roissy"]),

    this.new_airport_object("Frankfurt Airport", "Frankfurt", "FRA", 50.026421, 8.543125, "Frankfurt Airport (IATA: FRA) is a major international airport located in Frankfurt, the fifth-largest city of Germany and one of the world's leading financial centers. It is operated by Fraport and serves as the main hub for Lufthansa.", "http://en.wikipedia.org/wiki/Frankfurt_Airport", 16, ["Flughafen Frankfurt am Main", "Rhein-Main-Flughafen"])
  ];
  

  this.get_random_airport = function() {
    var random_index = Math.floor(Math.random() * datasource.length);
    return datasource[random_index];
    // return datasource[0];
  };

}

function AirportriviaUser() {
  this.airport_history = [];
  this.current_attempt_count = 3;

  this.prepare_for_new_attempt = function() {
    this.current_attempt_count = 3;
  }
}

var airport_datasource = new AirportDataAdapter();
var current_user = new AirportriviaUser();
var current_airport;   //shared variables

google.maps.event.addDomListener(window, 'load', function() {

  $('form').submit(false);

  var airport_data_adapter = new AirportDataAdapter();
  current_airport = airport_data_adapter.get_random_airport();
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

  current_user.current_attempt_count--;

  var answer = document.getElementById("airport_answer").value.trim();

  if (answer == undefined || answer == "" || answer.length > 100) return;

  // Either the IATA code has to be 100% correct or the submitted city has at most one typo error
  if (current_airport.iata_code.toLowerCase() == answer.toLowerCase() ||
    new Levenshtein(answer.toLowerCase(), current_airport.city.toLowerCase()).distance <= 1) {

    show_positive_resolution_dialog();
    return;
  }

  for (var i = 0; i < current_airport.optional_keywords.length; i++) {
    var keyword = current_airport.optional_keywords[i];
    var lev_distance = new Levenshtein(answer.toLowerCase(), keyword.toLowerCase()).distance;
    if (lev_distance <= 1) {
      show_positive_resolution_dialog();
      return;   
    } else if (answer.length > keyword.length + 1 && answer.length - keyword.length <= lev_distance + 1) {
        show_positive_resolution_dialog();
        return;   
    }
  }

  if (current_user.current_attempt_count > 0) {

    $("#airport_answer").val("");
    if (current_user.current_attempt_count == 2) {
      $("#airport_answer").attr("placeholder", "Sry, wrong! Two attempts left ...");
    } else {
      $("#airport_answer").attr("placeholder", "Sry, wrong! Last attempt ...");
    }

    return;
  }

  show_negative_resolution_dialog();
}

function show_resolution_dialog() {
  $("#airportDescription").html(current_airport.description_text + " " + $("#airportDescription").html());
  $("#airportWikipedia").attr("href", current_airport.wikipedia_url);
  $("#airportOnGoogleMap").attr("href", "https://maps.google.com/maps?ll={0},{1}&t=k&z={2}".format(current_airport.latitude, current_airport.longitude, current_airport.initial_zoom_level));
  $("#resolutionModal").modal("show");
}

function show_positive_resolution_dialog() {
  $("#resolutionModalTitle").text("Nice work!!");
  show_resolution_dialog();
}

function show_negative_resolution_dialog() {
  $("#resolutionModalTitle").text("Sry, the right airport is ...");
  show_resolution_dialog();
}

$('#resolutionModal').on('hidden.bs.modal', function (e) {
  if (typeof(Storage) !== "undefined") {
    localStorage.airportrivia_newbee = false;
  }
  zoom_out_thread.resume();
});


