import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Ganti baseURL sesuai alamat backend-mu
const API = axios.create({
    baseURL: "https://belajaryuk.fly.dev/", 
});

API.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;
