import React from "react";
import Card from "@material-ui/core/Card";
import "./legend.css";

export default class Legend extends React.Component {
  render() {
    return (
      <Card classes={{root: "legend-root"}}>
        <div className="legend-line high" />
        <p>High</p>
        <div className="legend-line avg" />
        <p>Avg</p>
        <div className="legend-line low" />
        <p>Low</p>
      </Card>
    );
  }
}
