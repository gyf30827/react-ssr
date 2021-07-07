import React from "react";
import Router from "../src/router";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import ejs from "ejs";
import * as path from "path";
import loadData from "./loadData";
import createStore from "../src/store";
export const render = async (req, res) => {
  const store = createStore();
  // 根据匹配路由组件拉取数据
  const route = await loadData(req, store);
  const context = {};
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        {Router}
      </StaticRouter>
    </Provider>
  );
  if (context.url) {
    res.redirect(context.url);
    return;
  }
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
        res.status(500).json({
          success: false,
          code: 500,
          msg: "HTML转译失败",
        });
      } else {
        res.send(str);
      }
    }
  );
};
