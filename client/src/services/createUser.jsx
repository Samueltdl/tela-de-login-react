import { useState } from "react";

//BaseURL da API
import Api from "./config";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);

  const createUser = async (data) => {
  
    try {
      setLoading(true);
      const response = await Api.post("/user", data);

      alert(response.data.message)
      
      setLoading(false);
    } 

    catch (error) {
      setLoading(false);

      if (error.response) {
        // a resposta foi recebida, mas tem um status diferente de 2xx
        const errorMessage = error.response.data.message || "Ocorreu um erro ao cadastrar o usuário.";
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

  return { createUser, loading };
};
