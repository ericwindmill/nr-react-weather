import * as utils from "../utils/date_utils";
import * as services from "../services/weather_services";

describe("weather services", () => {
  it("makes http request", async () => {
    expect.assertions(1);
    const data = await services.getCurrentWeatherByCity("Paris");
    // Will fail if there is an error in the request
    expect(data).toBeTruthy();
  });
  it("gets data for all cities", async () => {
    expect.assertions(2);
    const data = await services.getCurrentWeatherForAllCities();
    expect(data).toHaveProperty("San Francisco");
    expect(data).toHaveProperty("Istanbul");
  });
  it("gets previous week's data for a city", async () => {
    expect.assertions(1);
    const startDate = utils.oneWeekAgo();
    const data = await services.getHistoryForCity("Paris", startDate);
    // data should be an array of 7 days.
    expect(data).toHaveLength(7);
  });
  it("gets 7 day forecast for a city", async () => {
    expect.assertions(1);
    const data = await services.getForecastForCity("Paris", 7);
    // should return an object which has 'forecastdays'
    expect(data).toHaveProperty("forecast");
  });
});
