import axios from "axios";

const Api  = axios.create({
    baseURL: "https://reqres.in/api/",
    headers:{
        "Content-Type":"application/json",
    },
});

export default Api;

//API de login: https://reqres.in/api/
//E-mail: eve.holt@reqres.in
//Senha: cityslicka
//Token: QpwL5tke4Pnpja7X4