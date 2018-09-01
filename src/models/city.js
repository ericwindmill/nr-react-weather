
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
      ]
 }
*/

exports.createCityData = (json,) => {

};

exports.createCityDataFromHistory = (json) => {
  let cityData = createCityData()
}

exports.addHistoryToCity

class CityData {
  constructor(data) {
    this.state = data;
  }

  static createCityData = (json) => {
    let object = JSON.parse(json);
    let cityData = {
      city: object.location.name,
      currentTempC: object.current["temp_c"],
      currentTempF: object.current["temp_f"],
      condition: object.current.condition.text,
      conditionIcon: object.current.condition.icon,
    };
    return new CityData(cityData);
  }

  static createCityDataWithHistory = (json, startDate, endDate) => {


    let cityData = CityData.createCityData(json);
    cityData.state.history = [

    ]
  }
}