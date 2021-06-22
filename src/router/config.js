import About from "../pages/about";
import Home from "../pages/home";

export default [
  {
    path: "/home",
    exact: true,
    title: "首页",
    component: Home,
  },
  {
    path: "/about",
    exact: true,
    title: "关于",
    component: About,
  },
];
