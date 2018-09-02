import React, { Component } from "react";
import "./App.css";
import WeatherBloc from "./blocs/weather_bloc";
import BarChart from "./components/bar_charts/bar_chart";
import CityDisplay from "./components/city_display/city_display";
import CityMenu from "./components/city_menu/city_menu";
import Button from "@material-ui/core/Button";
import Legend from "./components/legend/legend";
import LinearProgress from "@material-ui/core/LinearProgress";
import { cities } from "./variables/general";

class App extends Component {
  constructor(props) {
    super(props);
    this.weatherBloc = new WeatherBloc(this.props.appState);
    this.state = {
      selected: "San Francisco",
      celsius: true,
      loading: true,
    };
  }

  async componentDidMount() {
    let data = await this.weatherBloc.fetchAllCitiesData(cities);
    this.props.appState.updateAppState({
      current: data,
    });
    await this.weatherBloc.updateChartData(
      this.state.selected,
      this.state.celsius,
      true,
    );
    this.props.appState.isLoading = false;
    this.setState({ loading: false });
  }

  async handleChange(city, _) {
    this.setState({ loading: true });
    await this.weatherBloc.updateChartData(city, this.state.celsius, true);
    this.setState({ selected: city, loading: false });
  }

  handleDegreeToggle = async _ => {
    await this.weatherBloc.updateChartData(
      this.state.selected,
      !this.state.celsius,
      false,
    );
    this.setState({ celsius: !this.state.celsius });
  };

  render() {
    const { selected, celsius } = this.state;
    const { appState } = this.props;
    return appState.isLoading ? (
      <LinearProgress />
    ) : (
      <div className="App">
        {this.state.loading ? (
          <LinearProgress />
        ) : (
          <div style={{ height: "5px" }} />
        )}
        <CityMenu handleChange={this.handleChange.bind(this)} />
        <main className="content">
          <CityDisplay
            data={appState.state.current[selected]}
            isCelsius={celsius}
          />
          <BarChart
            title={"History"}
            labels={appState.state.historyLabels}
            isCelsius={celsius}
            series={appState.state.historySeries}
            high={celsius ? 30 : 100}
          />
          <BarChart
            title={"Forecast"}
            labels={appState.state.forecastLabels}
            isCelsius={celsius}
            series={appState.state.forecastSeries}
            high={celsius ? 30 : 100}
          />
          <div className="footer">
            <Legend />
            <Button variant="contained" onClick={this.handleDegreeToggle}>
              {this.state.celsius ? "Toggle to ℉" : "Toggle to ℃"}
            </Button>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
