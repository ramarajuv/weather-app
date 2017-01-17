// Dependencies
var express = require('express');
var http = require('http');
var router = express.Router();

//Routes
//getting Forescast details
router.get('/getForecastDetailsWithCity/:location/:units/:apiKey', function (req, res) {

    var data = {
        "location": req.params.location,
        "units": req.params.units,
        "apiKey": req.params.apiKey
    }

    getForecastDetailsWithCity(data, res);
})


function getForecastDetailsWithCity(requestParams, respond) {

    var weatherAPIResponse = "";

    console.log('requestParams', requestParams);
    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + requestParams.location + '&units=' + requestParams.units + '&APPID=' + requestParams.apiKey;
//    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=2222222222&units=' + requestParams.units + '&APPID=' + requestParams.apiKey;    

    console.log(url);
    var request = http.get(
        url,
        function (response) {

            var responseBody = "";
            //Read the data
            response.on('data', function (dataChunks) {
                responseBody += dataChunks;
            });

            response.on('end', function () {

                console.log(response.statusCode);
                var weatherAPIResponse = JSON.parse(responseBody);

                if (response.statusCode === 200) {
                    try {
                        //Send the response
                        respond.send(weatherAPIResponse);
                    } catch (error) {
                        //Parse error
                        printError(error);
                    }
                } else {
                    //Status Code error
                    printError({ message: 'Error while getting forecast for ' + requestParams.location + '. (' + http.STATUS_CODES[response.statusCode] + ')' });

                    var errorMsg = {};
                    if (response.statusCode === 502){
                        errorMsg.message = weatherAPIResponse.message
                    }
                    respond.status(500).send(errorMsg);
                }
            })
        });

    //Connection error
    request.on('error', printError);
}

//Print out error messages
function printError(error) {
    console.error(error.message);
}

// Return router
module.exports = router;