import Mock from "mockjs";

export const getList = async (req) => {
  return Mock.mock({
    "array|1-20": [
      {
        name: "@cfirst",
        id: "@id",
        desc: "@ctitle",
        time: "@datetime",
      },
    ],
  }).array;
};
