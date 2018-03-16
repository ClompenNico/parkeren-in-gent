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