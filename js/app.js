// (function() {
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

      var nextZoomLevel = map.getZoom() - 1;

      // Skip zoom level 5 and 10 because they cost time without providing more information
      if (nextZoomLevel == 5 || nextZoomLevel == 10) {
        nextZoomLevel--;
      }

      map.setZoom(nextZoomLevel);
      
      if (map.getZoom() == 12) {
        var beachMarker = new google.maps.Marker({
            position: airport_coordinates,
            map: map,
            icon: "images/airport_icon_marker_small.png"
        });
      }

      if (map.getZoom() >= 7) {
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
        current_user.current_round_points = 0; 
        current_user.updateRoundPoints();
        showTooLateResolutionModal()  
      }, 10000);
    }
  }

  map.zoom_out_thread = new Timer(map.zoom_out, 6000);

  return map;
}

function prepare_resolution_modal_for(airport) {

  $("#resolutionModal").removeClass("success");
  $("#resolutionModal").removeClass("error");

  $('.modal-airport-description-short').each(function() {
    $(this).html("{0} (IATA: {1}) in {2}.".format(airport.name, airport.iata_code, airport.city));
  });

  $('.modal-airport-description').each(function() {
    $(this).html(airport.description_text + " " + $('.modal-airport-wikipedia-link')[0].outerHTML);
  });

  $('.modal-airport-description-mobile').each(function() {
    $(this).html("This airport is {0} (IATA: {1}) in {2}. {3}".format(airport.name, airport.iata_code, airport.city, $('.modal-airport-wikipedia-link')[0].outerHTML));
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

  $('#game-over-modal').on('shown.bs.modal', function (e) {
    $("#button-game-over-modal-dismiss").focus();
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
  current_user.current_round_points = 0; 
  current_user.updateRoundPoints();

  if (current_user.wrong_attempt_count < 3) {
    show_negative_resolution_dialog();
    return;
  } 

  show_game_over_dialog();
}


function show_game_over_dialog() {
  map.zoom_out_thread.cancel();

  $("#airport_answer").blur(); // Disable focus from input field to ignore any input
  $("#game-over-modal-final-score").text("{0} Points".format(current_user.score));
  $("#game-over-modal").addClass("error");
  $("#game-over-modal").modal("show");
  $("#airport-answer-form").toggleClass("has-error");
  $("#score-life-{0}".format(current_user.wrong_attempt_count)).toggleClass("losing");
}

var motivationals = Array("Off by one!", "Too bad!", "Keep working on it!", "Not this time!", "You can do better!");
function show_negative_resolution_dialog() {

  map.zoom_out_thread.cancel();
  $("#airport_answer").blur(); // Disable focus from input field to ignore any input

  $("#airport-answer-form").toggleClass("has-error");
  $("#resolution-modal-outcome").html("No Points and &mdash;<span class=\"glyphicon glyphicon-heart\" style=\"top: 3px;\"></span>");
  $("#score-life-{0}".format(current_user.wrong_attempt_count)).toggleClass("losing");
  $("#resolutionModalTitle").text(motivationals.get_random());
  $("#resolutionModal").addClass("error");
  $("#resolutionModal").modal("show");

}

function showTooLateResolutionModal() {

  map.zoom_out_thread.cancel();

  $("#airport_answer").blur(); // Disable focus from input field to ignore any input
  $("#airport-answer-form").toggleClass("has-error");
  
  $("#score-life-{0}".format(current_user.wrong_attempt_count)).toggleClass("losing");
  $("#resolution-modal-outcome").html("No Points and &mdash;<span class=\"glyphicon glyphicon-heart\" style=\"top: 3px;\"></span>");
  $("#resolutionModalTitle").text(motivationals.get_random());
  $("#resolutionModal").addClass("error");
  $("#resolutionModal").modal("show");
}

var celebrations = Array("Nice done!", "Good job!", "Outstanding!", "Spectacular!", "Great!", "Awesome!");
function show_positive_resolution_dialog() {

  map.zoom_out_thread.cancel();

  $("#airport_answer").blur(); // Disable focus from input field to ignore any input
  
  current_user.score += current_user.current_round_points;
  $("#resolution-modal-outcome").text("+{0} Points".format(current_user.current_round_points));
  $("#resolutionModalTitle").text(celebrations.get_random());
  $("#airport-answer-form").toggleClass("has-success");
  $("#resolutionModal").addClass("success");
  $("#resolutionModal").modal("show");

}

// })