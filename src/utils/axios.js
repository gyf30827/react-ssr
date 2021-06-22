import axios from "axios";
import { isServe } from "./index";

const instance = axios.create({
  baseURL: isServe() ? "http://localhost:5005/" : "",
});
export default instance;
