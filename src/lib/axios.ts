import axios from "axios";

const axios_auth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_BASE_URL,
});

const axios_admin = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ADMIN_BASE_URL,
});

const axios_config = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CONFIG_BASE_URL,
});

axios_auth.defaults.withCredentials = true;
axios_auth.defaults.headers.post["Content-Type"] = "application/json";

axios_admin.defaults.withCredentials = true;
axios_admin.defaults.headers.post["Content-Type"] = "application/json";

axios_config.defaults.withCredentials = true;
axios_config.defaults.headers.post["Content-Type"] = "application/json";

export { axios_auth, axios_admin, axios_config };