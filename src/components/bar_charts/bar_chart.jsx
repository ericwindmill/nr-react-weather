import React from "react";
import ChartistGraph from "react-chartist";
import Card from "@material-ui/core/Card";

export default class HistoryBarChart extends React.Component {
  render() {
    const { labels, series, month, title, high } = this.props;
    let chartData = {
      labels: labels,
      series: series,
    };
    let options = {
      low: 0,
      high: high,
    };
    return (
      <Card>
        <h1>{title}</h1>
        <ChartistGraph type="Line" options={options} data={chartData} />
        <p>{month}</p>
      </Card>
    );
  }
}
