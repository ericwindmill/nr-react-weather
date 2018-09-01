// For Today, For the Prev Week and For Next Week:
// temperature data
// C and F
// daily mean high and low temps
// condition with icons for bonus

/*
 CityData State object sample:
 {
      city: object.location.name,
      currentTempC: object.current["temp_c"],
      currentTempF: object.current["temp_f"],
      condition: object.current.condition.text,
      conditionIcon: object.current.condition.icon,
      forecast: [
        date: {
          maxC: 23.8,
          maxT: 74.8,
          minC: 16.1,
          minF: 61.0,
          avgC: 19.5,
          avgF: 67.0,
          condition: "Rain",
          conditionIcon: "url"
        },
        // .. all the dates
      ],
      history: [
        {
          date: {
            maxC: 23.8,
            maxT: 74.8,
            minC: 16.1,
            minF: 61.0,
            avgC: 19.5,
            avgF: 67.0,
            condition: "Rain",
            conditionIcon: "url"
          },
        },
        // .. all the dates
      ]
 }
*/

class CityData {
  constructor(title, data) {
    this.title = title
    this.state = data;
  }

  // basic factory
  // All factories eventually call this
  // This parses through the json to get the
  // data we really want.
  //
  // In this sample project, this may be over kill,
  // but i'd argue that its a good idea for a "real" project.
  static createCityData = json => {
    let object = JSON.parse(json);
    let cityData = {
      city: object.location.name,
      currentTempC: object.current["temp_c"],
      currentTempF: object.current["temp_f"],
      condition: object.current.condition.text,
      conditionIcon: object.current.condition.icon,
    };
    let title = object.location.name;
    return new CityData(title, cityData);
  };

  // Factory for class when you want the cities weather history;
  // JsonArr is a list of json objects -- one for each day.
  static createCityDataWithHistory = jsonArr => {
    // create the basic object
    let cityData = CityData.createCityData(jsonArr[0]);
    cityData.state.history = [];
    jsonArr.forEach(d => {
      d = JSON.parse(d);
      let historyDay = d["forecast"]["forecastDay"][0];
      cityData.state.history.push({
        date: historyDay["date"],
        maxC: historyDay["maxtemp_c"],
        maxT: historyDay["maxtemp_c"],
        minC: historyDay["maxtemp_c"],
        minT: historyDay["maxtemp_c"],
        avgC: historyDay["maxtemp_c"],
        avgT: historyDay["maxtemp_c"],
        condition: historyDay["condition"]["text"],
        conditionIcon: historyDay["condition"]["icon"],
      });
    });

    return cityData;
  };

  // Factory for CityData when you want to build it with cities
  // forecasted weather data.
  static createCityDataWithForecast = json => {
    // create the basic object
    let cityData = CityData.createCityData(json);
    let object = JSON.parse(json);
    cityData.state.forecast = [];

    // An array of the forecasted days
    let forecastDayArray = object["forecast"]["forecastDay"];
    forecastDayArray.forEach(day => {
      cityData.state.forecast.push({
        date: day["date"],
        maxC: day["maxtemp_c"],
        maxT: day["maxtemp_c"],
        minC: day["maxtemp_c"],
        minT: day["maxtemp_c"],
        avgC: day["maxtemp_c"],
        avgT: day["maxtemp_c"],
        condition: day["condition"]["text"],
        conditionIcon: day["condition"]["icon"],
      });
    });

    return cityData;
  };
}
