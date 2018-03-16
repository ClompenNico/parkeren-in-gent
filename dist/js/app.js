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
                    response[i].parkingStatus.availableCapacity,
                    response[i].parkingStatus.totalCapacity

                );

                parkingsArray.push(p);
            }
            renderHtml(parkingsArray);
        });
    }

    function renderHtml(parkings){
        let bobTheHTMLBuilder = ``;
        for (let i = 0, l = parkings.length ; i < l ; i ++){
            bobTheHTMLBuilder += `
                <li class="parkings__parking ${renderAvailabilityClass(parkings[i].availableCapacity, parkings[i].totalCapacity)}">
                    <div class="parkings__parking__Logo">P</div>
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
// let p = new Parking(name, description, availableCapacity, totalCapacity)
function Parking(name, description, availableCapacity, totalCapacity){

    this.name = name;
    this.description = description;
    this.availableCapacity = availableCapacity;
    this.totalCapacity = totalCapacity;

}