import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import OrderListTable from "../../components/Orders/OrderListTable";

const useStyles = makeStyles({
  root: {},
});

function OrderItems() {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.root}>
      {/* TODO: top filter, add, search container */}
      <Grid item container direction="column">
        <Grid item xs={12} container direction="row">
          <Grid item xs={4}>
            Order type
          </Grid>
          <Grid item xs={4}>
            Dropdown to filter add Icon
          </Grid>
          <Grid item xs={4}>
            search
          </Grid>
        </Grid>
      </Grid>
      {/* TODO: Orders Table */}
      <Grid item container direction="column">
        <OrderListTable />
      </Grid>
    </Grid>
  );
}

export default OrderItems;
