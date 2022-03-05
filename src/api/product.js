import axiosClient from "./axiosClient";
const user = JSON.parse( localStorage.getItem("user") );
const token = user ? user.token : null;

axiosClient.defaults.headers.common['Authorization'] = `${token}` 

const productApi = {
    getProduct: function (id) {
        return axiosClient.get(`/products/${id}`);
    },
    getProducts: function () {
        return axiosClient.get('/products');
    },
    searchProduct: function (keyword) {
        return axiosClient.get(`/products?filter[name]=${keyword}`);
    },
    getProductsByCategory: function (categoryId) {
        return axiosClient.get(`/products?filter[category_id]=${categoryId}`);
    }
};
export default productApi;