import axios from "axios";

const Api  = axios.create({
    baseURL: "http://localhost:8080",
    headers:{
        "Content-Type":"application/json",
        Accept:"*/*",
        withCredentials: true
        //Authorization: localStorage.getItem("token")
    },
});

export default Api;

