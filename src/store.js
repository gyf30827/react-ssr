import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import getInitState from "./utils/getInitState";
export default () => {
  const __global = {};
  function generateReducer() {
    const reducers = {};
    const storePathList = require
      .context("./pages/", true, /store\.js$/)
      .keys();
    storePathList.forEach((path) => {
      let store = require(`./pages/${path.replace(/^\.\//, "")}`);
      store = store.default || store;
      const { namespace, reducer, state, actions } = store;
      const a = Object.keys(actions).reduce((sum, key) => {
        sum[key] = (payload) => {
          return actions[key](payload, __global.Store, namespace);
        };
        return sum;
      }, {});
      reducers[namespace] = (s = state, action) => {
        let type = action.type.replace(`${namespace}/`, "");
        if (type && reducer[type]) {
          s = reducer[type](s, action.payload);
        }
        return Object.assign({}, s, a);
      };
    });
    return reducers;
  }
  const reducer = combineReducers(generateReducer());
  const state = getInitState();
  const Store = createStore(reducer, state, applyMiddleware(thunk));
  __global.Store = Store;
  return Store;
};
