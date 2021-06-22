import defaultsDeep from "lodash/defaultsDeep";
const baseStore = {
  state: {
    __server__: false,
  },
  actions: {
    _updateServer_(isServe, { dispatch }, namespace) {
      dispatch({
        type: `${namespace}/_updateServer_`,
        payload: isServe,
      });
    },
  },
  reducer: {
    _updateServer_: (state, __server__) => {
      return { ...state, __server__ };
    },
  },
};
export default (store) => {
  return defaultsDeep(store, baseStore);
};
