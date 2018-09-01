const options = {
  host: "https://api.apixu.com",
  currentWeatherPath: "/v1/current.json?key=cacdf29dc2be47d484a105606152306&q=",
  historyPath: "/v1/history.json?key=cacdf29dc2be47d484a105606152306&q=",
  forecastPath: "/v1/forecast.json?key=cacdf29dc2be47d484a105606152306&q=",
  method: "GET",
};

const cities = [
  "San Francisco",
  "Ansterdam",
  "Oakland",
  "Rome",
  "Cleveland",
  "Tel Aviv",
  "New York City",
  "Murkmansk",
  "Istanbul",
];

const _fetch = async query => {
  let url = options.host + query;
  return fetch(url).then(response => response.json());
};

exports.getCurrentWeatherByCity = async function getWeatherByCity(city) {
  let path = options.currentWeatherPath + city;
  return _fetch(path);
};

exports.getCurrentWeatherForAllCities = async function getWeatherForAllCities() {
  const allCitiesWeather = {};
  for (let city in cities) {
    allCitiesWeather[cities[city]] = await _fetch(cities[city]);
  }
  return allCitiesWeather;
};

exports.getForecastForCity = async function getForecastForCity(
  city,
  forecastDays,
) {
  if (forecastDays < 1 || forecastDays > 10) {
    throw new Error("Please choose between 1 and 10 days");
  }
  let query = options.forecastPath + `${city}&days=${forecastDays}`;
  return _fetch(query);
};

exports.getHistoryForCity = async function getHistoryForCity(city, startDate) {
  if (parseInt(startDate.split("-")[0]) < 2015) {
    throw new Error("The oldest data available is from 2015");
  }
  let query = options.historyPath + `${city}&days=${startDate}`;
  return _fetch(query);
};
