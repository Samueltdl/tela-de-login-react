import axios from "axios";

const Api  = axios.create({
    baseURL: import.meta.env.REACT_APP_API,
    headers: {
        "Content-Type":"application/json",
        Accept: "*/*",
        //withCredentials: true,
        Authorization:`Bearer ${localStorage.getItem("token")}`
    },
});

export default Api;