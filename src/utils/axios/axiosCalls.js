import axios from "axios";
import { BASE_URL } from "../../constants/urls";

const postCall = (prefix_url, data, options) => {
  return axios.post(BASE_URL + prefix_url, data, options);
};
const putCall = (prefix_url, data) => {
  return axios.put(BASE_URL + prefix_url, data);
};
const getCall = (prefix_url, options) => {
  return axios.get(BASE_URL + prefix_url, options);
};
const deleteCall = (prefix_url, options) => {
  return axios.delete(BASE_URL + prefix_url, options);
};
const initialGetCall = (prefix_url, options) => {
  return axios.get(BASE_URL + prefix_url, options);
};

export { postCall, putCall, getCall, deleteCall, initialGetCall };
