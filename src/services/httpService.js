import axios from "axios";
import * as CryptoJS from "crypto-js";
import swal from "sweetalert";
import { statusCode } from "./config";

let baseURl = "https://l25jh1bn73.execute-api.us-west-2.amazonaws.com";
let env = "development";
let crpytoKey = "Falcon@2022";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    config.headers["x-auth-token"] = localStorage.getItem("uid");
    // try {
    //   if (config.data) {
    //     config.data = CryptoJS.AES.encrypt(config.data, crpytoKey).toString();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    if (response?.config?.method != "delete" && response.data)
      response.data = JSON.parse(
        CryptoJS.AES.decrypt(response.data, crpytoKey).toString(
          CryptoJS.enc.Utf8
        )
      );
    return response;
  },
  function (error) {
    if (error?.response?.status && statusCode[error.response.status])
      swal(statusCode[error.response.status]);
    else swal("Error processing request,Please try again");
    if (error?.response?.status == 401) {
      window.location.assign("/login");
    }
    return Promise.reject(error);
  }
);

async function getData(module, moduleId, id) {
  return axios.get(
    baseURl + "/" + env + "/" + module + "?" + moduleId + "=" + id
  );
}
async function postData(module, data) {
  console.log(data, JSON.stringify(data));
  return axios.post(baseURl + "/" + env + "/" + module, data);
}
async function putData(module, data) {
  return axios.put(baseURl + "/" + env + "/" + module, data);
}
async function deleteData(module, moduleId, id) {
  return axios.delete(
    baseURl + "/" + env + "/" + module + "?" + moduleId + "=" + id
  );
}
async function queryData(module) {
  return axios.get(baseURl + "/" + env + "/" + module);
}

export { getData, postData, putData, deleteData, queryData };
