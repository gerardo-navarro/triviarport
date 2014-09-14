#!/usr/bin/env ruby 

require "csv"
require "json"
require "wikipedia"

def new_airport_as_hash(row)
  # "id","ident","type","name","latitude_deg","longitude_deg","elevation_ft","continent","iso_country","iso_region","municipality","scheduled_service","gps_code","iata_code","local_code","home_link","wikipedia_link","keywords"

  # puts "#{row['name']} => #{row["wikipedia_link"]}"

  hash = {
    :name => row['name'],
    :city => row['municipality'],
    :iata_code => row['iata_code'],
    :latitude => row['latitude_deg'],
    :longitude => row['longitude_deg'],
    :description_text => get_airport_description(row),
    :wikipedia_url => row['wikipedia_link'],
    :initial_zoom_level => 16,
    :optional_keywords => row['keywords']
  }

  return hash
end

def new_airport_as_javascript(row)

  # this.new_airport_object("San Francisco International", "San Francisco", "SFO", 37.618972, -122.374889, "San Francisco International Airport (IATA: SFO) is an international airport located 13 miles (21 km) south of downtown San Francisco, California, USA.", "http://en.wikipedia.org/wiki/SFO", 16)

  new_airport_code = "this.new_airport_object(\"#{row['name']}\", \"#{row['municipality']}\", \"#{row['iata_code']}\", #{row['latitude_deg'].to_f}, #{row['longitude_deg']}, \"#{get_airport_description(row)}\", \"#{row['wikipedia_link']}\", #{16})"

end

def get_airport_description(row)

  airport_wikipedia_link = row['wikipedia_link']
  if not row.include?("wikipedia_link") or airport_wikipedia_link.nil? or airport_wikipedia_link.empty?
    return  nil
  end

  begin
    wikipedia_page = Wikipedia.find(airport_wikipedia_link)
    if wikipedia_page == nil
      retun nil
    end

    airport_description = wikipedia_page.sanitized_content[/<p>.*<\/p>/].gsub(/<(\/)?\w+>/, "").gsub("\"", "\\\"")
    puts airport_description
    return airport_description

    # airport_description = ""
    # Always take only the first paragraphs
    # for paragraph in wikipedia_page.sanitized_content.scan(/<p>.*<\/p>/)[0..1]
    #   airport_description << paragraph.gsub(/<(\/)?\w+>/, "")
    # end

    # return airport_description

  rescue Exception => e
    raise "A connection error #{e} happened when trying to access wikipedia page: #{airport_wikipedia_link}"
  end  

end

if not ARGV[0]
  puts "Please define the input file"
end
input_file = ARGV[0]

if not ARGV[1]
  puts "Please define the output file"
end
output_file = ARGV[1]

if not ARGV[2]
  puts "Please define the airports"
end
iatas_filter = ARGV[2].split(";")

puts "#{iatas_filter}"

airports = []
airports_javascript = []

CSV.foreach(input_file.to_s, :headers => true) do |row|

  next if not iatas_filter.include?(row["iata_code"].to_s)

  airports << new_airport_as_hash(row)
  airports_javascript << new_airport_as_javascript(row)

end

json_output_file_name = "#{output_file}.json"
File.delete(json_output_file_name) if File.exists?(json_output_file_name)
File.open(json_output_file_name, "w") do |f|
  f.write(JSON.pretty_generate(airports).to_s)
end
File.chmod(0644, json_output_file_name)

js_output_file_name = "#{output_file}.js"
File.delete(js_output_file_name) if File.exists?(js_output_file_name)
File.open(js_output_file_name, "w") do |f|
  f.write(airports_javascript.join(",\n\n").to_s)
end
File.chmod(0644, js_output_file_name)
