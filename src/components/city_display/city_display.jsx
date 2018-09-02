import React from "react";
import Card from "@material-ui/core/Card";
import "./city_display.css";

export default class CityDisplay extends React.Component {
  render() {
    const { data, isCelsius } = this.props;
    const { currentTempC, currentTempF, condition, conditionIcon } = data.state;
    const iconUrl = "https:" + conditionIcon;
    return (
      <Card classes={{ root: "city-display-root" }}>
        <img className="icon" src={iconUrl} alt="weather icon" />
        <h1 className="title">{data.title}</h1>
        {isCelsius ? (
          <p className="temp">{`${currentTempC} ℃`}</p>
        ) : (
          <p className="temp">{`${currentTempF} ℉`}</p>
        )}
        <p className="condition">{condition}</p>
      </Card>
    );
  }
}
