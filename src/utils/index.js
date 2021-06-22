export const isServe = () => {
  try {
    return document.body.getAttribute("environment") === "serve";
  } catch (err) {
    return true;
  }
};
