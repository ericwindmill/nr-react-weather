import React, { Component } from "react";
import "./App.css";
import WeatherBloc from "./blocs/weather_bloc";
import CityTabs from "./components/city_tabs";
import * as vars from "./variables/general";

class App extends Component {
  constructor(props) {
    super(props);
    this.weatherBloc = new WeatherBloc();
  }

  async componentDidMount() {
    let data = await this.weatherBloc.fetchAllCitiesData();
    this.props.appState.updateAppState(data);
    // Tell react to re-render;
    this.forceUpdate();
  }

  render() {
    let isLoading = this.props.appState.isLoading ? (
      <h1>Loading</h1>
    ) : (
      <div className="App">
        <CityTabs cities={vars.cities} />
      </div>
    );

    return isLoading;
  }
}

export default App;
