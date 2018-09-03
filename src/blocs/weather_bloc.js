/*
BLoC (Business Logic Component), is essentially the front-end
version of a 'Controller'. Views that need to interact with any
weather related data/logic will call out to this object.

The goal of a Bloc is similar to the goal of a UI Component. This
class can be reused by many different components/apps/etc.

Notes about why services and blocs are separate:
it will scale much better because
services, logic and components are decoupled.
 */
import {
  getHistoryForCity,
  getCurrentWeatherByCity,
  getForecastForCity,
} from "../services/weather_services";
import * as utils from "../utils/date_utils";
import CityData from "../models/city";

export default class WeatherBloc {
  constructor(appState) {
    this.appState = appState;
  }
  fetchSingleCityData = async city => {
    // if we already have the data, don't pull in new data
    // The catch here is that if the weather information changes,
    // and we want that update.
    // This is a trade off that I was willing to make for two reasons:
    // 1. Weather information doesn't update super quickly in a significant way
    // 2. Because this app doesn't have persistence, it'll reload when the browser is refreshed.
    // Given more time I would put some sort of time limit on this
    // that forced a refresh every so often
    if (this.appState.haveCityData(city)) {
      return this.appState.state.current[city];
    }
    const json = await getCurrentWeatherByCity(city);
    return CityData.createCityData(json);
  };

  fetchAllCitiesData = async cities => {
    const map = {};
    for (let city in cities) {
      map[cities[city]] = await this.fetchSingleCityData(cities[city]);
    }
    return map;
  };

  fetchCityModelWithHistory = async city => {
    // This is hardcoded -- a better way would be to pass in a startDate
    // However, the specs said we want to look at exactly one week
    const startDate = utils.oneWeekAgo();
    const current = await this.fetchSingleCityData(city);
    const dateRange = this.fetchDateRange(startDate, Date.now());
    const history = await getHistoryForCity(city, dateRange);
    return CityData.createCityDataWithHistory(history, current);
  };

  fetchCityModelWithForecast = async (city, numDays) => {
    const data = await getForecastForCity(city, numDays);
    return CityData.createCityDataWithForecast(data);
  };

  fetchDateRange = (startDate, endDate) => {
    return utils.getDates(startDate, endDate);
  };

  getHistoryDataForBarChart = (data, isCelsius) => {
    const lows = [];
    const avg = [];
    const highs = [];
    data.forEach(day => {
      if (isCelsius) {
        lows.push(Math.round(day.minC));
        avg.push(Math.round(day.avgC));
        highs.push(Math.round(day.maxC));
      } else {
        lows.push(Math.round(day.minF));
        avg.push(Math.round(day.avgF));
        highs.push(Math.round(day.maxF));
      }
    });
    return [lows, avg, highs];
  };

  getDatesForBarChart = data => {
    const dates = [];
    data.forEach(day => {
      let date = day.date;
      // the labels for the bar chart will just be the date number
      // dates are in the format 'yyyy-mm-dd' from the API.
      dates.push(date.split("-")[2]);
    });
    return dates;
  };

  updateChartData = async (city, isCelsius, shouldFetchOnCitySwitch) => {
    let forecast, history;
    if (shouldFetchOnCitySwitch) {
      forecast = await this.fetchCityModelWithForecast(city, 7);
      history = await this.fetchCityModelWithHistory(city);
      this.appState.updateAppState({
        forecast: forecast,
        history: history,
      });
    } else {
      forecast = this.appState.state.forecast;
      history = this.appState.state.history;
    }

    const historyLabels = this.getDatesForBarChart(history.state.history);
    const historySeries = this.getHistoryDataForBarChart(
      history.state.history,
      isCelsius,
    );

    const forecastLabels = this.getDatesForBarChart(forecast.state.forecast);
    const forecastSeries = this.getHistoryDataForBarChart(
      forecast.state.forecast,
      isCelsius,
    );

    await this.appState.updateAppState({
      historyLabels: historyLabels,
      historySeries: historySeries,
      forecastLabels: forecastLabels,
      forecastSeries: forecastSeries,
    });

    return this.appState;
  };
}
