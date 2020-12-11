import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import ProductList from "../../components/Products/ProductList";
import Category from "./Category";

const useStyles = makeStyles({
  root: {},
  margin: {
    marginTop: 20
  }
});

function ProductItems() {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item container direction="column">
        <ProductList />
      </Grid>
      <Grid item container direction="column" className={classes.margin}>
        <Category />
      </Grid>
    </Grid>
  );
}

export default ProductItems;
