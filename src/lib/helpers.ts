import axios from "axios";

export const isAuth = async () => {
  
};

const axios_instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axios_instance.defaults.withCredentials = true;
axios_instance.defaults.headers.post["Content-Type"] = "application/json";

export { axios_instance };
