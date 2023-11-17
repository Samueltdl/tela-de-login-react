import { useState } from "react";

//BaseURL da API
import Api from "./config";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    try {
      setLoading(true);

      const response = await Api.post("/login", data);

      if (response) {
        setLoading(false);

        //console.log(response.data)

        localStorage.setItem("email", response.data.email)
        localStorage.setItem("token", response.data.token)

        //alert("Login efetuado com sucesso!")
      }

    } catch (error) {
      //console.log(error);
      setLoading(false);
      alert("Ocorreu um erro ao fazer login\n\n" + "Código do erro: " + error.message);
    }
  };


  return { login, loading };
};

export const autenticado = () => {
  const token = localStorage.getItem("token");
  return token && token !== undefined  ? true : false
}