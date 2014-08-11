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

    this.new_airport_object("Hong Kong International Airport", "Hong Kong", "HKG", 22.313277, 113.928001, "Hong Kong International Airport (IATA: HKG) is the main airport in Hong Kong located on the island of Chek Lap Kok, which largely comprises land reclaimed for the construction of the airport itself. The airport is also colloquially known as Chek Lap Kok Airport (赤鱲角機場), to distinguish it from its predecessor, the closed Kai Tak Airport (啟德機場).", "http://en.wikipedia.org/wiki/Hong_Kong_International_Airport", 16, ["Chek Lap Kok"]),

    this.new_airport_object("Dubai International Airport", "Dubai", "DXB", 25.252778, 55.364444, "Dubai International Airport (IATA: DXB) (Arabic: مطار دبي الدولي‎) is an international airport serving Dubai. The airport is a major airline hub in the Middle East, is operated by the Dubai Airports Company and is the home base of Dubai's international airline, Emirates,", "http://en.wikipedia.org/wiki/Dubai_International_Airport", 16),

    this.new_airport_object("Dallas/Fort Worth International Airport", "Dallas", "DFW", 32.897678, -97.040484, "Dallas/Fort Worth International Airport (IATA: DFW) is the primary international airport serving the Dallas-Fort Worth metroplex in Texas, USA. It is the largest hub for American Airlines.", "http://en.wikipedia.org/wiki/Dallas-Fort_Worth_International_Airport", 16, ["Fort Worth", "Dallas Fort Worth"]),

    this.new_airport_object("Charles de Gaulle Airport", "Paris", "CDG", 49.003913, 2.571763, "Paris Charles de Gaulle Airport (IATA: CDG), also known as Roissy Airport (or just Roissy in French), is one of the world's principal aviation centres, as well as France's largest airport.", "http://en.wikipedia.org/wiki/Charles_de_Gaulle_Airport", 16, ["Charles de Gaulle", "Roissy Airport", "Roissy"]),

    this.new_airport_object("Frankfurt Airport", "Frankfurt", "FRA", 50.047715, 8.573664, "Frankfurt Airport (IATA: FRA) is a major international airport located in Frankfurt, the fifth-largest city of Germany and one of the world's leading financial centers. It is operated by Fraport and serves as the main hub for Lufthansa.", "http://en.wikipedia.org/wiki/Frankfurt_Airport", 16, ["Flughafen Frankfurt am Main", "Rhein-Main-Flughafen"]),

    this.new_airport_object("Hartsfield–Jackson Atlanta International Airport", "Atlanta", "ATL", 33.640669, -84.425389, "Hartsfield–Jackson Atlanta International Airport (IATA: ATL), known locally as Atlanta Airport, Hartsfield, or Hartsfield–Jackson, is located seven miles (11 km) south of the central business district of Atlanta, Georgia, USA. It has been the world's busiest airport by passenger traffic since 1998, and by number of landings and take-offs since 2005. Hartsfield–Jackson held its ranking as the world's busiest airport in 2012 by accommodating 95 million passengers (more than 260,000 passengers daily) and 950,119 flights. Many of the nearly one million flights are domestic flights from within the United States, where Atlanta serves as a major hub for travel throughout the Southeastern United States. The airport has 207 domestic and international gates.", "http://en.wikipedia.org/wiki/Hartsfield%E2%80%93Jackson_Atlanta_International_Airport", 16, ["Atlanta Airport", "Hartsfield", "Hartsfield–Jackson", "Hartsfield–Jackson Atlanta"]),
    
    this.new_airport_object("Beijing Capital International Airport", "Beijing", "PEK", 40.075674, 116.606158, "Beijing Capital International Airport (IATA: PEK) is the main international airport serving Beijing. It is located 32 km (20 mi) northeast of Beijing's city center. The airport is owned and operated by the Beijing Capital International Airport Company Limited, a state-controlled company. The airport's IATA Airport code, PEK, is based on the city's former romanized name, Peking.", "http://en.wikipedia.org/wiki/Beijing_Capital_International_Airport", 16, ["Beijing Capital", "Peking"]),

    this.new_airport_object("Pyongyang Sunan International Airport", "Pyongyang", "FNJ", 39.201631, 125.674836, "Pyongyang Sunan International Airport (IATA: FNJ) is the main airport serving Pyongyang, capital of the Democratic People's Republic of Korea (North Korea). It is located in the city's Sunan-guyŏk district, 24 kilometres (15 mi) from the city's centre.", "http://en.wikipedia.org/wiki/Pyongyang_Sunan_International_Airport", 16, ["Pyongyang Sunan", "Pyongyang International"]),

    this.new_airport_object("Gibraltar International Airport", "Gibraltar", "GIB", 36.151219, -5.349664, "Gibraltar International Airport or North Front Airport (IATA: GIB) is the civilian airport that serves the British overseas territory of Gibraltar. The runway is owned by the Ministry of Defence for use by the Royal Air Force as RAF Gibraltar. The History Channel programme Most Extreme Airports ranked the airport the fifth most extreme airport in the world.", "http://en.wikipedia.org/wiki/Gibraltar_International_Airport", 16, ["North Front"]),

    this.new_airport_object("Tenzing-Hillary Airport", "Lukla", "LUA", 27.687778, 86.731389, "Tenzing-Hillary Airport (IATA: LUA), also known as Lukla Airport, is a small airport in the town of Lukla, in eastern Nepal. A program titled Most Extreme Airports, broadcast on The History Channel in 2010, rated the airport as the most dangerous airport in the world. In January 2008 the airport was renamed in honor of Sir Edmund Hillary and Sherpa Tenzing Norgay, the first people to reach the summit of Mount Everest and also to mark their efforts in the construction of this airport. The airport is popular because Lukla is the place where most people start the climb to Mount Everest Base Camp.", "http://en.wikipedia.org/wiki/Tenzing-Hillary_Airport", 16, ["Tenzing-Hillary"]),

    this.new_airport_object("Saint Barthelemy Airport", "Gustavia", "iata", 17.904425, -62.846112, "Gustaf III Airport (IATA: SBH), also known as Saint Barthélemy Airport, sometimes as St. Jean Airport, is a public use airport located in the village of St. Jean on the Caribbean island of Saint Barthélemy. Both the airport and the island's main town of Gustavia are named for King Gustav III of Sweden, under whom Sweden obtained the island from France in 1784 (it was sold back to France in 1878).", "http://en.wikipedia.org/wiki/Gustaf_III_Airport", 16, ["St. Barthelemy", "Saint Barthelemy", "St. Jean", "Saint Jean", "Gustaf III"]),

    this.new_airport_object("Helgoland-Düne Airport", "Helgoland", "HGL", 54.1853, 7.91583, "Heligoland Airport (IATA: HGL) is a small airport on the German island of Düne, the smaller of the two isles of the Heligoland archipelago in the North Sea, about 70 kilometres (43 mi) from the mainland.", "http://en.wikipedia.org/wiki/Helgoland_Airport", 16, ["Helgoland", "Düne"]),

    this.new_airport_object("Adolfo Suárez Madrid–Barajas Airport", "Madrid", "MAD", 40.493556, -3.566764, "Adolfo Suárez Madrid–Barajas Airport (Spanish: Aeropuerto Adolfo Suárez Madrid-Barajas (IATA: MAD) is the main international airport serving Madrid in Spain. In 2011 and 2010, over 49 million passengers used Madrid–Barajas, making it the country's largest and busiest airport, and in 2013 it was Europe's sixth busiest airport. Located within the city limits of Madrid, just 9 km (5.6 mi) from the city's financial district and 13 km (8.1 mi) northeast of the Puerta del Sol, Madrid's historic centre. The airport name derives from the adjacent district of Barajas, which has its own metro station on the same rail line serving the airport.", "http://en.wikipedia.org/wiki/Adolfo_Su%C3%A1rez_Madrid%E2%80%93Barajas_Airport", 16, ["Barajas", "Madrid Barajas", "Adolfo Suárez Madrid", "Adolfo Suárez"]),

    this.new_airport_object("Barcelona – El Prat Airport", "Barcelona", "BCN", 41.290351, 2.078344, "Barcelona – El Prat Airport (IATA: BCN), simply known as Barcelona Airport, is located 12 km (7.5 mi) southwest of the centre of Barcelona, Catalonia, Spain, lying in the municipalities of El Prat de Llobregat, Viladecans, and Sant Boi. The airport is the second largest in Spain behind Madrid Barajas Airport and 31st busiest in the world, and is the main airport of Catalonia. It is a main base for Vueling, a hub for Iberia Regional and low-cost giant Ryanair as well as a focus city for Air Europa. The Barcelona–Madrid air shuttle service, known as the \"Puente Aéreo\", was the world's busiest route until 2008, with the highest number of flight operations (971 per week) in 2007. The schedule has been reduced since February 2008, when a Madrid–Barcelona high-speed rail line was opened, covering the distance in 2 hours 30 minutes, and quickly became popular.", "http://en.wikipedia.org/wiki/Adolfo_Su%C3%A1rez_Madrid%E2%80%93Barajas_Airport", 16, ["El Prat"]),

    this.new_airport_object("Munich Airport - Franz Josef Strauß", "Munich", "MUC", 48.353783, 11.786086, "Munich Airport (IATA: MUC) is the international airport of Munich, the capital of Bavaria. It is the second busiest airport in Germany in terms of passenger traffic behind Frankfurt Airport, and the seventh busiest airport in Europe, handling 38.7 million passengers in 2013. It is the world's 14th busiest airport in terms of international passenger traffic, and was the 30th busiest airport worldwide in 2013. Munich Airport serves as the secondary hub for Lufthansa including Lufthansa Regional and its Star Alliance partners besides Frankfurt. The airport is located 28.5 km (17.7 mi) northeast of Munich near the old city of Freising and is named in memory of the former Bavarian Prime minister Franz Josef Strauss. It features two passenger terminals and two runways as well as extensive cargo and maintainance facilities and is fully capable to handle large aircraft such as the Airbus A380.", "http://en.wikipedia.org/wiki/Munich_airport", 16, ["Franz Josef Strauß", "München", "Flughafen München", "Franz Josef Strauss"]),

    this.new_airport_object("Hamburg Airport", "Hamburg", "HAM", 53.631165, 10.003306, "Hamburg Airport (IATA: HAM) is the international airport of Hamburg, the second-largest city in Germany. It is the fifth-busiest of Germany's commercial airports measured by the number of passengers and counted 13,559,370 passengers and 158,076 aircraft movements in 2011. Hamburg Airport serves as a base for Germanwings, Condor, TUIfly and easyJet.", "http://en.wikipedia.org/wiki/Hamburg_Airport", 16, ["Flughafen Hamburg"]),    

    this.new_airport_object("Berlin Tegel Airport", "Berlin", "TXL", 52.554255, 13.290875, "Berlin Tegel Airport (IATA: TXL) is the main international airport of Berlin, the federal capital of Germany, ahead of Berlin Schönefeld Airport. It is christened after Otto Lilienthal and the fourth busiest airport in Germany with just over 19.59 million passengers in 2013. Tegel Airport is a hub for Air Berlin, and serves as a base for Germanwings and a focus city for Lufthansa. Tegel Airport is notable for its hexagonal main terminal building around an open square, which makes for walking distances as short as 30 m (98 ft) from the aircraft to the terminal exit. The airport is scheduled to be closed when the new Berlin Brandenburg Airport opens in 2015 or later.", "http://en.wikipedia.org/wiki/Berlin_Tegel_Airport", 16, ["Tegel", "Berlin Tegel", "Otto Lilienthal"]),

    this.new_airport_object("Cologne/Bonn Airport", "Cologne Bonn", "CGN", 50.876828, 7.125743, "Cologne / Bonn Airport (IATA: CGN) is the international airport of Germany's fourth largest city, Cologne and also serves the former German capital Bonn. It is the seventh largest passenger airport in Germany and second largest in terms of cargo operations. It is one of the country's few 24-hour airports and serves as a hub for Germanwings, FedEx Express and UPS Airlines. Close to 9.3 million passengers passed through the airport in 2012. Cologne Bonn Airport also is a host of the German and European space agencies DLR and EAC, part of ESA, which train astronauts there for space explorations.", "http://en.wikipedia.org/wiki/Cologne_Bonn_Airport", 16, ["Bonn", "Cologne", "Konrad Adenauer", "Köln Wahn"]),

    this.new_airport_object("Juancho E. Yrausquin Airport", "Saba", "SAB", 17.645278, -63.220556, "Juancho E. Yrausquin Airport (IATA: SAB) is the only airport on the Caribbean island of Saba. The airport has the shortest commercial runway in the world, only 396 meters (1,299 ft) long, flanked on one side by high hills, with cliffs that drop into the sea at both ends. Although the airport is closed to jet traffic, regional airline propeller aircraft are able to land there under waivers from The Netherlands Antilles' Civil Aviation Authority. The most common aircraft to land there are the Twin Otter and BN-2 Islander.", "http://en.wikipedia.org/wiki/Juancho_E._Yrausquin_Airport", 16, ["Juancho Yrausquin", "Yrausquin"]),
    
    this.new_airport_object("Princess Juliana International Airport", "Philipsburg", "SXM", 18.041258, -63.112841, "Princess Juliana International Airport (IATA: SXM) (also known as Sint Maarten International Airport) serves the Dutch part of the island of Saint Martin. The airport is the major gateway for the smaller Leeward Islands, including Anguilla, Saba, St. Barthélemy and St. Eustatius. It is named after Juliana of the Netherlands, who as crown princess landed here in 1944, the year after the airport opened. The airport is perhaps best known for very low-altitude flyover landing approaches due to one end of its runway being extremely close to the shore and Maho Beach.", "http://en.wikipedia.org/wiki/Princess_Juliana_International_Airport", 16, ["Saint Martin", "St Martin", "Princess Juliana", "Sint Maarten", "St Maarten"]),

    this.new_airport_object("Düsseldorf Airport", "Duesseldorf", "DUS", 51.278642, 6.765039, "Düsseldorf Airport (IATA: DUS) is the international airport of Düsseldorf, the capital of the German state North Rhine-Westphalia. It is the third largest airport in Germany after Frankfurt Airport and Munich Airport, handling 20.8 million passengers in 2012 and serves as a hub for Air Berlin and Lufthansa including Lufthansa Regional.", "http://en.wikipedia.org/wiki/D%C3%BCsseldorf_Airport", 16, ["Duesseldorf", "Düsseldorf"]),

    this.new_airport_object("John F. Kennedy International Airport", "New York", "JFK", 40.643714, -73.781712, "John F. Kennedy International Airport (IATA: JFK) is a major airport in the borough of Queens in New York City, owned by the City of New York and operated by the Port Authority of New York and New Jersey under a long-term operating lease. It is about 12 miles (19 km) southeast of Lower Manhattan. It is the busiest international air passenger gateway in the United States, handling more international traffic than any other airport in North America. It is also the third-leading freight gateway to the country by value of shipments. In 2013, the airport handled 50,423,765 passengers, making it the 19th-busiest airport in the world and sixth-busiest in the United States by passenger traffic. Together, JFK International, LaGuardia, and Newark Liberty airports, all operated by the Port Authority of New York and New Jersey, are the largest airport system in the United States, second in the world in terms of passenger traffic, and first in the world by total flight operations.", "http://en.wikipedia.org/wiki/John_F._Kennedy_International_Airport", 16, ["John Kennedy", "John F Kennedy", "John F. Kennedy"]),

    this.new_airport_object("LaGuardia Airport", "New York", "LGA", 40.775293, -73.872253, "LaGuardia Airport (IATA: LGA) is an airport in the northern part of the New York City borough of Queens. The airport is on the waterfront of Flushing Bay and Bowery Bay, in East Elmhurst and borders the neighborhoods of East Elmhurst, Astoria, and Jackson Heights.", "http://en.wikipedia.org/wiki/LaGuardia_Airport", 16, ["La Guardia", "North Beach"]),

    this.new_airport_object("Newark Liberty International Airport", "New Jersey", "EWR", 40.689319, -74.174591, "Newark Liberty International Airport (IATA: EWR), originally named Newark Metropolitan Airport and later Newark International Airport, is an international airport which straddles the municipal boundary between Newark and Elizabeth, New Jersey. The airport is owned by the city of Newark and operated by the Port Authority of New York and New Jersey. It is about 15 miles (24 km) southwest of Midtown Manhattan (New York City).", "http://en.wikipedia.org/wiki/Newark_Liberty_International_Airport", 16, ["Newark International", "Newark Metropolitan", "Newark Liberty", "Newark Liberty International", "Newark"]),
    
    this.new_airport_object("General Edward Lawrence Logan International Airport", "Boston", "BOS", 42.366915, -71.013436, "General Edward Lawrence Logan International Airport (IATA: BOS) is an international airport located in the East Boston neighborhood of Boston, Massachusetts. The largest airport in New England, as of 2010, Logan is the 19th busiest airport in the United States, with about 13.5 million boardings a year and over 29.3 million passengers overall in 2012. Logan had 30.2 million passengers overall, in 2013, and it is estimated that as many as 33 million passengers will fly through the airport in 2014.", "http://en.wikipedia.org/wiki/Boston_Logan", 16, ["General Edward Lawrence Logan", "Boston Logan", "Logan International", "Boston International"]),

    this.new_airport_object("Seattle–Tacoma International Airport", "Seattle", "SEA", 47.443269, -122.304257, "The Seattle–Tacoma International Airport (IATA: SEA), also known as Sea–Tac Airport or Sea–Tac, has service to destinations throughout North America, Europe, the Middle East, and East Asia. It is the primary hub for Alaska Airlines, whose headquarters is located near the airport, as well as its regional subsidiary Horizon Air. It is also a hub and international gateway to Asia and Europe for Delta Air Lines, which has significantly enlarged its presence at Sea-Tac since 2011.", "http://en.wikipedia.org/wiki/Seattle–Tacoma_International_Airport", 16, ["Seattle Tacoma", "Tacoma International"]),

    this.new_airport_object("Rio de Janeiro/Galeão–Antonio Carlos Jobim International Airport", "Rio de Janeiro", "GIG", -22.812827, -43.249172, "Rio de Janeiro/Galeão–Antonio Carlos Jobim International Airport (IATA: GIG), popularly known by its original name Galeão International Airport, is the main airport serving Rio de Janeiro, Brazil. It is named after Praia do Galeão (Galleon Beach), located in front of the original passenger terminal (the present passenger terminal of the Brazilian Air Force) and where in 1663 the galleon Padre Eterno was built; and since January 5, 1999 also after the Brazilian musician Antonio Carlos Brasileiro de Almeida Jobim. Galeão Airport is explicitly mentioned in his composition \"Samba do avião.\"", "http://en.wikipedia.org/wiki/Rio_de_Janeiro-Galeão_International_Airport", 16, ["Galeao International", "Galeão International"]),

    this.new_airport_object("Santos Dumont Airport", "Rio de Janeiro", "SDU", -22.912102, -43.165551, "Santos Dumont Airport (IATA: SDU) is the second major airport serving Rio de Janeiro, Brazil. It is named after the Brazilian aviation pioneer Alberto Santos Dumont (1873–1932). Santos Dumont has slot restrictions operating with a maximum of 19 operations/hour, being one of the three airports with such restrictions in Brazil.", "http://en.wikipedia.org/wiki/Santos_Dumont_Airport", 16, ["Santos Dumont", "Dumont"]),

    this.new_airport_object("São Paulo / Guarulhos–Governador André Franco Montoro International Airport", "Sao Paulo", "GRU", -23.428008, -46.478691, "São Paulo/Guarulhos–Governador André Franco Montoro International Airport (IATA: GRU), popularly known locally as Cumbica Airport after the district where it is located and the Brazilian Air Force base that still exists at the airport complex, is the main airport serving São Paulo, Brazil. It is located in the municipality of Guarulhos in Greater São Paulo. Since November 28, 2001 the airport has been named after André Franco Montoro (1916–1999), former Governor of São Paulo state. The airport was rebranded as GRU Airport in 2012.", "http://en.wikipedia.org/wiki/São_Paulo-Guarulhos_International_Airport", 16, ["Cumbica", "André Franco Montoro", "Guarulhos", "Governador André Franco", "Governador André Franco Montoro"]),

    this.new_airport_object("Amsterdam Airport Schiphol", "Amsterdam", "AMS", 52.311024, 4.7668, "Amsterdam Airport Schiphol (IATA: AMS) is the main international airport of the Netherlands, located 20 minutes southwest of Amsterdam, in the municipality of Haarlemmermeer. It is the fourth busiest airport in Europe in terms of passengers. Schiphol is the primary hub for KLM and its regional affiliate KLM Cityhopper as well as for Arkefly, Corendon Dutch Airlines, Martinair and Transavia.com. The airport also serves as a European hub for Delta Air Lines and as a base for Vueling.", "http://en.wikipedia.org/wiki/Amsterdam_Airport_Schiphol", 16, ["Luchthaven Schiphol", "Amsterdam Airport Schiphol"]),

    this.new_airport_object("Honolulu International Airport", "Honolulu", "HNL", 21.328796, -157.920399, "Honolulu International Airport (IATA: HNL) is the principal aviation gateway of the City & County of Honolulu and the State of Hawaii and is identified as one of the busiest airports in the United States, with traffic now exceeding 21 million passengers a year and rising.", "http://en.wikipedia.org/wiki/Honolulu_International_Airport", 16, ["Honolulu International"]),

    this.new_airport_object("Shanghai Pudong International Airport", "Shanghai", "PVG", 31.152295, 121.801665, "Shanghai Pudong International Airport (IATA: PVG) is the primary international airport serving Shanghai, and a major aviation hub for Asia. The city's other major airport, Hongqiao, mainly serves domestic flights. The airport is the main hub for China Eastern Airlines and Shanghai Airlines, and a major international hub for Air China. It is also the hub for privately owned Juneyao Airlines and Spring Airlines, and an Asian-Pacific cargo hub for UPS and DHL. The DHL hub, opened in July 2012, is said to be the biggest express hub in Asia.", "http://en.wikipedia.org/wiki/Shanghai_Pudong_International_Airport", 16, ["Pudong", "Shanghai Pudong", "Shanghai International"]),

    this.new_airport_object("Incheon International Airport", "Seoul", "ICN", 37.452104, 126.448131, "Incheon International Airport (IATA: ICN) is the largest airport in South Korea, the primary airport serving the Seoul National Capital Area, and one of the largest and busiest airports in the world. For nine years in a row (2005-present), it was rated the best airport worldwide by Airports Council International. The airport has a golf course, spa, private sleeping rooms, ice skating rink, a casino, indoor gardens and a Museum of Korean Culture. Airport authorities claim that average departure and arrival takes only 19 minutes and 12 minutes respectively, significantly lower than the rest of the world, making it one of the fastest airports in the world for customs processing. Its duty-free shopping mall has been rated the world's best for three years in a row in 2013 by Business Traveller.", "http://en.wikipedia.org/wiki/Incheon_International_Airport", 16, ["Incheon", "Seoul Incheon", "Seoul International"]),

    this.new_airport_object("Singapore Changi International Airport", "Singapore", "SIN", 1.355623, 103.987741, "Singapore Changi Airport (IATA: SIN), Changi International Airport, or simply Changi Airport, is the main airport in Singapore. The airport, operated by the Changi Airport Group, is the home base of Singapore Airlines, Singapore Airlines Cargo, SilkAir, AirAsia, Scoot, Tigerair, Jetstar Asia Airways, and Valuair. As of May 2013, Changi Airport serves more than 100 airlines operating 6,400 weekly flights connecting Singapore to over 250 cities in about 60 countries and territories worldwide. Until 30 March 2013, the airport served as a secondary hub for Qantas, which used Singapore as the main stopover point for flights on the Kangaroo Route between Australia and Europe.", "http://en.wikipedia.org/wiki/Changi_International_Airport", 16, ["Changi Airport", "Changi International", "Changi"]),
    
    this.new_airport_object("Sydney (Kingsford Smith) Airport", "Sydney", "SYD", -33.93356, 151.175351, "Sydney (Kingsford Smith) Airport (also known as Kingsford-Smith Airport and Sydney Airport; IATA: SYD) is an international airport located 8 km (5 mi) south of the city centre, in the suburb of Mascot in Sydney. It is the only major airport serving Sydney, and is a primary hub for Qantas, as well as a secondary hub for Virgin Australia and Jetstar Airways. Situated next to Botany Bay, the airport has three runways, colloquially known as the \"east–west\", \"north–south\" and \"third\" runways.", "http://en.wikipedia.org/wiki/Sydney_Airport", 16, ["Kingsford Smith", "Kingsford-Smith Airport"]),

    this.new_airport_object("Canberra International Airport", "Canberra", "CBR", -35.306353, 149.191525, "Canberra International Airport (IATA: CBR), now trading as Canberra Airport, is the airport serving Australia's capital city, Canberra, and the city of Queanbeyan, NSW. Located at the eastern edge of North Canberra, it is the 8th busiest airport in Australia. Although the airport is designated by the Australian Government as an \"Designated International Airport\" there are no current scheduled international flights, only ad hoc and charter flights operate. Air Pacific briefly offered a service to Fiji for six months in 2004. Canberra Airport is managed and operated by the Canberra Airport Group Pty Ltd. The airport serves flights to the main capital cities of Australia and to Newcastle and the Gold Coast.", "http://en.wikipedia.org/wiki/Canberra_airport", 16, ["Canberra International "]),

    this.new_airport_object("Melbourne Airport", "Melbourne", "MEL", -37.666939, 144.844158, "Melbourne Airport (IATA: MEL), also known as Tullamarine Airport, is the primary airport serving the city of Melbourne, and the second busiest airport in Australia. It was opened in 1970 to replace the nearby Essendon Airport. Melbourne Airport is the sole international airport of the four airports serving the Melbourne metropolitan area. The Melbourne–Sydney air route is the third most-travelled passenger air route in the world and the third busiest in the Asia Pacific region.", "http://en.wikipedia.org/wiki/Melbourne_Airport", 16, ["Tullamarine"]),

    this.new_airport_object("Zurich Airport", "Zurich", "ZRH", 47.454631, 8.555474, "Zurich Airport (German: Flughafen Zürich, IATA: ZRH), also known as Zurich Kloten Airport, is the largest international airport of Switzerland and the principal hub of Swiss International Air Lines. It serves Zürich, Switzerland's largest city, and, with its surface transport links, much of the rest of the country.", "http://en.wikipedia.org/wiki/ZRH", 16, ["Flughafen Zürich", "Zürich",  "Zurich Kloten"]),

    this.new_airport_object("Gatwick Airport", "London", "LGW", 51.155797, -0.173979, "Gatwick Airport (IATA: LGW) is 2.7 nautical miles (5.0 km; 3.1 mi) north of the centre of Crawley, West Sussex, and 29.5 miles (47.5 km) south of Central London. Also known as London Gatwick, it is London's second-largest international airport and the second-busiest (by total passenger traffic) in the United Kingdom (after Heathrow). Gatwick is Europe's leading airport for point-to-point flights and has the world's busiest single-use runway, with a maximum of 55 aircraft movements per hour.", "http://en.wikipedia.org/wiki/Gatwick", 16, ["London Gatwick", "Gatwick"]),

    this.new_airport_object("Copenhagen Airport ", "Copenhagen", "CPH", 55.626033,12.648203, "Copenhagen Airport (Danish: Københavns Lufthavn; IATA: CPH) is the main international airport serving Copenhagen, Denmark and a large part of southern Sweden. It is the largest airport in the Nordic countries with 24.1 million passengers per year in 2013 and one of the oldest international airports in Europe.", "http://en.wikipedia.org/wiki/Copenhagen_Airport", 16, ["Københavns Lufthavn", "Kastrup", "Kopenhagen"]),

    this.new_airport_object("Suvarnabhumi Airport", "Bangkok", "BKK", 13.690814, 100.750079, "Suvarnabhumi Airport (IATA: BKK), also known as (New) Bangkok International Airport, is one of two international airports serving Bangkok, Thailand. Suvarnabhumi was officially opened for limited domestic flight service on 15 September 2006, and opened for most domestic and all international commercial flights on 28 September 2006. The airport is currently the main hub for Thai Airways International, Bangkok Airways and Orient Thai Airlines. It also serves as regional gateway and connecting point for various foreign carriers.", "http://en.wikipedia.org/wiki/Suvarnabhumi_Airport", 16, ["Suvarnabhumi", "Bangkok International", "New Bangkok International"]),

    this.new_airport_object("Soekarno–Hatta International Airport", "Jakarta", "CGK", -6.126239, 106.65448, "Soekarno–Hatta International Airport (Indonesian: Bandar Udara Internasional Soekarno–Hatta) (IATA: CGK), abbreviated SHIA, is the main airport serving the greater Jakarta area on the island of Java, Indonesia, along with Halim Perdanakusuma Airport. The airport is named after the first president of Indonesia, Soekarno, and the first vice-president, Mohammad Hatta. The airport's IATA code, CGK, originates from Cengkareng, a district northwest of the city, and it is often called Cengkareng Airport by Indonesians, although the airport is administratively located within Tangerang.", "http://en.wikipedia.org/wiki/Soekarno–Hatta_International_Airport", 16, ["Cengkareng", "Soekarno Hatta"]),

    this.new_airport_object("O. R. Tambo International Airport", "Johannesburg", "JNB", -26.131687, 28.235496, "O. R. Tambo International Airport (IATA: JNB) is a major airport in Kempton Park, Ekurhuleni, Gauteng, South Africa, near the city of Johannesburg. It serves as the primary airport for domestic and international travel to / from South Africa and is Africa's busiest airport with a capacity to handle up to 28 million passengers annually. The airport is the hub of South Africa's largest international and domestic carrier, South African Airways (SAA), and a number of smaller local airlines.", "http://en.wikipedia.org/wiki/O._R._Tambo_International_Airport", 16, ["Tambo", "Oliver Tambo"]),

    this.new_airport_object("Comodoro Arturo Merino Benítez International Airport", "Santiago de Chile", "SCL", -33.394956, -70.794117, "Comodoro Arturo Merino Benítez International Airport (IATA: SCL), also known as Santiago International Airport and Pudahuel Airport, located in Pudahuel, 15 km (9.3 mi) north-west of downtown Santiago, is Chile's largest aviation facility and the busiest international air passenger gateway to the country. The airport has domestic and international services to destinations in Europe, Oceania and The Americas. In 2011 it was the 9th busiest airport in Latin America and the 6th busiest in South America by passenger traffic. It is the 7th busiest airport in Latin America by aircraft movements, serving 124,799 operations.", "http://en.wikipedia.org/wiki/Comodoro_Arturo_Merino_Ben%C3%ADtez_International_Airport", 16, ["Pudahuel", "Santiago International", "Santiago"]),
    
    this.new_airport_object("Denver International Airport", "Denver", "DEN", 39.853867, -104.673915, "Denver International Airport (IATA: DEN), often referred to as DIA, is an airport in Denver, Colorado. At 54 square miles (140 km2) it is the largest airport in the United States by total area. Runway 16R/34L is the longest public use runway in the United States. In 2013 Denver International Airport was the 15th-busiest airport in the world by passenger traffic with 52,556,359 passengers. It was the fifth-busiest airport in the world by aircraft movements with over 635,000 movements in 2010. The Denver International Airport has non-stop service to destinations throughout North America, Latin America, Europe and Asia. DIA was voted Best Airport in North America by readers of Business Traveler Magazine six years in a row (2005–2010) and was named \"America's Best Run Airport\" by Time Magazine in 2002.", "http://en.wikipedia.org/wiki/Denver_Airport", 16, ["DIA"]),
    
    this.new_airport_object("Vancouver International Airport", "Vancouver", "YVR", 49.196877, -123.182509, "Vancouver International Airport (IATA: YVR) is located on Sea Island in Richmond, British Columbia, Canada, about 12 km (7.5 mi) from Downtown Vancouver. In 2012, it was the second busiest airport in Canada by aircraft movements (296,394) and passengers (17.6 million), behind Toronto Pearson International Airport. It has non-stop flights daily to Asia, Europe, Oceania, the United States, and Mexico, and other airports within Canada. The airport has won several notable international best airport awards; it won the Skytrax Best North American Airport award in 2007 and 2010 through 2014. The airport also made the list of top 10 airports in the world for the first time in 2012, rated at 9th (2012), 8th (2013), and 9th (2014) overall. It is the only North American airport included in the top 10 for 2013 and 2014. YVR also retains the distinction of Best Canadian Airport in the regional results. It is a hub for Air Canada as well as a focus city for WestJet. It is also an operating base for Air Transat. Vancouver International Airport is one of eight Canadian airports that have US Border Preclearance facilities. It is also one of the few major international airports to have a terminal for scheduled floatplanes.", "http://en.wikipedia.org/wiki/Vancouver_International_Airport", 16, ["Vancouver International"])
    
    // this.new_airport_object("name", "city", "iata", latitude, longitude, "description", "wikipedia", 16, ["keyword", "keyword"])
  ];


  this.get_random_airport = function() {
    
    do {
      var random_index = Math.floor(Math.random() * datasource.length);
    } while (last_indices_used[0] == random_index || last_indices_used[1] == random_index || last_indices_used[2] == random_index);

    last_indices_used[0] = last_indices_used[1];
    last_indices_used[1] = last_indices_used[2];
    last_indices_used[2] = random_index;
    alert(datasource.length);
    return datasource[random_index];
    // return datasource[datasource.length-2];
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

// })