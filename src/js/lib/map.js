(function () {
    "use strict";

    function maping(PinArray){      
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 20,
            scrollwheel: false,
            center: new google.maps.LatLng(51.0823564, 3.5744026),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    
        var infowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();

        var marker, i;

        for (i = 0; i < PinArray.length; i++) { 
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(PinArray[i].latitude, PinArray[i].longitude),
                map: map
            });

            bounds.extend(marker.position);
            
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(PinArray[i].name);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        
        }
        map.fitBounds(bounds);


    }
    window.maps = {
        maping: maping
    };
})();