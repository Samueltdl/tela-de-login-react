import { useState } from "react";

//BaseURL da API
import Api from "./config";

export const useCadastrarUsuario = () => {
  const [cadastrando, setCadastrando] = useState(false);

  const cadastrarUsuario = async (data) => {
    //console.log(data)
    try {
      setCadastrando(true);
      const response = await Api.post("/user", data);
      //console.log(response)

      if (response.status === 201){
        setCadastrando(false);
        return alert(response.data.message)
      }

      setCadastrando(false);
      return alert(`${response.data.message} \n\n Código do erro: ${response.status}`)
    
    } 

    catch (error) {
      setCadastrando(false);
      return alert(`Ocorreu um erro ao cadastrar o usuário. \n\n Código do erro: ${error.message}`)
    }

  };

  return { cadastrarUsuario, cadastrando };
};