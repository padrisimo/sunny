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

var getCities = function (req, res, next) {
  var options = {
    method: 'GET',
    url: 'https://apidev.accuweather.com/locations/v1/topcities/50?apikey=hoArfRosT1215',
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
  var reports = [];

  var cityProcessed = 0;

  res.locals.cities.map(city => {

    var options = {
      method: 'GET',
      url: 'https://apidev.accuweather.com/currentconditions/v1/' + city.key + '307297.json?language=en&details=true&apikey=hoArfRosT1215',
      headers:
        {},
      json: true
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      reports.push(body);
    });

    cityProcessed++;

    if(cityProcessed === res.locals.cities.length) {
      res.json(reports);
    }
  });
  
})

app.get('/pedo', function(req, res){
   var paridas = [{
    hola: "soy un pedo"
  },{
    holahola: "soy tambien un pedo"
  }]
   res.json(paridas)
})