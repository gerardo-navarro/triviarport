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
      initial_zoom_level: zoom_start_level || 16,
      optional_keywords: optional_keywords || []
    };    
  };

  // Keeping track of already used indices
  var last_indices_used = [null, null, null, null, null, null, null, null];
  
  // Cheater!! Cheater!! Cheater!! Cheater!! Cheater!! Cheater!! Cheater!! Cheater!!
  // Yeah yeah, come on! Please don't look at the possible airport written in plain text!! Respect the others that are not as smart as you. Next version will be better ...
  datasource = [
    
    this.new_airport_object("Lester B. Pearson International Airport", "Toronto", "YYZ", 43.681374, -79.618009, "Toronto Pearson International Airport (also known as Lester B. Pearson International Airport or simply Pearson Airport or Toronto Pearson) is an international airport serving Toronto, Ontario, Canada, its metropolitan area, and the Golden Horseshoe, an urban agglomeration that is home to 8.7 million people. The airport is located northwest of downtown Toronto, in the adjacent city of Mississauga. The airport is named in honour of Lester B. Pearson, the 14th Prime Minister of Canada.", "http://en.wikipedia.org/wiki/Toronto_Pearson_International_Airport", 16, ["Toronto Pearson", "Lester B. Pearson"]),

    this.new_airport_object("Austin Bergstrom International Airport", "Austin", "AUS", 30.1944999694824, -97.6698989868164, "Austin–Bergstrom International Airport or ABIA is a Class C international airport located in Austin, Texas – the capital of Texas, and serving the Greater Austin metropolitan area, the 34th-largest metropolitan area in the United States. Located about southeast of Downtown Austin, it covers and has two runways and three helipads. The airport is named after Captain John August Earl Bergstrom, an officer who served for the 19th Bombardment Group.", "http://en.wikipedia.org/wiki/Austin-Bergstrom_International_Airport", 16, ["Austin Bergstrom", "ABIA"]),

    this.new_airport_object("General Edward Lawrence Logan International Airport", "Boston", "BOS", 42.36429977, -71.00520325, "General Edward Lawrence Logan International Airport is an international airport located in the East Boston neighborhood of Boston, Massachusetts (and partly in the town of Winthrop, Massachusetts). It covers , has six runways, and employs an estimated 16,000 people. The largest airport in New England, as of 2010, Logan is the 19th busiest airport in the United States, with about 13.5 million boardings a year and over 29.3 million passengers overall in 2012. Logan had 30.2 million passengers overall, in 2013, and it is estimated that as many as 33 million passengers will fly through the airport in 2014.", "http://en.wikipedia.org/wiki/Logan_International_Airport", 16, ["General Edward Lawrence Logan", "Boston Logan", "Logan International", "Boston International"]),

    this.new_airport_object("Dallas Love Field", "Dallas", "DAL", 32.8470993041992, -96.8517990112305, "Dallas Love Field is a city-owned public airport 6 miles (10&nbsp;km) northwest of downtown Dallas, Texas. It was Dallas' main airport until 1974 when Dallas/Fort Worth International Airport (DFW) opened.", "http://en.wikipedia.org/wiki/Dallas_Love_Field", 16, ["Dallas Love Field", "Dallas Love"]),

    this.new_airport_object("Ronald Reagan Washington National Airport", "Washington", "DCA", 38.8521003723145, -77.0376968383789, "Ronald Reagan Washington National Airport is a major airport south of downtown Washington, D.C., in Arlington County, Virginia. It is the nearest commercial airport to Washington, D.C and serves the Baltimore-Washington Metropolitan Area. For decades it was called Washington National Airport; it was renamed in 1998 to honor former U.S. President Ronald Reagan. The Metropolitan Washington Airports Authority (MWAA) operates the airport with close oversight by the federal government due to its proximity to the national capital.", "http://en.wikipedia.org/wiki/Ronald_Reagan_Washington_National_Airport", 16, ["Ronald Reagan", "Washington National", "Ronald Reagan Washington National"]),

    this.new_airport_object("Dallas Fort Worth International Airport", "Dallas-Fort Worth", "DFW", 32.896800994873, -97.0380020141602, "Dallas/Fort Worth International Airport is the primary international airport serving the metroplex in the U.S. state of Texas. It is the largest hub for American Airlines, which is headquartered near the airport.", "http://en.wikipedia.org/wiki/Dallas-Fort_Worth_International_Airport", 16, ["Fort Worth", "Dallas Fort Worth"]),

    this.new_airport_object("Newark Liberty International Airport", "Newark", "EWR", 40.6925010681152, -74.168701171875, "Newark Liberty International Airport , originally named Newark Metropolitan Airport and later Newark International Airport, is an international airport which straddles the municipal boundary between Newark and Elizabeth, New Jersey. The airport is owned by the city of Newark and operated by the Port Authority of New York and New Jersey. It is about southwest of Midtown Manhattan (New York City). Newark Airport was the first major airport in the United States and is the New York-New Jersey metropolitan area's busiest in terms of flights.", "http://en.wikipedia.org/wiki/Newark_Liberty_International_Airport", 16, ["Newark International", "Newark Metropolitan", "Newark Liberty", "Newark Liberty International", "Newark"]),

    this.new_airport_object("Fort Lauderdale Hollywood International Airport", "Fort Lauderdale", "FLL", 26.072213, -80.147336, "Fort Lauderdale–Hollywood International Airport is in unincorporated Broward County, Florida between Fort Lauderdale, Hollywood and Dania Beach, three miles (5&nbsp;km) southwest of downtown Fort Lauderdale FLL is ranked as the 21st busiest airport (in terms of passenger traffic) in the United States, as well as the nation's 14th busiest international air gateway and one of the world's 50 busiest airports. FLL is classified by the US Federal Aviation Administration as a \"major hub\" facility serving commercial air traffic. In 2011 the airport processed 23,349,835 passengers (4.2% more than 2010) including 3,608,922 international passengers (4.7% more than 2010) The airport surpassed 2007/2008 levels by 728,147 passengers.", "http://en.wikipedia.org/wiki/Fort_Lauderdale-Hollywood_International_Airport", 16, ["Fort Lauderdale Hollywood"]),

    this.new_airport_object("Washington Dulles International Airport", "Washington", "IAD", 38.94449997, -77.45580292, "Washington Dulles International Airport is a public airport in Dulles, Virginia, 26 miles (42&nbsp;km) west of downtown Washington, D.C. The airport serves the Baltimore–Washington Metropolitan Area, centered on the District of Columbia. The airport is named after John Foster Dulles, the 52nd Secretary of State under President Dwight D. Eisenhower. The Dulles main terminal is a well-known landmark designed by Eero Saarinen. Operated by the Metropolitan Washington Airports Authority, Dulles Airport occupies straddling the border of Fairfax County and Loudoun County, Virginia, within the unincorporated communities of Chantilly and Dulles.", "http://en.wikipedia.org/wiki/Washington_Dulles_International_Airport", 16, ["Washington Dulles"]),

    this.new_airport_object("John F Kennedy International Airport", "New York", "JFK", 40.63980103, -73.77890015, "John F. Kennedy International Airport is a major airport in the borough of Queens in New York City, owned by the City of New York and operated by the Port Authority of New York and New Jersey under a long-term operating lease. It is about southeast of Lower Manhattan. It is the busiest international air passenger gateway in the United States, handling more international traffic than any other airport in North America. It is also the third-leading freight gateway to the country by value of shipments. In 2013, the airport handled 50,423,765 passengers, making it the 19th-busiest airport in the world and sixth-busiest in the United States by passenger traffic. Together, JFK International, LaGuardia, and Newark Liberty airports, all operated by the Port Authority of New York and New Jersey, are the largest airport system in the United States, second in the world in terms of passenger traffic, and first in the world by total flight operations.", "http://en.wikipedia.org/wiki/John_F._Kennedy_International_Airport", 16, ["John Kennedy", "John F Kennedy", "John F. Kennedy"]),

    this.new_airport_object("McCarran International Airport", "Las Vegas", "LAS", 36.08010101, -115.1520004, "McCarran International Airport is the main commercial airport serving the Las Vegas Valley and Clark County, Nevada, United States. The airport is about south of downtown Las Vegas, in the unincorporated area of Paradise in Clark County. It covers roughly , with four runways and two terminals. McCarran is owned by Clark County and operated by the Clark County Department of Aviation (DOA).", "http://en.wikipedia.org/wiki/McCarran_International_Airport", 16, ["McCarran"]),

    this.new_airport_object("Los Angeles International Airport", "Los Angeles", "LAX", 33.94250107, -118.4079971, "Los Angeles International Airport is the primary airport serving the Greater Los Angeles Area, the second-most populated metropolitan area in the United States. It is most often referred to by its IATA airport code LAX, with the letters pronounced individually. LAX is located in southwestern Los Angeles along the Pacific coast in the neighborhood of Westchester, from Downtown Los Angeles. It is owned and operated by Los Angeles World Airports, an agency of the Los Angeles city government formerly known as the Department of Airports.", "http://en.wikipedia.org/wiki/Los_Angeles_International_Airport", 16),

    this.new_airport_object("La Guardia Airport", "New York", "LGA", 40.77719879, -73.87259674, "LaGuardia Airport  is an airport in the northern part of the New York City borough of Queens. The airport is on the waterfront of Flushing Bay and Bowery Bay, in East Elmhurst and borders the neighborhoods of East Elmhurst, Astoria, and Jackson Heights.", "http://en.wikipedia.org/wiki/LaGuardia_Airport", 16, ["La Guardia", "North Beach"]),

    this.new_airport_object("Orlando International Airport", "Orlando", "MCO", 28.431204,-81.308015, "Orlando International Airport is an international airport 6 miles southeast of Orlando, Florida. It is the second-busiest airport in the state of Florida the 13th-busiest airport in the United States and the 29th-busiest airport in the world by passenger traffic.", "http://en.wikipedia.org/wiki/Orlando_International_Airport", 16),

    this.new_airport_object("Chicago O'Hare International Airport", "Chicago", "ORD", 41.97859955, -87.90480042, "Chicago O'Hare International Airport , also known as O'Hare Airport, O'Hare Field, Chicago International Airport, or simply O'Hare, is a major airport located in the northwestern-most corner of Chicago, Illinois, northwest of the Chicago Loop. It is the primary airport serving the Chicago area, with Chicago Midway International Airport, about closer to the Loop, serving as a secondary airport for low-cost carriers.", "http://en.wikipedia.org/wiki/O'Hare_International_Airport", 16, ["O'Hare", "O Hare", "O'Hare Field"]),

    this.new_airport_object("Portland International Airport", "Portland", "PDX", 45.58869934, -122.5979996, "Portland International Airport is a joint civil-military airport and the largest airport in the U.S. state of Oregon, accounting for 90% of passenger travel and more than 95% of air cargo of the state. It is located within Portland's city limits just south of the Columbia River in Multnomah County, six miles by air and twelve miles by highway northeast of downtown Portland. Portland International Airport is often referred to by its IATA airport code, PDX.", "http://en.wikipedia.org/wiki/Portland_International_Airport", 16),

    this.new_airport_object("Philadelphia International Airport", "Philadelphia", "PHL", 39.871898651123, -75.241096496582, ":\"Philadelphia Airport\" redirects here. For other airports serving Philadelphia, see List of airports in the Philadelphia area. For the airport in Mississippi, see Philadelphia Municipal Airport.", "http://en.wikipedia.org/wiki/Philadelphia_International_Airport", 16),

    this.new_airport_object("Palm Springs International Airport", "Palm Springs", "PSP", 33.823573,-116.504422, "Palm Springs International Airport is a public airport two miles (3&nbsp;km) east of downtown Palm Springs, California. The airport covers and has two runways. The airport is highly seasonal, with most flights operating during the winter.", "http://en.wikipedia.org/wiki/Palm_Springs_International_Airport", 16),

    this.new_airport_object("San Diego International Airport", "San Diego", "SAN", 32.733231,-117.199834, "San Diego International Airport , also known as Lindbergh Field, is a public airport northwest of downtown San Diego, California. It is operated by the San Diego County Regional Airport Authority.", "http://en.wikipedia.org/wiki/San_Diego_International_Airport", 16, ["Lindbergh Field"]),

    this.new_airport_object("Seattle Tacoma International Airport", "Seattle", "SEA", 47.4490013122559, -122.30899810791, "The Seattle–Tacoma International Airport , also known as Sea–Tac Airport or Sea–Tac , is an American airport. It is located in SeaTac, Washington, at the intersections of State Routes 99, 509, and 518, about west of Interstate 5. It serves the cities of Seattle and Tacoma, as well as the rest of Western Washington.", "http://en.wikipedia.org/wiki/Seattle-Tacoma_International_Airport", 16, ["Seattle Tacoma", "Tacoma International"]),

    this.new_airport_object("San Francisco International Airport", "San Francisco", "SFO", 37.6189994812012, -122.375, "San Francisco International Airport is an international airport located south of downtown San Francisco, California, near Millbrae and San Bruno in unincorporated San Mateo County. It has flights to points throughout North America and is a major gateway to Europe and Asia.", "http://en.wikipedia.org/wiki/San_Francisco_International_Airport", 16),

    this.new_airport_object("Norman Y. Mineta San Jose International Airport", "San Jose", "SJC", 37.3625984191895, -121.929000854492, "Norman Y. Mineta San Jose International Airport It is two miles northwest of Downtown San Jose near the intersections of U.S. Route 101, Interstate 880, and State Route 87. The dominant carrier is Southwest Airlines with Alaska Airlines as the second largest. The airport has free Wi-Fi in all terminals.", "http://en.wikipedia.org/wiki/San_Jose_International_Airport", 16, ["Norman Mineta", "Norman Y. Mineta", "Norman Y. Mineta San Jose"]),

    this.new_airport_object("John Wayne Airport-Orange County Airport", "Santa Ana", "SNA", 33.67570114, -117.8679962, "John Wayne Airport is an international airport in Orange County, California, with its mailing address in the city of Santa Ana, hence the IATA airport code. The entrance to the airport is off MacArthur Blvd in Irvine, the city that abuts the airport on the north and east. Newport Beach and Costa Mesa form the southern and western boundaries along with a small unincorporated area along the Corona del Mar (73) Freeway. Santa Ana is just north, not actually touching the airport. Originally named Orange County Airport, the county Board of Supervisors renamed it in 1979 to honor actor John Wayne, who lived in neighboring Newport Beach and died that year.", "http://en.wikipedia.org/wiki/John_Wayne_Airport", 16, ["John Wayne Airport", "Airport", "Orange County"]),

    this.new_airport_object("Licenciado Gustavo Díaz Ordaz International Airport", "Puerto Vallarta", "PVR", 20.6800994873047, -105.253997802734, "Licenciado Gustavo Díaz Ordaz International Airport (sometimes abbreviated as Lic. Gustavo Díaz Ordaz International Airport) is an international airport located at Puerto Vallarta, Jalisco in Mexico. The airport is named after President Gustavo Díaz Ordaz. It handled 2,597,700 passengers in 2012 and 2,670,800 in 2013.", "http://en.wikipedia.org/wiki/Lic._Gustavo_D%C3%ADaz_Ordaz_International_Airport", 16, ["Lic. Gustavo Díaz Ordaz", "Gustavo Diaz", "Gustavo Diaz Ordaz", "Licenciado Gustavo Díaz Ordaz"]),

    this.new_airport_object("Los Cabos International Airport", "San Jose del Cabo", "SJD", 23.157782, -109.718081, "Los Cabos International Airport  is the seventh busiest airport in Mexico, located at San José del Cabo, Baja California Sur, Mexico. The airport serves Los Cabos area: San José del Cabo and Cabo San Lucas. This airport has three terminals with 4 concourses. Terminal 1 serves both domestic and international operations for various air carriers while Terminal 3 services Alaska Airlines, Delta Air Lines, Frontier Airlines and other seasonal international carriers. From September 2011 until January 2012, the airport temporarily gained nonstop service to Asia with flights to Shanghai, China.", "http://en.wikipedia.org/wiki/Los_Cabos_International_Airport", 16, ["Los Cabos", "San Jose de Los Cabos"]),

    this.new_airport_object("Cancún International Airport", "Cancun", "CUN", 21.0365009308, -86.8770980835, "Cancún International Airport () is located in Cancún, Quintana Roo, on the Caribbean coast of Mexico's Yucatán Peninsula. It is Mexico's second busiest airport, after Mexico City International Airport in Mexico City, but the biggest in Mexico for International passengers. In 2013, Cancún airport handled 15,962,162 passengers, a 10.4% increase compared to 2012.", "http://en.wikipedia.org/wiki/Canc%C3%BAn_International_Airport", 16, ["Cancun"])
    
    // this.new_airport_object("name", "city", "iata", latitude, longitude, "description", "wikipedia", 16, ["keyword", "keyword"])
  ];


  this.get_random_airport = function() {
    
    do {
      var random_index = Math.floor(Math.random() * datasource.length);
    } while (last_indices_used[0] == random_index ||
      last_indices_used[1] == random_index ||
      last_indices_used[2] == random_index ||
      last_indices_used[3] == random_index ||
      last_indices_used[4] == random_index ||
      last_indices_used[5] == random_index ||
      last_indices_used[6] == random_index ||
      last_indices_used[7] == random_index ||
      last_indices_used[8] == random_index);

    last_indices_used[0] = last_indices_used[1];
    last_indices_used[1] = last_indices_used[2];
    last_indices_used[2] = last_indices_used[3];
    last_indices_used[3] = last_indices_used[4];
    last_indices_used[4] = last_indices_used[5];
    last_indices_used[5] = last_indices_used[6];
    last_indices_used[6] = last_indices_used[7];
    last_indices_used[7] = last_indices_used[8];
    last_indices_used[8] = random_index;
    return datasource[random_index];
    // return datasource[0];
  };

}