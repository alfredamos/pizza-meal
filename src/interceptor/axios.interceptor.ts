import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";
import { storeToRefs } from "pinia";

const baseURL = "http://localhost:5000/api";

//----> Default config options
const defaultOptions = {
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

//----> Create instance
const instance = axios.create(defaultOptions);

//----> Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
  const { token } = storeToRefs(useAuthStore());

  console.log("In interceptor : " + token.value);
  config.headers.Authorization = `Bearer ${token.value}`;
  return config;
});

//----> Response interceptor.
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("In response-interceptor,  response : ", error);
    /* if (error.response.status === 401) {
      console.log("Invalid credentials or expired token, please login!");
      window.location.href = "/login";
    } else if (error.response.status === 403) {
      console.log("You are not authorized to view this page, please login!");
      window.location.href = "/not-allowed";
      store.dispatch(logout());
    }  else if (error.response.status === 400) {
      console.log("This is a bad request");
      console.log({ errorMessage: error.message as string});
      store.dispatch(logout());
      window.location.href = "/bad-request";
    }  else {
      console.log({ error });

      console.log("Oops something went wrong, please login!");
      store.dispatch(logout());
    } */
    console.log({ error: error.response });
  }
);

export default instance;
