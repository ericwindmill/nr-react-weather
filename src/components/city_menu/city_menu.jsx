import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import { cities } from "../../variables/general";

export default class CityMenu extends React.Component {
  render() {
    const { handleChange } = this.props;
    return (
      <Drawer variant="permanent">
        <List>
          {cities.map(c => {
            return (
              <ListItem key={c} button onClick={e => handleChange(c, e)}>
                <ListItemText primary={c} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    );
  }
}
