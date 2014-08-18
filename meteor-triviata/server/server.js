Meteor.methods({

  random_airport: function() {
    var array = Airports.find().fetch();
    var randomIndex = Math.floor( Math.random() * array.length );
    return array[randomIndex];
  }

});


// What to do when the server first starts up
Meteor.startup(function () {

  function new_airport_object(name, city, iata, latitude, longitude, description_text, wikipedia_url, zoom_start_level, optional_keywords) {
    return {
      name: name, city: city, iata_code: iata,
      latitude: latitude, longitude: longitude,
      description_text: description_text, wikipedia_url: wikipedia_url,
      initial_zoom_level: zoom_start_level, optional_keywords: optional_keywords || []
    };    
  };

  if (Airports.find().count() === 0) {
    
    Airports.insert(new_airport_object("San Francisco International", "San Francisco", "SFO", 37.618972, -122.374889, "San Francisco International Airport (IATA: SFO) is an international airport located 13 miles (21 km) south of downtown San Francisco, California, USA.", "http://en.wikipedia.org/wiki/SFO", 16));

    Airports.insert(new_airport_object("Haneda Airport", "Tokyo", "HND", 35.548691, 139.783727, "Tokyo International Airport (東京国際空港 Tōkyō Kokusai Kūkō?), commonly known as Haneda Airport (羽田空港 Haneda Kūkō) or Tokyo Haneda Airport (IATA: HND), is one of the two primary airports that serve the Greater Tokyo Area. It is the primary base of Japan's two major domestic airlines, Japan Airlines (Terminal 1) and All Nippon Airways (Terminal 2).", "http://en.wikipedia.org/wiki/Haneda_Airport", 16, ["Haneda", "Tokyo Haneda"]));

    Airports.insert(new_airport_object("London Heathrow Airport", "London", "LHR", 51.470531, -0.462076, "London Heathrow Airport or Heathrow (IATA: LHR) is a major international airport serving London, England, known as London Airport from 1946 until 1965. Heathrow is the busiest airport in the United Kingdom and the fifth busiest airport in the world (as of 2014) in total passenger traffic, handling more international passengers than any other airport around the globe.", "http://en.wikipedia.org/wiki/London_Heathrow_Airport", 16, ["London Heathrow", "Heathrow"]));

    Airports.insert(new_airport_object("Los Angeles International Airport", "Los Angeles", "LAX", 33.942536, -118.408075, "Los Angeles International Airport (IATA: LAX) is the primary airport serving the Greater Los Angeles Area, the second-most populated metropolitan area in the United States. It is most often referred to by its IATA airport code LAX, with the letters pronounced individually.", "http://en.wikipedia.org/wiki/Los_Angeles_International_Airport", 16, ["LAX"]));

    Airports.insert(new_airport_object("O'Hare International Airport", "Chicago", "ORD", 41.978603, -87.904842, "Chicago O'Hare International Airport (IATA: ORD), also known as O'Hare Airport, O'Hare Field, Chicago International Airport, or simply O'Hare, is a major airport located in the northwestern-most corner of Chicago, Illinois, USA.", "http://en.wikipedia.org/wiki/O%27Hare_International_Airport", 16, ["O'Hare", "O Hare", "O'Hare Field"]));

    Airports.insert(new_airport_object("Hong Kong International Airport", "Hong Kong", "HKG", 22.313277, 113.928001, "Hong Kong International Airport (IATA: HKG) is the main airport in Hong Kong located on the island of Chek Lap Kok, which largely comprises land reclaimed for the construction of the airport itself. The airport is also colloquially known as Chek Lap Kok Airport (赤鱲角機場), to distinguish it from its predecessor, the closed Kai Tak Airport (啟德機場).", "http://en.wikipedia.org/wiki/Hong_Kong_International_Airport", 16, ["Chek Lap Kok"]));

    Airports.insert(new_airport_object("Dubai International Airport", "Dubai", "DXB", 25.252778, 55.364444, "Dubai International Airport (IATA: DXB) (Arabic: مطار دبي الدولي‎) is an international airport serving Dubai. The airport is a major airline hub in the Middle East, is operated by the Dubai Airports Company and is the home base of Dubai's international airline, Emirates,", "http://en.wikipedia.org/wiki/Dubai_International_Airport", 16));

    Airports.insert(new_airport_object("Dallas/Fort Worth International Airport", "Dallas", "DFW", 32.897678, -97.040484, "Dallas/Fort Worth International Airport (IATA: DFW) is the primary international airport serving the Dallas-Fort Worth metroplex in Texas, USA. It is the largest hub for American Airlines.", "http://en.wikipedia.org/wiki/Dallas-Fort_Worth_International_Airport", 16, ["Fort Worth", "Dallas Fort Worth"]));

    Airports.insert(new_airport_object("Charles de Gaulle Airport", "Paris", "CDG", 49.003913, 2.571763, "Paris Charles de Gaulle Airport (IATA: CDG), also known as Roissy Airport (or just Roissy in French), is one of the world's principal aviation centres, as well as France's largest airport.", "http://en.wikipedia.org/wiki/Charles_de_Gaulle_Airport", 16, ["Charles de Gaulle", "Roissy Airport", "Roissy"]));

    Airports.insert(new_airport_object("Frankfurt Airport", "Frankfurt", "FRA", 50.047715, 8.573664, "Frankfurt Airport (IATA: FRA) is a major international airport located in Frankfurt, the fifth-largest city of Germany and one of the world's leading financial centers. It is operated by Fraport and serves as the main hub for Lufthansa.", "http://en.wikipedia.org/wiki/Frankfurt_Airport", 16, ["Flughafen Frankfurt am Main", "Rhein-Main-Flughafen"]));
  }
});



