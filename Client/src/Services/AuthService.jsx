import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const API = `${API_URL}/users`;
const token = localStorage.getItem("token");

export const loginAPI = async (payload) => {

    const res = await axios.post(
        `${API}/login`,
        payload
    );

    return res.data;
};
export const registerAPI = async (payload) => {
    const res = await axios.post(
        `${API}/register`,
        payload
    );

    return res.data;
};


  