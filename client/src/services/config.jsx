import axios from "axios";

const Api  = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type":"application/json",
        Accept: "*/*",
        //withCredentials: true,
        Authorization:`Bearer ${localStorage.getItem("token")}`
    },
});

export default Api;