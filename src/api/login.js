import axiosClient from "./axiosClient";

const loginApi = {
  login: (username, password) => {
    return axiosClient.post("/login", {
      username: username,
      password: password,
    });
  },
};

export default loginApi;
