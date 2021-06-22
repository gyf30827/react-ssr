import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import config from "./config";
export default (
  <Switch>
    <Redirect exact from="/" to="/home" />
    {config.map((item) => {
      return <Route key={item.path} {...item} />;
    })}
    <Redirect from="*" to="/home" />
  </Switch>
);
