import axios from 'axios';
import { toast } from 'react-toastify';

const URL = process.env.REACT_APP_API_URL
const axiosbody = axios.create({
    baseURL: URL
});

axiosbody.interceptors.request.use((config) => {
    const newConfig = { ...config };
    newConfig.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return newConfig;
});

axiosbody.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error.message);
});

const axiosform = axios.create({
    baseURL: URL,
});

axiosform.interceptors.request.use((config) => {
    const newConfig = { ...config };
    newConfig.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    newConfig.headers['Content-Type'] = 'multipart/form-data';
    return newConfig;
});

axiosform.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error.message);
});

const axiosget = axios.create({
    baseURL: URL
});

axiosget.interceptors.request.use((config) => {
    const newConfig = { ...config };
    newConfig.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return newConfig;
});

axiosget.interceptors.response.use(
    (res) => res,
    (error) => {
        console.log(error)
    },
);

const axiosauth = axios.create({
    baseURL: URL,
});

axiosauth.interceptors.request.use((config) => {
    const newConfig = { ...config };
    newConfig.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return newConfig;
});


axiosauth.interceptors.response.use((response) => {
    toast.success(`Votre compte a été créer avec succès, un mail de confirmation vous a été envoyer`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    setTimeout(function () { window.location.href = "/connexion"; }, 6000);
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        toast.warn(`${error.response.data.message}`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        setTimeout(function () { window.location.reload(); }, 4000);
        return error;
    }
    return Promise.reject(error.message);
});


const axiostoken = axios.create({
    baseURL: URL,
});

axiostoken.interceptors.request.use((config) => {
    const newConfig = { ...config };
    newConfig.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return newConfig;
});

axiostoken.interceptors.response.use((response) => {
    toast.success(`${response.data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    setTimeout(function () { window.location.href = "/connexion"; }, 6000);
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        toast.warn(`${error.response.data.message}`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        return error;
    }
    return Promise.reject(error.message);
});

const axiosroom = axios.create({
    baseURL: URL,
});

axiosroom.interceptors.request.use((config) => {
    const newConfig = { ...config };
    newConfig.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    newConfig.headers['Content-Type'] = 'multipart/form-data';
    return newConfig;
});

axiosroom.interceptors.response.use((response) => {
    toast.success(`${response.data.message}`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    setTimeout(function () { window.location.href = "/liste-room"; }, 3000);
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        toast.warn(`${error.response.data.message}`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        setTimeout(() => {
            window.location.reload();
        }, 3000);
        return error;
    }
    return Promise.reject(error.message);
});


const axiosConfig = { axiosbody, axiosform, axiosget, axiosauth, axiostoken, axiosroom }
export default axiosConfig;