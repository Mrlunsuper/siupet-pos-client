import axiosClient from "./axiosClient";

var user = JSON.parse(localStorage.getItem("user"));
var token = user ? user.token : "";

axiosClient.defaults.headers.common["Authorization"] = token;

const orderApi = {
    getAll: () => {
        return axiosClient.get("/orders");
    }
};

export default orderApi;