import axios from "axios";

const axios_auth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_BASE_URL,
});

const axios_server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DASHBOARD_BASE_URL,
});

axios_auth.defaults.withCredentials = true;
axios_auth.defaults.headers.post["Content-Type"] = "application/json";

axios_server.defaults.withCredentials = true;
axios_server.defaults.headers.post["Content-Type"] = "application/json";

export { axios_auth };