import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import WeatherBloc from "./blocs/weather_bloc";

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );

    return isLoading;
  }
}

export default App;
