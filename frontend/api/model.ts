import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    withCredentials: true
});

export const registerModel = (data: any) => API.post("/models/register", data);

export const loginModel = (data: any) => API.post("/models/login", data);

export const getModelProfile = () => API.get("/models/profile/me");

export const adminLogin = (data: any) => API.post("/admin/login", data);

export const getAdminProfile = () => API.get("/admin/profile/me");

export const adminRegister = (data: any) => API.post("/admin/register", data);

export default API;
