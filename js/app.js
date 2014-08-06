var Triviarport = Triviarport || {};

Array.prototype.get_random = function() {
    var random_index = Math.floor(Math.random() * this.length);
    return this[random_index];
}

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
  var last_indices_used = [null, null, null];
  
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

    this.new_airport_object("Frankfurt Airport", "Frankfurt", "FRA", 50.026421, 8.543125, "Frankfurt Airport (IATA: FRA) is a major international airport located in Frankfurt, the fifth-largest city of Germany and one of the world's leading financial centers. It is operated by Fraport and serves as the main hub for Lufthansa.", "http://en.wikipedia.org/wiki/Frankfurt_Airport", 16, ["Flughafen Frankfurt am Main", "Rhein-Main-Flughafen"]),

    this.new_airport_object("Hartsfield–Jackson Atlanta International Airport", "Atlanta", "ATL", 33.6366995, -84.4278639, "Hartsfield–Jackson Atlanta International Airport (IATA: ATL), known locally as Atlanta Airport, Hartsfield, or Hartsfield–Jackson, is located seven miles (11 km) south of the central business district of Atlanta, Georgia, USA. It has been the world's busiest airport by passenger traffic since 1998, and by number of landings and take-offs since 2005. Hartsfield–Jackson held its ranking as the world's busiest airport in 2012 by accommodating 95 million passengers (more than 260,000 passengers daily) and 950,119 flights. Many of the nearly one million flights are domestic flights from within the United States, where Atlanta serves as a major hub for travel throughout the Southeastern United States. The airport has 207 domestic and international gates.", "http://en.wikipedia.org/wiki/Hartsfield%E2%80%93Jackson_Atlanta_International_Airport", 16, ["Atlanta Airport", "Hartsfield", "Hartsfield–Jackson", "Hartsfield–Jackson Atlanta"]),
    
    this.new_airport_object("Beijing Capital International Airport", "Beijing", "PEK", 40.080111, 116.584556, "Beijing Capital International Airport (IATA: PEK) is the main international airport serving Beijing. It is located 32 km (20 mi) northeast of Beijing's city center. The airport is owned and operated by the Beijing Capital International Airport Company Limited, a state-controlled company. The airport's IATA Airport code, PEK, is based on the city's former romanized name, Peking.", "http://en.wikipedia.org/wiki/Beijing_Capital_International_Airport", 16, ["Beijing Capital", "Peking"])


    // this.new_airport_object("name", "city", "iata", latitude, longitude, "description", "wikipedia", 16, ["keyword", "keyword"])
  ];


  this.get_random_airport = function() {
    
    do {
      var random_index = Math.floor(Math.random() * datasource.length);
    } while (last_indices_used[0] == random_index || last_indices_used[1] == random_index || last_indices_used[2] == random_index);

    last_indices_used[0] = last_indices_used[1];
    last_indices_used[1] = last_indices_used[2];
    last_indices_used[2] = random_index;
    return datasource[random_index];
    // return datasource[11];
  };

}

// Triviarport.Game = function() {
//   this.user = new Triviarport.User();
// }

// Triviarport.Game.prototype.isGameOver = function() {
//   user.wrong_attempt_count == 3
//   return user.wrong_attempt_count == 3
// }


Triviarport.User = function() {
  this.wrong_attempt_count = 0;
}

Triviarport.User.prototype.updateScore = function() {
  $("#score").text(this.current_score_points.toString());
}

function AirportriviaUser() {
  this.airport_history = [];
  this.wrong_attempt_count = 0;
  this.current_score_points = 80; // Why? Because it is we have 14 zoom levels taking 5 seconds each and finally we have 10 seconds in the final stage 

  this.update_score = function() {
    $("#score").text(this.current_score_points.toString());
  }
}


var airport_data_adapter = new AirportDataAdapter();
var current_user = new AirportriviaUser();
var current_airport;   //shared variables
var map;   //shared variables



function show_airport_on_map(airport) {

  var airport_coordinates = new google.maps.LatLng(airport.latitude, airport.longitude);

  var mapProp = {
    center: airport_coordinates,
    zoom: airport.initial_zoom_level, // TODO:: Evaluate whether the initial zoom level should depend on the screen size
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    // Disable all user interaction ...
    disableDefaultUI: true, draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true
  };

  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  
  map.airport = airport;
  
  map.zoom_out = function() {
    
    if (map.getZoom() > 3) {

      map.setZoom(map.getZoom()-1);
      
      if (map.getZoom() == 12) {
        var beachMarker = new google.maps.Marker({
            position: airport_coordinates,
            map: map,
            icon: "images/airport_icon_marker_small.png"
        });
      }

      if (map.getZoom() > 7) {
        current_user.current_score_points -= 5;
      } else {
        current_user.current_score_points -= 10;
      }
      current_user.update_score();


      // Start a new timer for the next zoom out
      map.zoom_out_thread = new Timer(map.zoom_out, 5000);
    
    } else {
      setTimeout(function() {
        show_negative_resolution_dialog();
        current_user.current_score_points -= 10;
      }, 10000);
    }
  }

  map.zoom_out_thread = new Timer(map.zoom_out, 6000);

  return map;
}

function prepare_resolution_modal_for(airport) {
  $("#airportDescription").html(airport.description_text + " " + $("#airportWikipedia")[0].outerHTML);
  $("#airportWikipedia").attr("href", airport.wikipedia_url);
  $("#airportOnGoogleMap").attr("href", "https://maps.google.com/maps?ll={0},{1}&t=k&z={2}".format(airport.latitude, airport.longitude, airport.initial_zoom_level));
}

function focus_airport_answer_input() {
  // Defer execution of focus since we are in a dom-refreshing hidden-handler
  setTimeout(function() { $("#airport_answer").focus(); }, 0);
}

function reset_page_for_new_airport() {

    $("#airport_answer").val("");
    $("#airport_answer").attr("placeholder", "Guess the airport's name, IATA or city");
    // current_user.prepare_for_new_attempt();
}

google.maps.event.addDomListener(window, 'load', function() {

  // Disable the automatic submit of the form
  $('form').submit(false);

  // var airport_data_adapter = new AirportDataAdapter();
  current_airport = airport_data_adapter.get_random_airport();
  var current_map = show_airport_on_map(current_airport);

  // ---------- All event listeners for the help modal -------------
  $('#helpModal').on('show.bs.modal', function (e) {
    current_map.zoom_out_thread.pause();
  });

  $('#helpModal').on('shown.bs.modal', function (e) {
    $("#button-help-modal-dismiss").focus();
  });

  if (typeof(Storage) !== "undefined") {
    if (!localStorage.getItem("airportrivia_newbee")) {
      $("#helpModal").modal("show");
    }
  }

  // Start or resume zooming out when the modal was hidden 
  $('#helpModal').on('hidden.bs.modal', function (e) {
    if (typeof(Storage) !== "undefined") {
      localStorage.airportrivia_newbee = false;
    }
    
    focus_airport_answer_input();
    current_map.zoom_out_thread.resume();
  });

  prepare_resolution_modal_for(current_airport);

  // ---------- All event listeners for the resolution modal -------------
  $('#resolutionModal').on('show.bs.modal', function (e) {
    current_map.zoom_out_thread.cancel();
  });

  $('#resolutionModal').on('shown.bs.modal', function (e) {
    $("#button-resolution-modal-dismiss").focus();
  });

  $('#resolutionModal').on('hide.bs.modal', function (e) {
    $("#airport-answer-form").removeClass("has-error");
    $("#airport-answer-form").removeClass("has-success");
    if ($("#score-life-{0}".format(current_user.wrong_attempt_count)).hasClass("losing")) {
      $("#score-life-{0}".format(current_user.wrong_attempt_count)).removeClass("losing");
      $("#score-life-{0}".format(current_user.wrong_attempt_count)).addClass("lost");
    }
  });

  $('#resolutionModal').on('hidden.bs.modal', function (e) {
    
    reset_page_for_new_airport();


    current_airport = airport_data_adapter.get_random_airport();

    current_map = show_airport_on_map(current_airport);
    
    focus_airport_answer_input();

    current_user.update_score();
    prepare_resolution_modal_for(current_airport);
  });
});

  
function check() {

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

    if (new Levenshtein(answer.toLowerCase(), keyword.toLowerCase()).distance <= 1) {

      show_positive_resolution_dialog();
      return;   

    } else {
      var wordsInAnswer = answer.split(" ");
      for (var j = 0; j < wordsInAnswer.length; j++) {
        if (new Levenshtein(wordsInAnswer[j].trim().toLowerCase(), keyword.toLowerCase()).distance <= 1) {
          show_positive_resolution_dialog();
          return;   
        }
      }
    }
  }

  current_user.wrong_attempt_count++;

  if (current_user.wrong_attempt_count < 3) {
    show_negative_resolution_dialog();
    return;
  } 

  show_game_over_dialog();
}

var celebrations = Array("Nice done!", "Good job!", "Outstanding!", "Spectacular!", "Great!", "Awesome!");
var motivationals = Array("Off by one!", "Too bad!", "Keep working on it!", "Not this time!", "You can do better!");

function show_game_over_dialog() {
  $("#game-over-modal").modal("show");
  $("#airport-answer-form").toggleClass("has-error");
  $("#score-life-{0}".format(current_user.wrong_attempt_count)).toggleClass("losing");
}

function show_negative_resolution_dialog() {

  map.zoom_out_thread.cancel();

  $("#airport_answer").blur(); // Disable focus from input field to ignore any input
  $("#airport-answer-form").toggleClass("has-error");
  $("#score-life-{0}".format(current_user.wrong_attempt_count)).toggleClass("losing");
  $("#resolutionModalTitle").text(motivationals.get_random());
  $("#resolutionModal").modal("show");

  // new Timer(function(){
  //   $("#airport-answer-form").toggleClass("has-error");
  //   $("#score-life-{0}".format(current_user.wrong_attempt_count)).toggleClass("losing");
  // }, 300);
  // new Timer(function(){
  //   $("#airport-answer-form").toggleClass("has-error");
  //   $("#score-life-{0}".format(current_user.wrong_attempt_count)).toggleClass("losing");
  // }, 600);
  // new Timer(function(){
  //   $("#airport-answer-form").toggleClass("has-error");
  //   $("#score-life-{0}".format(current_user.wrong_attempt_count)).toggleClass("losing");
  //   $("#resolutionModal").modal("show");
  // }, 900);
  // new Timer(function(){
  //   $("#airport-answer-form").toggleClass("has-error");
  //   $("#score-life-{0}".format(current_user.wrong_attempt_count)).toggleClass("losing");
  // }, 1200);
  // new Timer(function(){
  //   $("#airport-answer-form").toggleClass("has-error");
  //   $("#score-life-{0}".format(current_user.wrong_attempt_count)).toggleClass("lost");
  // }, 1500);

}

function show_positive_resolution_dialog() {

  map.zoom_out_thread.cancel();

  current_user.current_score_points += 80;
  $("#airport_answer").blur(); // Disable focus from input field to ignore any input
  $("#airport-answer-form").toggleClass("has-success");
  $("#resolutionModalTitle").text(celebrations.get_random());
  $("#resolutionModal").modal("show");

  // new Timer(function(){
  //   $("#airport-answer-form").toggleClass("has-success");

  // }, 300);
  // new Timer(function(){ $("#airport-answer-form").toggleClass("has-success"); }, 600);
  // new Timer(function(){
  //   $("#airport-answer-form").toggleClass("has-success");
  //   current_airport = airport_data_adapter.get_random_airport();
  //   map = show_airport_on_map(current_airport);
  // }, 900);
  // new Timer(function(){ $("#airport-answer-form").toggleClass("has-success"); }, 1200);
  // new Timer(function(){
  //   $("#airport-answer-form").toggleClass("has-success");
  //   reset_page_for_new_airport();
  //   $("#airport_answer").attr("placeholder", "{0} Guess the next airport ...".format(celebrations.get_random()));
  //   focus_airport_answer_input();
  //   current_user.current_score_points += 80;
  //   current_user.update_score();
  // }, 1500);
  
}
