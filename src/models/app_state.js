const merge = require("lodash.merge");

// I'm opting to create a simple class and pass around an instance
// rather than using something robust like Redux, because this is a small project

export default class AppState {
  constructor() {
    // all the data from the api
    this.state = {
      current: {},
      history: {},
      forecast: {},
    };
    this.isLoading = true;
  }

  updateAppState = newState => {
    this.state = merge(this.state, newState);
    this.isLoading = false;
  };

  haveCityData = city => {
    return this.state.current.hasOwnProperty(city);
  };
}
