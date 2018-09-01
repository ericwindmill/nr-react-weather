import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "@material-ui/core/Card";
import { cities } from "../variables/general";
import "./city_tabs.css";

export default class CityTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { cities } = this.props;
    const { value } = this.state;
    return (
      <Card>
        <Tabs
          value={value}
          onChange={this.handleChange}
          classes={{ flexContainer: "tabs-root" }}
        >
          {cities.map(c => {
            return (
              <Tab
                classes={{ root: "tab-root-button", wrapper: "tab-wrapper" }}
                key={c}
                label={c}
              />
            );
          })}
        </Tabs>
      </Card>
    );
  }
}
