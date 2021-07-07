import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import config from "./config";
export default (
  <Switch>
    <Redirect exact from="/" to="/home" />
    {renderRoutes(config)}
  </Switch>
);
