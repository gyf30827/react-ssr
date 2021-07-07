# 服务端渲染 ssr

## 1.定义

服务端渲染就是在浏览器请求页面 URL 的时候，服务端将我们需要的 HTML 文本组装好，并返回给浏览器，这个 HTML 文本被浏览器解析后，不需要经过 Javascript 脚本的处理，即可构建出希望的 DOM 树并展示到页面中，这个服务端组装 HTML 的过程，就叫做服务端渲染

![image.png](https://cdn.nlark.com/yuque/0/2021/png/266522/1624446466533-e1394544-4494-4794-bcaf-8eff3fcc1e81.png#clientId=u046a536e-9c2e-4&from=paste&height=339&id=u4c9156be&margin=%5Bobject%20Object%5D&name=image.png&originHeight=677&originWidth=395&originalType=url&ratio=1&size=116774&status=done&style=stroke&taskId=u02569419-6523-4b6c-92e6-17d06fc214c&width=198)

## 2.原始的服务端渲染

在没有 AJAX 的时候，几乎所有的应用都是服务端渲染（和现在说的服务端渲染不是同一个）
渲染流程：

- 浏览器请求 URL
- 服务端查询数据
- 组装并返回 HTML
- 浏览器渲染

![image.png](https://cdn.nlark.com/yuque/0/2021/png/266522/1624446466560-15b7b10f-761e-437b-8bfa-f5515f77394c.png#clientId=u046a536e-9c2e-4&from=paste&id=u564c0226&margin=%5Bobject%20Object%5D&name=image.png&originHeight=797&originWidth=1328&originalType=url&ratio=1&size=118797&status=done&style=none&taskId=udf997a18-46b7-4a47-aab4-aa631acd746)在当时这种服务端渲染看起来已经是最好的渲染方式了，但是随着业务的日益复杂和 AJAX 的出现，也逐渐暴露了其缺点

- 每次更新页面的一小模块，都需要重新请求一次页面，重新组装一次 HTML
- 前端 Javascript 代码和后端 （jsp, php）代码混杂在一起，使得日益复杂的 WEB 应用变得难以维护
  1.  前端被约束在后端的开发模式中，导致本地开发调试困难
  1.  前后端职责不明，前端沦为切图仔，只能写写页面特效，CSS 等

随着 node.js Angular.js React Vue 的出现，前后端开始分离，前端逐渐摆脱了后端的开发模式，WEB 应用成了独立的应用程序（SPA），开始了客户端渲染时代

## 3.客户端渲染(SPA)

HTML 仅仅作为静态文件，客户端在请求时，服务端不做任何处理，直接以原文件的形式返回给客户端，然后客户端通过执行 JavaScript 获取数据，生成 DOM 渲染 HTML

- 浏览器请求 URL
- 服务端返回空白的 HTML
- 加载 JS CSS
- 执行 JS 获取数据，动态渲染页面

![image.png](https://cdn.nlark.com/yuque/0/2021/png/266522/1624446466623-017d819e-9a17-41f6-94b1-ab94c2ec7e9c.png#clientId=u046a536e-9c2e-4&from=paste&id=ud57d8d12&margin=%5Bobject%20Object%5D&name=image.png&originHeight=876&originWidth=1424&originalType=url&ratio=1&size=162283&status=done&style=none&taskId=ud6b9ab26-be1c-4a87-9eb7-65d7220854d)

随着单页应用（SPA）的发展，逐渐发现单页应用对 SEO 很不友好，而且随着应用的变大，首页加载也会比较缓慢，为了解决以上问题，再次回归服务端渲染

## 4 新时代的服务端渲染

与原始的服务端渲染不同的是现在服务端渲染只针对首次页面请求，后续的页面渲染还会交由客户端渲染

- 浏览器请求 URL
- 前端服务器请求数据 & 拼接 HTML ，返回组装好的 HTML
- 加载 JS,CSS
- 执行 JS 获取数据，动态渲染页面![image.png](https://cdn.nlark.com/yuque/0/2021/png/266522/1624446466648-77e52b39-3975-4773-b666-04fec351092e.png#clientId=u046a536e-9c2e-4&from=paste&id=uabaddc23&margin=%5Bobject%20Object%5D&name=image.png&originHeight=873&originWidth=1622&originalType=url&ratio=1&size=192471&status=done&style=none&taskId=ub022e9ae-624e-416f-9a32-ba343df2ced)

## 5.服务端渲染的利弊

### 优点

- 利于 SEO

有利于 SEO，其实就是有利于爬虫来爬你的页面，然后在别人使用搜索引擎搜索相关的内容时，你的网页排行能靠得更前，这样你的流量就有越高

- 首屏渲染更快，白屏时间短

相对于客户端渲染，服务端渲染在浏览器请求 URL 之后已经得到了一个带有数据的 HTML 文本，浏览器只需要解析 HTML，直接构建 DOM 树就可以。而客户端渲染，需要先得到一个空的 HTML 页面，这个时候页面已经进入白屏，之后还需要经过加载并执行 JavaScript、请求后端服务器获取数据、JavaScript 渲染页面几个过程才可以看到最后的页面。特别是在复杂应用中，由于需要加载 JavaScript 脚本，越是复杂的应用，需要加载的 JavaScript 脚本就越多、越大，这会导致应用的首屏加载时间非常长，进而降低了体验感。

### 缺点

- 代码复杂度增加。为了实现服务端渲染，应用代码中需要兼容服务端和客户端两种运行情况
- 需要更多的服务器负载均衡。由于服务器增加了渲染 HTML 的需求，使得原本只需要输出静态资源文件的 WEB 服务，新增了数据获取的 IO 和渲染 HTML 的 CPU 占用
- 涉及构建设置和部署的更多要求。与可以部署在任何静态文件服务器上的完全静态单页面应用程序 (SPA) 不同，服务器渲染应用程序，需要处于 Node.js server 运行环境。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/266522/1624446466865-51f8c7c7-6b64-44ba-90cc-08b26585bc6b.png#clientId=u046a536e-9c2e-4&from=paste&id=u1ff67b9c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=980&originWidth=1728&originalType=url&ratio=1&size=399838&status=done&style=none&taskId=u9c09559f-5520-4317-bca9-5cbd17bbecd)

## 6.同构

所谓同构，就是让一份代码，既可以在服务端中执行，也可以在客户端中执行，并且执行的效果都是一样的，都是完成这个 html 的组装，正确的显示页面。也就是说，一份代码，既可以客户端渲染，也可以服务端渲染。
常见单页应用主要组成部分

- 路由
- 数据模型
- 模板组件（页面，模块）

要想实现同构首要需要解决以上三部分的前后端共享
![image.png](https://cdn.nlark.com/yuque/0/2021/png/266522/1624446467733-0e755c6c-7111-4e8e-a3b4-672895af581b.png#clientId=u046a536e-9c2e-4&from=paste&id=u905fdcd1&margin=%5Bobject%20Object%5D&name=image.png&originHeight=808&originWidth=1438&originalType=url&ratio=1&size=222481&status=done&style=none&taskId=u6a45e9ec-d630-4ffd-b0c9-ca6136a83ac)

## 7.实践

以 React 同构为例

### 基础的 Nodejs 服务端渲染

```javascript
const express = require("express");
const app = express();
const port = 5001;
app.get("*", async (req, res) => {
  res.send(`<html>
  <head>
      <title>SSR</title>
  </head>
  <body>
      <p>hello world</p>
  </body>
</html>`);
});
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`http://localhost:${port}`);
  }
});
```

服务端在接受到请求后直接返回一段 HTML, 浏览器拿到 html 后直接渲染，不需要加载任何的 js 脚本就可以将内容展示出来

### React 服务端渲染

```javascript
const express = require("express");
import { renderToString } from "react-dom/server";
import React from "react";
import SimpleApp from "../src/simpleApp";
const app = express();
const port = 5002;
app.use(express.static("dist"));
app.get("/", async (req, res) => {
  const content = renderToString(<SimpleApp />);
  res.send(`<html>
  <head>
      <title>SSR</title>
      <link rel="icon" href="/client/favicon.ico" />
  </head>
  <body>
  <div id="root">${content}</div>
  </body>
</html>`);
});
```

通过 react-dom 提供的 renderToString 方法将 React 组件转换为 HTML 片段，将拼接完整的 HTML 返回给客户端，进行渲染。此时会发现页面上绑定的点击事件并没有生效，是因为 renderToString 方法并没有做事件相关的处理

### 引入同构

在返回的 HTML 中加上拉取 js 代码的 script

```javascript
// 服务端
const express = require("express");
import { renderToString } from "react-dom/server";
import React from "react";
import SimpleApp from "../src/simpleApp";
const app = express();
const port = 5002;
app.use(express.static("dist"));
app.get("/", async (req, res) => {
  const content = renderToString(<SimpleApp />);
  res.send(`<html>
  <head>
      <title>SSR</title>
      <link rel="icon" href="/client/favicon.ico" />
  </head>
  <body>
  <div id="root">${content}</div>
  </body>
  <script src="/client/simpleReact.js"></script>
</html>`);
});
//  客户端

import React from "react";
import { hydrate } from "react-dom";
import App from "./simpleApp";
hydrate(<App />, document.getElementById("root"));
```

hydrate 方法对与 render 相同，但它用于在 服务端渲染的容器中对 HTML 的内容进行 hydrate 操作。React 会尝试在已有标记上绑定事件监听器。

### 路由

通过 react-router-dom 提供的 StaticRouter 根据路由配置渲染的 React 组件（ps: 当路由配置中触发 Redirect 时会向 context 对象中注入 重定向信息)

```javascript
const express = require("express");
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import React from "react";
import Router from "../src/simpleApp/router";
const app = express();
const port = 5002;
app.use(express.static("dist"));
app.get("*", async (req, res) => {
  let context = {};
  const content = renderToString(
    <StaticRouter location={req.path} context={context}>
      {Router}
    </StaticRouter>
  );
  if (context.url) {
    res.redirect(context.url);
  } else {
    res.send(`<html>
    <head>
        <title>SSR</title>
        <link rel="icon" href="/client/favicon.ico" />
    </head>
    <body>
    <div id="root">${content}</div>
    </body>
    <script src="/client/simpleReact.js"></script>
  </html>`);
  }
});
```

#### 多级路由渲染

借助 `react-router-dom` 实现多级路由的渲染

```javascript
// 路由配置
import Home from "../pages/home";
import Layout from "../components/layout";
export default [
  {
    path: "/",
    component: Layout,
    routes: [
      {
        path: "/home",
        exact: true,
        title: "首页",
        component: Home,
      },
    ],
  },
];


// 路由渲染
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
// Layout 组件
import React from "react";
import { renderRoutes } from "react-router-config";
export default class App extends React.Component {
  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>我是头部，哈哈哈</div>
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}

```

### 数据管理 Redux

#### 数据注水

在服务端获取到数据后，注入到 window 全局环境中，将服务端的 store 内数据同步到客户端
![image.png](https://cdn.nlark.com/yuque/0/2021/png/266522/1624446467575-5c8f3658-e312-4b7d-8923-fa5d317a6a9a.png#clientId=u046a536e-9c2e-4&from=paste&id=ucb7f3edf&margin=%5Bobject%20Object%5D&name=image.png&originHeight=294&originWidth=709&originalType=url&ratio=1&size=119891&status=done&style=none&taskId=u5be43dab-ae98-4c3f-8b88-06f84292048)

#### 数据脱水

在创建客户端 store 时，将服务端注入的数据初始化到全局的 store 中，完成数据的脱水， 在脱水过程中需要注意服务端渲染页面的的数据请求无需重复发送

```javascript
// 获取到服务端注入的数据
const getInitState = () => {
  try {
    const value = JSON.parse(decodeURIComponent(window.REDUX_STATE));
    return value;
  } catch (err) {
    return {};
  }
};
// 初始化Store state
const Store = createStore(reducer, state, applyMiddleware(thunk));
```

## 8.社区成熟的 SSR 框架

- [Next.js](https://www.nextjs.cn/) react
- [Nuxt.js](https://www.nuxtjs.cn/) vue

## 9.示例项目启动

```bash
npm i
npm run start
```
