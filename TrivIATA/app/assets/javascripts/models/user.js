var TrivIATA.Models.User = Backbone.Model.extend({

  defaults: {
    airport_history = [];
    score = 0;
    wrong_attempt_count = 0;
    
    // Why? Because it is we have 14 zoom levels taking 5 seconds each and finally we have 10 seconds in the final stage 
    current_round_points = 80; 
  }

});