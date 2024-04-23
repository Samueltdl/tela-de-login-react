import React from "react";

//Autenticação
import { authenticate } from "../utils/auth/authenticate.jsx";

//Páginas
import Login from "../pages/login";

const privateRoutes = ({children}) => {
    //console.log(autenticado())
    return authenticate() ? children : <Login />
}

export default privateRoutes;