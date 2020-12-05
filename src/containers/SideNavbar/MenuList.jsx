import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  hoverText: {
    "&:hover": {
      color: "#3F51B5",
    },
  },
});

function MenuList(props) {
  const classes = useStyles();
  return (
    <List>
      <ListItem button component={Link} to={props.toUrl}>
        <ListItemIcon className={classes.hoverText}>
          {props.iconName}
        </ListItemIcon>
        <ListItemText primary={props.title} />
      </ListItem>
    </List>
  );
}

export default MenuList;
