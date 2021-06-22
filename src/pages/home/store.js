import axios from "../../utils/axios";
import storeFactory from "../../storeFactory";
export default storeFactory({
  namespace: "home",
  state: {
    list: [],
  },
  actions: {
    getList(params, { dispatch }) {
      return axios.get("/api/getList", { params }).then((response) => {
        const res = response.data;
        let data = [];
        if (res.code === 200) {
          data = res.data;
        }
        dispatch({
          type: "home/setList",
          payload: data,
        });
      });
    },
  },
  reducer: {
    setList: (state, payload) => {
      return { ...state, list: payload };
    },
  },
});
