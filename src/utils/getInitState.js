export default () => {
  try {
    const value = JSON.parse(decodeURIComponent(window.REDUX_STATE));
    return value;
  } catch (err) {
    return {};
  }
};
