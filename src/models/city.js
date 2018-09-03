export default class CityData {
  constructor(title, data) {
    this.title = title;
    this.state = data;
  }
  // All factories eventually call this
  // This simply creates a model of the data we really want from the api.
  //
  // In this sample project, this may be over kill,
  // but i'd argue that its a good idea for a "real" project.
  static createCityData = object => {
    let cityData = {
      city: object.location["name"],
      currentTempC: object.current["temp_c"],
      currentTempF: object.current["temp_f"],
      condition: object.current.condition.text,
      conditionIcon: object.current.condition.icon,
    };
    let title = object.location.name;
    return new CityData(title, cityData);
  };

  // Factory for class when you want the city's weather history
  // dataObject in this case is an array of daily data
  static createCityDataWithHistory = (dataObject, cityDataObject) => {
    cityDataObject.state.history = [];
    dataObject.forEach(d => {
      let historyDay = d.forecast.forecastday[0].day;
      cityDataObject.state.history.push({
        date: d.forecast.forecastday[0].date,
        maxC: historyDay["maxtemp_c"],
        maxF: historyDay["maxtemp_f"],
        minC: historyDay["mintemp_c"],
        minF: historyDay["mintemp_f"],
        avgC: historyDay["avgtemp_c"],
        avgF: historyDay["avgtemp_f"],
        condition: historyDay.condition.text,
        conditionIcon: historyDay.condition.icon,
      });
    });

    return cityDataObject;
  };

  // Factory for CityData when you want to build it with city's
  // forecast weather data.
  static createCityDataWithForecast = dataObject => {
    let cityData = CityData.createCityData(dataObject);
    cityData.state.forecast = [];
    // An array of the forecast days
    let forecastDayArray = dataObject.forecast.forecastday;
    forecastDayArray.forEach(day => {
      cityData.state.forecast.push({
        date: day.date,
        maxC: day.day["maxtemp_c"],
        maxF: day.day["maxtemp_f"],
        minC: day.day["mintemp_c"],
        minF: day.day["mintemp_f"],
        avgC: day.day["avgtemp_c"],
        avgF: day.day["avgtemp_f"],
        condition: day.day.condition.text,
        conditionIcon: day.day.condition.icon,
      });
    });

    return cityData;
  };
}
