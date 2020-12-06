import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import OrderStatus from "./OrderStatusDropdown";

import OrderSearch from "./OrderSearch";

const useStyles = makeStyles({
  root: {
    paddingLeft: "1rem",
    marginBottom: "0.4rem",
    paddingRight: "1rem",
  },
  orderTypeContainer: {
    paddingTop: 0,
    display: "flex",
    justifyContent: "flex-start",
    textAlign: "left",
  },
  orderType: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: 700,
    padding: "0.5rem 0.2rem",
  },
  addOrderIcon: {
    fontSize: "2.2rem",
    color: "#3f51b5",
    margin: "auto",
    cursor: "pointer",
  },
});

function OrderListHeader() {
  const classes = useStyles();
  return (
    <Grid item xs={12} container direction="row" className={classes.root}>
      <Grid item xs={12} sm={4} className={classes.orderTypeContainer}>
        <h4 className={classes.orderType}>Order type</h4>
        <OrderStatus />
        <AddCircleRoundedIcon className={classes.addOrderIcon} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <OrderSearch />
      </Grid>
    </Grid>
  );
}

export default OrderListHeader;
