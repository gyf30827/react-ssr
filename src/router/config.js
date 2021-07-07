import About from "../pages/about";
import Home from "../pages/home";
import HomeDetail from "../pages/home/detail";
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
      {
        path: "/home/detail",
        exact: true,
        title: "首页/详情",
        component: HomeDetail,
      },
      {
        path: "/about",
        exact: true,
        title: "关于",
        component: About,
      },
    ],
  },
];
