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

    if (cityProcessed === res.locals.cities.length) {
      res.json(reports);
    }
  });

})

app.get('/mock', function (req, res) {
  var mock = [
    { "LocalObservationDateTime": "2017-11-30T03:56:00+11:00", "EpochTime": 1511974560, "WeatherText": "Clear", "WeatherIcon": 33, "IsDayTime": false, "Temperature": { "Metric": { "Value": 24.0, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 75.0, "Unit": "F", "UnitType": 18 } }, "RealFeelTemperature": { "Metric": { "Value": 22.5, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 72.0, "Unit": "F", "UnitType": 18 } }, "RealFeelTemperatureShade": { "Metric": { "Value": 20.8, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 69.0, "Unit": "F", "UnitType": 18 } }, "RelativeHumidity": 54, "DewPoint": { "Metric": { "Value": 14.1, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 57.0, "Unit": "F", "UnitType": 18 } }, "Wind": { "Direction": { "Degrees": 0, "Localized": "N", "English": "N" }, "Speed": { "Metric": { "Value": 20.9, "Unit": "km/h", "UnitType": 7 }, "Imperial": { "Value": 13.0, "Unit": "mi/h", "UnitType": 9 } } }, "WindGust": { "Speed": { "Metric": { "Value": 20.9, "Unit": "km/h", "UnitType": 7 }, "Imperial": { "Value": 13.0, "Unit": "mi/h", "UnitType": 9 } } }, "UVIndex": 0, "UVIndexText": "Low", "Visibility": { "Metric": { "Value": 16.1, "Unit": "km", "UnitType": 6 }, "Imperial": { "Value": 10.0, "Unit": "mi", "UnitType": 2 } }, "ObstructionsToVisibility": "W", "CloudCover": 0, "Ceiling": { "Metric": { "Value": 11460.0, "Unit": "m", "UnitType": 5 }, "Imperial": { "Value": 37600.0, "Unit": "ft", "UnitType": 0 } }, "Pressure": { "Metric": { "Value": 1011.0, "Unit": "mb", "UnitType": 14 }, "Imperial": { "Value": 29.85, "Unit": "inHg", "UnitType": 12 } }, "PressureTendency": { "LocalizedText": "Falling", "Code": "F" }, "Past24HourTemperatureDeparture": { "Metric": { "Value": 3.3, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 6.0, "Unit": "F", "UnitType": 18 } }, "ApparentTemperature": { "Metric": { "Value": 24.4, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 76.0, "Unit": "F", "UnitType": 18 } }, "WindChillTemperature": { "Metric": { "Value": 23.9, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 75.0, "Unit": "F", "UnitType": 18 } }, "WetBulbTemperature": { "Metric": { "Value": 17.7, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 64.0, "Unit": "F", "UnitType": 18 } }, "Precip1hr": { "Metric": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Imperial": { "Value": 0.0, "Unit": "in", "UnitType": 1 } }, "PrecipitationSummary": { "Precipitation": { "Metric": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Imperial": { "Value": 0.0, "Unit": "in", "UnitType": 1 } }, "PastHour": { "Metric": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Imperial": { "Value": 0.0, "Unit": "in", "UnitType": 1 } }, "Past3Hours": { "Metric": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Imperial": { "Value": 0.0, "Unit": "in", "UnitType": 1 } }, "Past6Hours": { "Metric": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Imperial": { "Value": 0.0, "Unit": "in", "UnitType": 1 } }, "Past9Hours": { "Metric": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Imperial": { "Value": 0.0, "Unit": "in", "UnitType": 1 } }, "Past12Hours": { "Metric": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Imperial": { "Value": 0.0, "Unit": "in", "UnitType": 1 } }, "Past18Hours": { "Metric": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Imperial": { "Value": 0.0, "Unit": "in", "UnitType": 1 } }, "Past24Hours": { "Metric": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Imperial": { "Value": 0.0, "Unit": "in", "UnitType": 1 } } }, "TemperatureSummary": { "Past6HourRange": { "Minimum": { "Metric": { "Value": 21.1, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 70.0, "Unit": "F", "UnitType": 18 } }, "Maximum": { "Metric": { "Value": 27.8, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 82.0, "Unit": "F", "UnitType": 18 } } }, "Past12HourRange": { "Minimum": { "Metric": { "Value": 21.1, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 70.0, "Unit": "F", "UnitType": 18 } }, "Maximum": { "Metric": { "Value": 35.0, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 95.0, "Unit": "F", "UnitType": 18 } } }, "Past24HourRange": { "Minimum": { "Metric": { "Value": 17.8, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 64.0, "Unit": "F", "UnitType": 18 } }, "Maximum": { "Metric": { "Value": 35.6, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 96.0, "Unit": "F", "UnitType": 18 } } } }, "MobileLink": "http://m.accuweather.com/en/au/melbourne/26216/current-weather/26216", "Link": "http://www.accuweather.com/en/au/melbourne/26216/current-weather/26216" },
    { "LocalObservationDateTime": "2017-11-29T11:35:00+01:00", "EpochTime": 1511951700, "WeatherText": "Partly sunny", "WeatherIcon": 3, "IsDayTime": true, "Temperature": { "Metric": { "Value": 10.0, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 50.0, "Unit": "F", "UnitType": 18 } }, "RealFeelTemperature": { "Metric": { "Value": 7.9, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 46.0, "Unit": "F", "UnitType": 18 } }, "RealFeelTemperatureShade": { "Metric": { "Value": 6.7, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 44.0, "Unit": "F", "UnitType": 18 } }, "RelativeHumidity": 57, "DewPoint": { "Metric": { "Value": 2.2, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 36.0, "Unit": "F", "UnitType": 18 } }, "Wind": { "Direction": { "Degrees": 315, "Localized": "NW", "English": "NW" }, "Speed": { "Metric": { "Value": 16.7, "Unit": "km/h", "UnitType": 7 }, "Imperial": { "Value": 10.4, "Unit": "mi/h", "UnitType": 9 } } }, "WindGust": { "Speed": { "Metric": { "Value": 16.7, "Unit": "km/h", "UnitType": 7 }, "Imperial": { "Value": 10.4, "Unit": "mi/h", "UnitType": 9 } } }, "UVIndex": 1, "UVIndexText": "Low", "Visibility": { "Metric": { "Value": 16.1, "Unit": "km", "UnitType": 6 }, "Imperial": { "Value": 10.0, "Unit": "mi", "UnitType": 2 } }, "ObstructionsToVisibility": "W", "CloudCover": 35, "Ceiling": { "Metric": { "Value": 6096.0, "Unit": "m", "UnitType": 5 }, "Imperial": { "Value": 20000.0, "Unit": "ft", "UnitType": 0 } }, "Pressure": { "Metric": { "Value": 1007.0, "Unit": "mb", "UnitType": 14 }, "Imperial": { "Value": 29.74, "Unit": "inHg", "UnitType": 12 } }, "PressureTendency": { "LocalizedText": "Steady", "Code": "S" }, "Past24HourTemperatureDeparture": { "Metric": { "Value": -1.1, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": -2.0, "Unit": "F", "UnitType": 18 } }, "ApparentTemperature": { "Metric": { "Value": 11.7, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 53.0, "Unit": "F", "UnitType": 18 } }, "WindChillTemperature": { "Metric": { "Value": 7.8, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 46.0, "Unit": "F", "UnitType": 18 } }, "WetBulbTemperature": { "Metric": { "Value": 6.3, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 43.0, "Unit": "F", "UnitType": 18 } }, "Precip1hr": { "Metric": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Imperial": { "Value": 0.0, "Unit": "in", "UnitType": 1 } }, "PrecipitationSummary": { "Precipitation": { "Metric": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Imperial": { "Value": 0.0, "Unit": "in", "UnitType": 1 } }, "PastHour": { "Metric": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Imperial": { "Value": 0.0, "Unit": "in", "UnitType": 1 } }, "Past3Hours": { "Metric": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Imperial": { "Value": 0.0, "Unit": "in", "UnitType": 1 } }, "Past6Hours": { "Metric": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Imperial": { "Value": 0.0, "Unit": "in", "UnitType": 1 } }, "Past9Hours": { "Metric": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Imperial": { "Value": 0.0, "Unit": "in", "UnitType": 1 } }, "Past12Hours": { "Metric": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Imperial": { "Value": 0.0, "Unit": "in", "UnitType": 1 } }, "Past18Hours": { "Metric": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Imperial": { "Value": 0.0, "Unit": "in", "UnitType": 1 } }, "Past24Hours": { "Metric": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Imperial": { "Value": 0.0, "Unit": "in", "UnitType": 1 } } }, "TemperatureSummary": { "Past6HourRange": { "Minimum": { "Metric": { "Value": 3.9, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 39.0, "Unit": "F", "UnitType": 18 } }, "Maximum": { "Metric": { "Value": 10.0, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 50.0, "Unit": "F", "UnitType": 18 } } }, "Past12HourRange": { "Minimum": { "Metric": { "Value": 3.9, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 39.0, "Unit": "F", "UnitType": 18 } }, "Maximum": { "Metric": { "Value": 10.0, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 50.0, "Unit": "F", "UnitType": 18 } } }, "Past24HourRange": { "Minimum": { "Metric": { "Value": 3.9, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 39.0, "Unit": "F", "UnitType": 18 } }, "Maximum": { "Metric": { "Value": 15.0, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 59.0, "Unit": "F", "UnitType": 18 } } } }, "MobileLink": "http://m.accuweather.com/en/es/barcelona/307297/current-weather/307297", "Link": "http://www.accuweather.com/en/es/barcelona/307297/current-weather/307297" },

  ]
  res.json(mock)
})