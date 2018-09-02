import "isomorphic-fetch";

const options = {
  host: "https://api.apixu.com",
  currentWeatherPath: "/v1/current.json?key=cacdf29dc2be47d484a105606152306&q=",
  historyPath: "/v1/history.json?key=cacdf29dc2be47d484a105606152306&q=",
  forecastPath: "/v1/forecast.json?key=cacdf29dc2be47d484a105606152306&q=",
  method: "GET",
};

const _fetch = async query => {
  let url = options.host + query;
  return await fetch(url)
    .then(response => response.json())
    .catch(e => {
      console.log(e);
    });
};

export const getCurrentWeatherByCity = async function getWeatherByCity(city) {
  let path = options.currentWeatherPath + city;
  return await _fetch(path);
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
  dateRange,
) {
  const results = [];
  for (let date in dateRange) {
    let query = options.historyPath + `${city}&dt=${dateRange[date]}`;
    let response = await _fetch(query);
    results.push(response);
  }
  return results;
};
