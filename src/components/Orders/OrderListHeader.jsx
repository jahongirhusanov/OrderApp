import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import OrderStatus from "./OrderStatusDropdown";

const useStyles = makeStyles({
  root: {
    paddingLeft: "1rem",
    marginBottom: "0.4rem",
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
});

function OrderListHeader() {
  const classes = useStyles();
  return (
    <Grid item xs={12} container direction="row" className={classes.root}>
      <Grid item xs={3} className={classes.orderTypeContainer}>
        <h4 className={classes.orderType}>Order type</h4>
        <OrderStatus />
      </Grid>
      <Grid item xs={8}>
        addBtn
      </Grid>
      <Grid item xs={1}>
        search
      </Grid>
    </Grid>
  );
}

export default OrderListHeader;
