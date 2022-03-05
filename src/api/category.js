import axiosClient from "./axiosClient";
const user = JSON.parse( localStorage.getItem("user") );
const token = user ? user.token : null;

axiosClient.defaults.headers.common['Authorization'] = `${token}`

const categoriesApi = {
    getCategories: function () {
        return axiosClient.get('/categories');
    }
};
export default categoriesApi;