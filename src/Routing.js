import React from "react";
// import { Grid } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import OrderItems from "./containers/Orders/OrderItems";
import ProductItems from "./containers/Products/ProductItems";
import StoreItems from "./containers/Stores/StoreItems";
import SettingItems from "./containers/Settings/SettingItems";
import Feedback from "./containers/Feedback/Feedback";

// path
export const HomeItemsRoute = "/";
export const OrderItemsRoute = "/order-items";
export const ProductItemsRoute = "/product-items";
export const StoreItemsRoute = "/store-items";
export const SettingItemsRoute = "/setting-items";
export const FeedbackRoute = "/feedback";

function Routing() {
  return (
    // <Grid container>
    <Switch>
      <Route path={HomeItemsRoute} exact component={OrderItems} />
      <Route path={OrderItemsRoute} exact component={OrderItems} />
      <Route path={ProductItemsRoute} exact component={ProductItems} />
      <Route path={StoreItemsRoute} exact component={StoreItems} />
      <Route path={SettingItemsRoute} exact component={SettingItems} />
      <Route path={FeedbackRoute} exact component={Feedback} />
    </Switch>
    // </Grid>
  );
}

export default withRouter(Routing);
