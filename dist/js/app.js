(function(){

    //dom volledig klaar
    document.addEventListener("DOMContentLoaded", init);
    function init(){
        http.get('https://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime.json').then(function(response){
            //console.info(response);
            
            let parkingsArray = [];
            for(let i = 0, l = response.length ; i < l; i++){
                let p = new Parking(
                    response[i].name,
                    response[i].description,
                    response[i].latitude,
                    response[i].longitude,
                    response[i].parkingStatus.availableCapacity,
                    response[i].parkingStatus.totalCapacity

                );

                parkingsArray.push(p);
            }
            renderHtml(parkingsArray);
            aanmakenMap(parkingsArray);
        });
    }

    function renderHtml(parkings){
        let bobTheHTMLBuilder = ``;
        for (let i = 0, l = parkings.length ; i < l ; i ++){
            bobTheHTMLBuilder += `
                <li class="parkings__parking ${renderAvailabilityClass(parkings[i].availableCapacity, parkings[i].totalCapacity)}">
                    <div class="parkings__parking__Logo">${parkings[i].name}</div>
                    <div class="parkings__parking__name">${parkings[i].description}</div>
                    <div class="parkings__parking__info">${parkings[i].availableCapacity} / ${parkings[i].totalCapacity}</div>
                </li>
            
            `;
        }

        document.querySelector(".parkings").innerHTML = bobTheHTMLBuilder;
        
        //console.log(parkings);
    }

    function renderAvailabilityClass(avail, total){
        if(avail == 0){
            return "error";
        }
        let result = total - avail;
        if(result > total / 2){
            return "danger"
        }
        else
        {
            return "cool"
        }
    }

    function aanmakenMap(parkings){
        let pinArray = [];
        for(let i = 0, l = parkings.length; i<l; i++){
            let m = new Pin(
                parkings[i].name,
                parkings[i].latitude,
                parkings[i].longitude
            );
            pinArray.push(m);
        }
        
        maps.maping(pinArray);
    }

})();
//http.get
(function(){
    "use strict";

    function get(url){
        let promise = new Promise(function(ok, nok){
            
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url);
            xmlHttp.onload = () => {
                let json = JSON.parse(xmlHttp.responseText);
                ok(json);
            };
            xmlHttp.onerror = () => {
                nok("Er is iets misgelopen, contacteer de administrator")
            };

            xmlHttp.send(null);

        });

        return promise;
    }

    window.http = {
        get: get
    };

})();
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
// let p = new Parking(name, description, availableCapacity, totalCapacity)
function Parking(name, description, lat, long, availableCapacity, totalCapacity){

    this.name = name;
    this.description = description;
    this.latitude = lat;
    this.longitude = long;
    this.availableCapacity = availableCapacity;
    this.totalCapacity = totalCapacity;

}

function Pin(name, latitude, longitude){
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
}