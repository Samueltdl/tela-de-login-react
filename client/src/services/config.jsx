import axios from "axios";

const Api  = axios.create({
    baseURL:"http://localhost:3000/",
    headers:{
        "Content-Type":"application/json",
        Accept:"*/*",
        withCredentials: true,
        Authorization:`Bearer ${localStorage.getItem("token")}`
    },
});

export default Api;