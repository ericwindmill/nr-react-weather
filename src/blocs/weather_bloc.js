/*
BLoC (Business Logic Component), is essentially the front-end
version of a 'Controller'. Views that need to interact with any
weather related data/logic will call out to this object.

The goal of a Bloc is similar to the goal of a UI Component. This
class can be reused by many different components/apps/etc.
 */

import "../services/weather_services";
import City from '../models/city';

export default class WeatherBloc {
  constructor(services) {
    this.services = services;
  }

  createCityModel = async city => {
    const json = await this.services.getCurrentWeatherByCity(city);
    return new City(json);
  };

  createDateRange = (startDate, endDate) => {

  }
}
