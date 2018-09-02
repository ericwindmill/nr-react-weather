import Bloc from "../blocs/weather_bloc";
import AppState from "../models/app_state";
import "isomorphic-fetch";

describe("weather bloc methods", () => {
  const bloc = new Bloc(new AppState());
  it("can return a CityData object for a single city", async () => {
    expect.assertions(2);
    const data = await bloc.fetchSingleCityData("Paris");
    expect(data.title).toEqual("Paris");
    expect(typeof data.state.currentTempC).toBe("number");
  });
  it("can create CityData object for multiple cities", async () => {
    expect.assertions(3);
    const data = await bloc.fetchAllCitiesData(["Paris", "London"]);
    expect(Object.keys(data)).toHaveLength(2);
    expect(typeof data).toBe("object");
    expect(typeof data["Paris"].state.currentTempC).toBe("number");
  });
  it("can create cityData with past week's history", async () => {
    expect.assertions(2);
    const data = await bloc.fetchCityModelWithHistory("Paris");
    expect(data.title).toEqual("Paris");
    expect(data.state).toHaveProperty("history");
  });
});
