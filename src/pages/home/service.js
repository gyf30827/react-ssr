import axios from "../../utils/axios";
export const getList = (params) => {
  return axios.get("/api/getList", { params }).then((response) => {
    const res = response.data;
    if (res.code === 200) {
      return res.data;
    }
    return [];
  });
};
