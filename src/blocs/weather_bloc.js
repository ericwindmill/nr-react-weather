/*
BLoC (Business Logic Component), is essentially the front-end
version of a 'Controller'. Views that need to interact with any
weather related data/logic will call out to this object.

The goal of a Bloc is similar to the goal of a UI Component. This
class can be reused by many different components/apps/etc.
 */

import "../services/weather_services";
import utils from '../utils/date_utils';
import City from '../models/city';


export default class WeatherBloc {
  constructor(services) {
    this.services = services;
  }

  createCityModel = async city => {
    const json = await this.services.getCurrentWeatherByCity(city);
    return City.createCityData(json);
  };

  createCityModelWithHistory = async city => {
    // This is hardcoded -- a better way would be to pass in a startDate
    // However, the specs said we want to look at exactly one week
    const startDate = new Date.now().setDate(new Date.now() - 7);
    const jsonArr = await this.services.getHistoryForCity(city, startDate);
    return City.createCityDataWithHistory(jsonArr)
  }

  createDateRange = (startDate, endDate) => {
    return utils.getDates(startDate, endDate);
  }
}
