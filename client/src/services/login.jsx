import { useState } from "react";

//BaseURL da API
import Api from "./config";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (data) => {

    try {
      setLoading(true);
      const response = await Api.post("/login", data);

      // armazenando dados essenciais no localstorage (não é a forma mais adequada e pretendo mudar isso futuramente)
      localStorage.setItem("userId", response.data.userId)
      localStorage.setItem("token", response.data.token)

      //alert(response.data.message)

      setLoading(false);

    } catch (error) {
      setLoading(false);

      if (error.response) {
        // a resposta foi recebida, mas tem um status diferente de 2xx
        const errorMessage = error.response.data.message || "Ocorreu um erro ao fazer login.";
        alert(`${errorMessage}\n\nCódigo do erro: ${error.response.status}`);
      
      } else if (error.request) {
        // a solicitação foi feita, mas não recebeu resposta
        alert("Não foi recebida resposta do servidor.");
      
      } else {
        // ocorreu um erro durante a configuração da solicitação
        alert("Ocorreu um erro ao enviar a requisição.");
      }
    }
  };

  return { login, loading };
};
