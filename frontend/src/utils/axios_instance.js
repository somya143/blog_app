import axios from "axios";
import jwt_decode from "jwt-decode";

const axios_instance = axios.create();
axios_instance.interceptors.request.use(
  async (req) => {
    const token = req.headers["authorization"];
    const decoded = jwt_decode(token);
    if (decoded.exp * 1000 <= new Date().getTime()) {
      const { data } = await axios.post(`http://localhost:8080/auths/refresh`, {
        refreshToken: localStorage.getItem("refreshToken"),
        token: localStorage.getItem("token"),
      });
      localStorage.removeItem("token");
      if (!data.error) {
        localStorage.setItem("token", data.token);
        req.headers["authorization"] = data.token;
      }
    }
    return req;
  },
  (err) => console.log(err)
);

export { axios_instance };