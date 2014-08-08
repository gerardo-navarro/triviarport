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

    this.new_airport_object("Haneda Airport", "Tokyo", "HND", 35.548691, 139.783727, "Tokyo International Airport (東京国際空港 Tōkyō Kokusai Kūkō?), commonly known as Haneda Airport (羽田空港 Haneda Kūkō?) or Tokyo Haneda Airport (IATA: HND), is one of the two primary airports that serve the Greater Tokyo Area. It is the primary base of Japan's two major domestic airlines, Japan Airlines (Terminal 1) and All Nippon Airways (Terminal 2).", "http://en.wikipedia.org/wiki/Haneda_Airport", 16, ["Haneda", "Tokyo Haneda"]),

    this.new_airport_object("London Heathrow Airport", "London", "LHR", 51.470531, -0.462076, "London Heathrow Airport or Heathrow (IATA: LHR) is a major international airport serving London, England, known as London Airport from 1946 until 1965. Heathrow is the busiest airport in the United Kingdom and the fifth busiest airport in the world (as of 2014) in total passenger traffic, handling more international passengers than any other airport around the globe.", "http://en.wikipedia.org/wiki/London_Heathrow_Airport", 16, ["London Heathrow", "Heathrow"]),

    this.new_airport_object("Los Angeles International Airport", "Los Angeles", "LAX", 33.942536, -118.408075, "Los Angeles International Airport (IATA: LAX) is the primary airport serving the Greater Los Angeles Area, the second-most populated metropolitan area in the United States. It is most often referred to by its IATA airport code LAX, with the letters pronounced individually.", "http://en.wikipedia.org/wiki/Los_Angeles_International_Airport", 16, ["LAX"]),

    this.new_airport_object("O'Hare International Airport", "Chicago", "ORD", 41.978603, -87.904842, "Chicago O'Hare International Airport (IATA: ORD), also known as O'Hare Airport, O'Hare Field, Chicago International Airport, or simply O'Hare, is a major airport located in the northwestern-most corner of Chicago, Illinois, USA.", "http://en.wikipedia.org/wiki/O%27Hare_International_Airport", 16, ["O'Hare", "O Hare", "O'Hare Field"]),

    this.new_airport_object("Hong Kong International Airport", "Hong Kong", "HKG", 22.308919, 113.914603, "Hong Kong International Airport (IATA: HKG) is the main airport in Hong Kong located on the island of Chek Lap Kok, which largely comprises land reclaimed for the construction of the airport itself. The airport is also colloquially known as Chek Lap Kok Airport (赤鱲角機場), to distinguish it from its predecessor, the closed Kai Tak Airport (啟德機場).", "http://en.wikipedia.org/wiki/Hong_Kong_International_Airport", 16, ["Chek Lap Kok"]),

    this.new_airport_object("Dubai International Airport", "Dubai", "DXB", 25.252778, 55.364444, "Dubai International Airport (IATA: DXB) (Arabic: مطار دبي الدولي‎) is an international airport serving Dubai. The airport is a major airline hub in the Middle East, is operated by the Dubai Airports Company and is the home base of Dubai's international airline, Emirates,", "http://en.wikipedia.org/wiki/Dubai_International_Airport", 16),

    this.new_airport_object("Dallas/Fort Worth International Airport", "Dallas", "DFW", 32.897678, -97.040484, "Dallas/Fort Worth International Airport (IATA: DFW) is the primary international airport serving the Dallas-Fort Worth metroplex in Texas, USA. It is the largest hub for American Airlines.", "http://en.wikipedia.org/wiki/Dallas-Fort_Worth_International_Airport", 16, ["Fort Worth", "Dallas Fort Worth"]),

    this.new_airport_object("Charles de Gaulle Airport", "Paris", "CDG", 49.003913, 2.571763, "Paris Charles de Gaulle Airport (IATA: CDG), also known as Roissy Airport (or just Roissy in French), is one of the world's principal aviation centres, as well as France's largest airport.", "http://en.wikipedia.org/wiki/Charles_de_Gaulle_Airport", 16, ["Charles de Gaulle", "Roissy Airport", "Roissy"]),

    this.new_airport_object("Frankfurt Airport", "Frankfurt", "FRA", 50.047715, 8.573664, "Frankfurt Airport (IATA: FRA) is a major international airport located in Frankfurt, the fifth-largest city of Germany and one of the world's leading financial centers. It is operated by Fraport and serves as the main hub for Lufthansa.", "http://en.wikipedia.org/wiki/Frankfurt_Airport", 16, ["Flughafen Frankfurt am Main", "Rhein-Main-Flughafen"]),

    this.new_airport_object("Hartsfield–Jackson Atlanta International Airport", "Atlanta", "ATL", 33.640669, -84.425389, "Hartsfield–Jackson Atlanta International Airport (IATA: ATL), known locally as Atlanta Airport, Hartsfield, or Hartsfield–Jackson, is located seven miles (11 km) south of the central business district of Atlanta, Georgia, USA. It has been the world's busiest airport by passenger traffic since 1998, and by number of landings and take-offs since 2005. Hartsfield–Jackson held its ranking as the world's busiest airport in 2012 by accommodating 95 million passengers (more than 260,000 passengers daily) and 950,119 flights. Many of the nearly one million flights are domestic flights from within the United States, where Atlanta serves as a major hub for travel throughout the Southeastern United States. The airport has 207 domestic and international gates.", "http://en.wikipedia.org/wiki/Hartsfield%E2%80%93Jackson_Atlanta_International_Airport", 16, ["Atlanta Airport", "Hartsfield", "Hartsfield–Jackson", "Hartsfield–Jackson Atlanta"]),
    
    this.new_airport_object("Beijing Capital International Airport", "Beijing", "PEK", 40.075674, 116.606158, "Beijing Capital International Airport (IATA: PEK) is the main international airport serving Beijing. It is located 32 km (20 mi) northeast of Beijing's city center. The airport is owned and operated by the Beijing Capital International Airport Company Limited, a state-controlled company. The airport's IATA Airport code, PEK, is based on the city's former romanized name, Peking.", "http://en.wikipedia.org/wiki/Beijing_Capital_International_Airport", 16, ["Beijing Capital", "Peking"]),

    this.new_airport_object("Pyongyang Sunan International Airport", "Pyongyang", "FNJ", 39.201631, 125.674836, "Pyongyang Sunan International Airport (IATA: FNJ) is the main airport serving Pyongyang, capital of the Democratic People's Republic of Korea (North Korea). It is located in the city's Sunan-guyŏk district, 24 kilometres (15 mi) from the city's centre.", "http://en.wikipedia.org/wiki/Pyongyang_Sunan_International_Airport", 16, ["Pyongyang Sunan", "Pyongyang International"]),

    this.new_airport_object("Princess Juliana International Airport", "Philipsburg", "SXM", 18.041258, -63.112841, "Princess Juliana International Airport (IATA: SXM) (also known as Sint Maarten International Airport) serves the Dutch part of the island of Saint Martin. The airport is the major gateway for the smaller Leeward Islands, including Anguilla, Saba, St. Barthélemy and St. Eustatius. It is named after Juliana of the Netherlands, who as crown princess landed here in 1944, the year after the airport opened. The airport is perhaps best known for very low-altitude flyover landing approaches due to one end of its runway being extremely close to the shore and Maho Beach.", "http://en.wikipedia.org/wiki/Princess_Juliana_International_Airport", 16, ["Saint Martin", "St Martin", "Princess Juliana"]),

    this.new_airport_object("Gibraltar International Airport", "Gibraltar", "GIB", 36.151219, -5.349664, "Gibraltar International Airport or North Front Airport (IATA: GIB) is the civilian airport that serves the British overseas territory of Gibraltar. The runway is owned by the Ministry of Defence for use by the Royal Air Force as RAF Gibraltar. The History Channel programme Most Extreme Airports ranked the airport the fifth most extreme airport in the world.", "http://en.wikipedia.org/wiki/Gibraltar_International_Airport", 16, ["North Front"]),

    this.new_airport_object("Tenzing-Hillary Airport", "Lukla", "LUA", 27.687778, 86.731389, "Tenzing-Hillary Airport (IATA: LUA), also known as Lukla Airport, is a small airport in the town of Lukla, in eastern Nepal. A program titled Most Extreme Airports, broadcast on The History Channel in 2010, rated the airport as the most dangerous airport in the world. In January 2008 the airport was renamed in honor of Sir Edmund Hillary and Sherpa Tenzing Norgay, the first people to reach the summit of Mount Everest and also to mark their efforts in the construction of this airport. The airport is popular because Lukla is the place where most people start the climb to Mount Everest Base Camp.", "http://en.wikipedia.org/wiki/Tenzing-Hillary_Airport", 16, ["Tenzing-Hillary"]),

    this.new_airport_object("Juancho E. Yrausquin Airport", "Saba", "SAB", 17.645278, -63.220556, "Juancho E. Yrausquin Airport (IATA: SAB) is the only airport on the Caribbean island of Saba. The airport has the shortest commercial runway in the world, only 396 meters (1,299 ft) long, flanked on one side by high hills, with cliffs that drop into the sea at both ends. Although the airport is closed to jet traffic, regional airline propeller aircraft are able to land there under waivers from The Netherlands Antilles' Civil Aviation Authority. The most common aircraft to land there are the Twin Otter and BN-2 Islander.", "http://en.wikipedia.org/wiki/Juancho_E._Yrausquin_Airport", 16, ["Juancho Yrausquin", "Juancho", "Yrausquin"]),

    this.new_airport_object("Saint Barthelemy Airport", "Gustavia", "iata", 17.904425, -62.846112, "Gustaf III Airport (IATA: SBH), also known as Saint Barthélemy Airport, sometimes as St. Jean Airport, is a public use airport located in the village of St. Jean on the Caribbean island of Saint Barthélemy. Both the airport and the island's main town of Gustavia are named for King Gustav III of Sweden, under whom Sweden obtained the island from France in 1784 (it was sold back to France in 1878).", "http://en.wikipedia.org/wiki/Gustaf_III_Airport", 16, ["St. Barthelemy", "Saint Barthelemy", "St. Jean", "Saint Jean", "Gustaf III"]),

    this.new_airport_object("Helgoland-Düne Airport", "Helgoland", "HGL", 54.1853, 7.91583, "Heligoland Airport (IATA: HGL) is a small airport on the German island of Düne, the smaller of the two isles of the Heligoland archipelago in the North Sea, about 70 kilometres (43 mi) from the mainland.", "http://en.wikipedia.org/wiki/Helgoland_Airport", 16, ["Helgoland", "Düne"]),

    this.new_airport_object("Adolfo Suárez Madrid–Barajas Airport", "Madrid", "MAD", 40.493556, -3.566764, "Adolfo Suárez Madrid–Barajas Airport (Spanish: Aeropuerto Adolfo Suárez Madrid-Barajas (IATA: MAD) is the main international airport serving Madrid in Spain. In 2011 and 2010, over 49 million passengers used Madrid–Barajas, making it the country's largest and busiest airport, and in 2013 it was Europe's sixth busiest airport. Located within the city limits of Madrid, just 9 km (5.6 mi) from the city's financial district and 13 km (8.1 mi) northeast of the Puerta del Sol, Madrid's historic centre. The airport name derives from the adjacent district of Barajas, which has its own metro station on the same rail line serving the airport.", "http://en.wikipedia.org/wiki/Adolfo_Su%C3%A1rez_Madrid%E2%80%93Barajas_Airport", 16, ["Barajas", "Madrid Barajas", "Adolfo Suárez Madrid", "Adolfo Suárez"]),

    this.new_airport_object("Barcelona – El Prat Airport", "Barcelona", "BCN", 41.290351, 2.078344, "Barcelona – El Prat Airport (IATA: BCN), simply known as Barcelona Airport, is located 12 km (7.5 mi) southwest of the centre of Barcelona, Catalonia, Spain, lying in the municipalities of El Prat de Llobregat, Viladecans, and Sant Boi. The airport is the second largest in Spain behind Madrid Barajas Airport and 31st busiest in the world, and is the main airport of Catalonia. It is a main base for Vueling, a hub for Iberia Regional and low-cost giant Ryanair as well as a focus city for Air Europa. The Barcelona–Madrid air shuttle service, known as the \"Puente Aéreo\", was the world's busiest route until 2008, with the highest number of flight operations (971 per week) in 2007. The schedule has been reduced since February 2008, when a Madrid–Barcelona high-speed rail line was opened, covering the distance in 2 hours 30 minutes, and quickly became popular.", "http://en.wikipedia.org/wiki/Adolfo_Su%C3%A1rez_Madrid%E2%80%93Barajas_Airport", 16, ["El Prat"]),

    this.new_airport_object("Munich Airport - Franz Josef Strauß", "Munich", "MUC", 48.353783, 11.786086, "Munich Airport (IATA: MUC) is the international airport of Munich, the capital of Bavaria. It is the second busiest airport in Germany in terms of passenger traffic behind Frankfurt Airport, and the seventh busiest airport in Europe, handling 38.7 million passengers in 2013. It is the world's 14th busiest airport in terms of international passenger traffic, and was the 30th busiest airport worldwide in 2013. Munich Airport serves as the secondary hub for Lufthansa including Lufthansa Regional and its Star Alliance partners besides Frankfurt. The airport is located 28.5 km (17.7 mi) northeast of Munich near the old city of Freising and is named in memory of the former Bavarian Prime minister Franz Josef Strauss. It features two passenger terminals and two runways as well as extensive cargo and maintainance facilities and is fully capable to handle large aircraft such as the Airbus A380.", "http://en.wikipedia.org/wiki/Munich_airport", 16, ["Franz Josef Strauß", "München", "Flughafen München"]),

    this.new_airport_object("Hamburg Airport", "Hamburg", "HAM", 53.631165, 10.003306, "Hamburg Airport (IATA: HAM) is the international airport of Hamburg, the second-largest city in Germany. It is the fifth-busiest of Germany's commercial airports measured by the number of passengers and counted 13,559,370 passengers and 158,076 aircraft movements in 2011. Hamburg Airport serves as a base for Germanwings, Condor, TUIfly and easyJet.", "http://en.wikipedia.org/wiki/Hamburg_Airport", 16, ["Flughafen Hamburg", "keyword"]),    

    this.new_airport_object("Berlin Tegel Airport", "Berlin", "TXL", 52.554255, 13.290875, "Berlin Tegel Airport (IATA: TXL) is the main international airport of Berlin, the federal capital of Germany, ahead of Berlin Schönefeld Airport. It is christened after Otto Lilienthal and the fourth busiest airport in Germany with just over 19.59 million passengers in 2013. Tegel Airport is a hub for Air Berlin, and serves as a base for Germanwings and a focus city for Lufthansa. Tegel Airport is notable for its hexagonal main terminal building around an open square, which makes for walking distances as short as 30 m (98 ft) from the aircraft to the terminal exit. The airport is scheduled to be closed when the new Berlin Brandenburg Airport opens in 2015 or later.", "http://en.wikipedia.org/wiki/Berlin_Tegel_Airport", 16, ["Tegel", "Berlin Tegel", "Otto Lilienthal"]),

    this.new_airport_object("Cologne/Bonn Airport", "Cologne Bonn", "CGN", 50.876828, 7.125743, "Cologne / Bonn Airport (IATA: CGN) is the international airport of Germany's fourth largest city, Cologne and also serves the former German capital Bonn. It is the seventh largest passenger airport in Germany and second largest in terms of cargo operations. It is one of the country's few 24-hour airports and serves as a hub for Germanwings, FedEx Express and UPS Airlines. Close to 9.3 million passengers passed through the airport in 2012. Cologne Bonn Airport also is a host of the German and European space agencies DLR and EAC, part of ESA, which train astronauts there for space explorations.", "http://en.wikipedia.org/wiki/Cologne_Bonn_Airport", 16, ["Bonn", "Cologne", "Konrad Adenauer", "Köln-Wahn"]),

    this.new_airport_object("Düsseldorf Airport", "Duesseldorf", "DUS", 51.278642, 6.765039, "Düsseldorf Airport (IATA: DUS) is the international airport of Düsseldorf, the capital of the German state North Rhine-Westphalia. It is the third largest airport in Germany after Frankfurt Airport and Munich Airport, handling 20.8 million passengers in 2012 and serves as a hub for Air Berlin and Lufthansa including Lufthansa Regional.", "http://en.wikipedia.org/wiki/D%C3%BCsseldorf_Airport", 16, ["Duesseldorf", "Düsseldorf"])


    // this.new_airport_object("name", "city", "iata", latitude, longitude, "description", "wikipedia", 16, ["keyword", "keyword"])
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


// Triviarport.User = function() {
//   this.wrong_attempt_count = 0;
// }

// Triviarport.User.prototype.updateScore = function() {
//   $("#score").text(this.current_score_points.toString());
// }

function AirportriviaUser() {
  this.airport_history = [];
  this.wrong_attempt_count = 0;
  this.current_round_points = 80;  // Why? Because it is we have 14 zoom levels taking 5 seconds each and finally we have 10 seconds in the final stage 
  this.score = 0;


  this.updateRoundPoints = function() {
    $("#score-board-round-points").text(this.current_round_points);
  }
  
  this.updateScore = function() {
    $("#score-board-score").text(this.score);
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

  current_user.current_round_points = 80;
  current_user.updateRoundPoints();
  
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

      if (map.getZoom() >= 6) {
        current_user.current_round_points -= 5;
      } else {
        current_user.current_round_points -= 10;
      }
      current_user.updateRoundPoints();


      // Start a new timer for the next zoom out
      map.zoom_out_thread = new Timer(map.zoom_out, 5000);
    
    } else {
      setTimeout(function() {
        current_user.wrong_attempt_count++;
        showTooLateResolutionModal()  
      }, 10000);
    }
  }

  map.zoom_out_thread = new Timer(map.zoom_out, 6000);

  return map;
}

function prepare_resolution_modal_for(airport) {
  $('.modal-airport-description').each(function() {
    $(this).html(airport.description_text + " " + $('.modal-airport-wikipedia-link')[0].outerHTML);
  });
  
  $('.modal-airport-wikipedia-link').each(function() {
    $(this).attr("href", airport.wikipedia_url);
  });

  $('.modal-airport-google-maps').each(function() {
    $(this).attr("href", "https://maps.google.com/maps?ll={0},{1}&t=k&z={2}".format(airport.latitude, airport.longitude, airport.initial_zoom_level));
  });
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

  $("#helpModal").modal("show");

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
    current_user.updateScore();
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
  map.zoom_out_thread.cancel();

  $("#airport_answer").blur(); // Disable focus from input field to ignore any input
  $("#game-over-modal-final-score").text("{0} Points".format(current_user.score));
  $("#game-over-modal").modal("show");
  $("#airport-answer-form").toggleClass("has-error");
  $("#score-life-{0}".format(current_user.wrong_attempt_count)).toggleClass("losing");
}

function show_negative_resolution_dialog() {

  map.zoom_out_thread.cancel();

  $("#airport_answer").blur(); // Disable focus from input field to ignore any input

  $("#airport-answer-form").toggleClass("has-error");
  $("#resolution-modal-outcome").html("No Points and &mdash;<span class=\"glyphicon glyphicon-heart\" style=\"top: 3px;\"></span>");
  $("#score-life-{0}".format(current_user.wrong_attempt_count)).toggleClass("losing");
  $("#resolutionModalTitle").text(motivationals.get_random());
  $("#resolutionModal").modal("show");

}

function showTooLateResolutionModal() {

  map.zoom_out_thread.cancel();

  $("#airport_answer").blur(); // Disable focus from input field to ignore any input
  $("#airport-answer-form").toggleClass("has-error");
  
  $("#score-life-{0}".format(current_user.wrong_attempt_count)).toggleClass("losing");
  $("#resolution-modal-outcome").html("No Points and &mdash;<span class=\"glyphicon glyphicon-heart\" style=\"top: 3px;\"></span>");
  $("#resolutionModalTitle").text(motivationals.get_random());
  $("#resolutionModal").modal("show");
}

function show_positive_resolution_dialog() {

  map.zoom_out_thread.cancel();

  $("#airport_answer").blur(); // Disable focus from input field to ignore any input
  
  current_user.score += current_user.current_round_points;
  $("#resolution-modal-outcome").text("+{0} Points".format(current_user.current_round_points));
  $("#resolutionModalTitle").text(celebrations.get_random());
  $("#airport-answer-form").toggleClass("has-success");
  $("#resolutionModal").modal("show");

}
