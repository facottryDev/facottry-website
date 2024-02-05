import axios from "axios";

const axios_auth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_BASE_URL,
});

axios_auth.defaults.withCredentials = true;
axios_auth.defaults.headers.post["Content-Type"] = "application/json";

export { axios_auth };
