import * as utils from "../utils/date_utils";
import * as services from "../services/weather_services";
import "isomorphic-fetch";

// isomorphic-fetch is required to run tests that call to
// web api 'fetch' function

describe("weather services", () => {
  it("makes http request", async () => {
    expect.assertions(1);
    const data = await services.getCurrentWeatherByCity("Paris");
    // Will fail if there is an error in the request
    expect(data).toBeTruthy();
  });
  it("gets previous week's data for a city", async () => {
    expect.assertions(1);
    const startDate = utils.oneWeekAgo();
    const dateRange = utils.getDates(startDate, Date.now());
    const data = await services.getHistoryForCity("Paris", dateRange);
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
