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