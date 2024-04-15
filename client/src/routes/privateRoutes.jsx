import React from "react";

//Autenticação
import { autenticado } from "../services/login";

//Páginas
import Login from "../pages/login";

const privateRoutes = ({children}) => {
    //console.log(autenticado())
    return autenticado() ? children : <Login />
}

export default privateRoutes;