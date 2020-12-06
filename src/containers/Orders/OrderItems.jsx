import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import OrderListTable from "../../components/Orders/OrderListTable";
import OrderListHeader from "../../components/Orders/OrderListHeader";

const useStyles = makeStyles({
  root: {},
});

function OrderItems() {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.root}>
      {/* TODO: top filter, add, search container */}
      <Grid item container direction="column">
        <OrderListHeader />
      </Grid>
      {/* TODO: Orders Table */}
      <Grid item container direction="column">
        <OrderListTable />
      </Grid>
    </Grid>
  );
}

export default OrderItems;
