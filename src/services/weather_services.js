import * as util from "../utils/date_utils";
import { cities } from "../variables/general";

const options = {
  host: "https://api.apixu.com",
  currentWeatherPath: "/v1/current.json?key=cacdf29dc2be47d484a105606152306&q=",
  historyPath: "/v1/history.json?key=cacdf29dc2be47d484a105606152306&q=",
  forecastPath: "/v1/forecast.json?key=cacdf29dc2be47d484a105606152306&q=",
  method: "GET",
};

const _fetch = async query => {
  let url = options.host + query;
  return fetch(url).then(response =>
    response.json().catch(e => {
      throw new Error(e);
    }),
  );
};

export const getCurrentWeatherByCity = async function getWeatherByCity(city) {
  let path = options.currentWeatherPath + city;
  return _fetch(path);
};

export const getCurrentWeatherForAllCities = async function getWeatherForAllCities() {
  const allCitiesWeather = {};
  for (let city in cities) {
    let query = options.currentWeatherPath + cities[city];
    allCitiesWeather[cities[city]] = await _fetch(query);
  }
  return allCitiesWeather;
};

export const getForecastForCity = async function getForecastForCity(
  city,
  forecastDays,
) {
  if (forecastDays < 1 || forecastDays > 10) {
    throw new Error("Please choose between 1 and 10 days");
  }
  let query = options.forecastPath + `${city}&days=${forecastDays}`;
  return _fetch(query);
};

export const getHistoryForCity = async function getHistoryForCity(
  city,
  startDate,
) {
  if (parseInt(startDate.split("-")[0]) < 2015) {
    throw new Error("The oldest data available is from 2015");
  }
  const dateRange = util.getDates(startDate, new Date.now());
  const results = [];
  for (let date in dateRange) {
    let query = options.historyPath + `${city}&days=${dateRange[date]}`;
    results.push(_fetch(query));
  }
  return results;
};
