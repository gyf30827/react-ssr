import React from "react";
import routes from "../src/router/config";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Layout from "../src/components/layout";
import ejs from "ejs";
import * as path from "path";
import { matchRoutes } from "react-router-config";
import createStore from "../src/store";

export const render = (req) => {
  const store = createStore();
  return new Promise(async (resolve, reject) => {
    const matchedRoutes = matchRoutes(routes, req.path);
    let Component = null,
      route = null;
    if (
      matchedRoutes &&
      matchedRoutes.length > 0 &&
      matchedRoutes[0].route.component
    ) {
      Component = matchedRoutes[0].route.component;
      route = matchedRoutes[0].route;
      Component.getInitData &&
        (await Component.getInitData(store.getState(), true));
      Component.__server__ = true;
    }
    const content = renderToString(
      <Layout store={store}>
        <StaticRouter location={req.path}>
          {Component && <Component />}
        </StaticRouter>
      </Layout>
    );
    const title = (route || {}).title || "ssr",
      state = encodeURIComponent(JSON.stringify(store.getState()));
    ejs.renderFile(
      path.resolve(process.cwd(), "./dist/serve/index.html"),
      {
        content,
        title,
        state,
      },
      {
        rmWhitespace: true,
      },
      (err, str) => {
        if (err) {
          reject(err);
        } else {
          resolve(str);
        }
      }
    );
  });
};
