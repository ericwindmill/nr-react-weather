/*
BLoC (Business Logic Component), is essentially the front-end
version of a 'Controller'. Views that need to interact with any
weather related data/logic will call out to this object.

The goal of a Bloc is similar to the goal of a UI Component. This
class can be reused by many different components/apps/etc.

Notes about why services and blocs are separate:
In this particular example, all I'm going is calling out to services,
Which makes this bloc overkill. However, it will scale much better because
services, logic and components are decoupled.
 */

import {
  getCurrentWeatherForAllCities,
  getHistoryForCity,
  getCurrentWeatherByCity,
  getForecastForCity,
} from "../services/weather_services";
import * as utils from "../utils/date_utils";
import CityData from "../models/city";

export default class WeatherBloc {
  fetchSingleCityData = async city => {
    const json = await getCurrentWeatherByCity(city);
    return CityData.createCityData(json);
  };

  fetchAllCitiesData = async () => {
    const object = await getCurrentWeatherForAllCities();
    const map = {};
    for (let city in object) {
      map[city] = CityData.createCityData(object[city]);
    }
    return map;
  };

  fetchCityModelWithHistory = async city => {
    // This is hardcoded -- a better way would be to pass in a startDate
    // However, the specs said we want to look at exactly one week
    const startDate = utils.oneWeekAgo();
    const jsonArr = await getHistoryForCity(city, startDate);
    return CityData.createCityDataWithHistory(jsonArr);
  };

  fetchCityModelWithForecast = async (city, numDays) => {
    const data = await getForecastForCity(city, numDays)
    return CityData.createCityDataWithForecast();
  };

  fetchDateRange = (startDate, endDate) => {
    return utils.getDates(startDate, endDate);
  };
}
