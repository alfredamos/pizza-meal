import axios from "axios";

const baseURL = "http://localhost:5000/api";

//----> Default config options
const defaultOptions = {
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  
};

//----> Create instance
const instance = axios.create(defaultOptions);

export default instance;
