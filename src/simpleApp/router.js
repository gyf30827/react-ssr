import React from "react";
import Page1 from "./page1";
import Page2 from "./page2";
import { Route, Switch, Redirect } from "react-router";

export default (
  <Switch>
    <Route exact path="/page1" component={Page1}></Route>
    <Route exact path="/page2" component={Page2}></Route>
    <Redirect from="*" to="/page1" />
  </Switch>
);
