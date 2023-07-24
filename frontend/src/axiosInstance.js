import axios from "axios";
import { store } from "./Store";
import { logoutUser } from "./slices/authSlice";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true
})


axiosInstance.interceptors.request.use(function (config) {
    const { auth } = store.getState();
    if (auth.accessToken)
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});


axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
        const { dispatch } = store;
        dispatch(logoutUser());
    }
    return Promise.reject(error);
});

export default axiosInstance;