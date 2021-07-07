import { matchRoutes } from "react-router-config";
import routes from "../src/router/config";
export default async (req, store) => {
  const matchedRoutes = matchRoutes(routes, req.path);
  let extroute = null;
  if (matchedRoutes) {
    const allRequest = matchedRoutes.reduce((sum, item) => {
      const route = item.route;
      if (route.component && route.component.getInitData) {
        sum.push(route.component.getInitData(store.getState(), true));
      }
      if (req.path === route.path) {
        extroute = route;
      }
      return sum;
    }, []);
    await Promise.all(allRequest);
  }
  return extroute;
};
