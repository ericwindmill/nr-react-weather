/*
This class is 'dumb' in the sense that it doesn't care
who's calling the methods and receiving the data.
It simply requests and returns weather information.
 */

export default class WeatherService {
    constructor() {
      this.baseUrl = ""
    };
    getWeatherByCity();
    getWeatherForAllCities();
}
