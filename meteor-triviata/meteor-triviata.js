if (Meteor.isClient) {

  var result = Meteor.call('random_airport');
  alert(result.name);

  GoogleMaps.init(
    {
        // 'sensor': true, //optional
        // 'key': 'MY-GOOGLEMAPS-API-KEY', //optional
    }, 
    function() {
        var mapOptions = {
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            disableDefaultUI: true, draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true
        };

        map = new google.maps.Map(document.getElementById("googleMap"), mapOptions); 
        map.setCenter(new google.maps.LatLng( 35.363556, 138.730438 ));
    }
  );
}
