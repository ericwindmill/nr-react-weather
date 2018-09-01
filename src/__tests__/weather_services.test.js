describe("weather services", () => {
  it("makes http request", async () => {
    const services = require("../services/weather_services");
    expect.assertions(1);
    const data = await services.getCurrentWeatherByCity("Paris");
    // Will fail if there is an error in the request
    expect(data).toBeTruthy();
  });
  it("gets data for all cities", async () => {
    const services = require("../services/weather_services");
    expect.assertions(2);
    const data = await services.getCurrentWeatherForAllCities();
    expect(data).toHaveProperty("San Francisco");
    expect(data).toHaveProperty("Istanbul");
  });
});
