var express = require('express');
var cors = require('cors');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var PORT = process.env.PORT || 3030;

app.listen(PORT, function () {
  console.log('Server listening on ' + PORT);
});

var getCities = function (req, res, next)  {
    var options = {
        method: 'GET',
        url: 'http://apidev.accuweather.com/locations/v1/topcities/50?apikey=hoArfRosT1215',
        headers:
          {},
        json: true
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);
    
        res.locals.cities = body;
        next();
    
      });
}

app.get('/weather', getCities, function (req, res, next) {
    var keys = [];
    res.locals.cities.map( city => {
        keys.push(city.Key)
    });
    console.log("array of keys", keys);  
})