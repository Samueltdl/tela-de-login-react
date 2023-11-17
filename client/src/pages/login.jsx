import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Imagens
import ocultar from '../assets/images/ocultar.png'
import ver from '../assets/images/ver.png'

//Components
import Loader from '../components/loader';

//Hook de login e verificação de usuário autenticado
import { useLogin, autenticado } from '../services/login';

export default function Login() {

  const {login, loading} = useLogin();
  const navigate = useNavigate()

  const loader = () => {
    if (loading) {
      return <Loader />;
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {email, password}
    console.log(data)

    if (!data.email || !data.password){
      return alert("Todos os campos precisam ser preenchidos!")
    }
    else{
      await login(data)
      console.log("Autenticado:", autenticado())
      autenticado() ? navigate("/home") : navigate("/")
      
      //autenticado === true ? navigate("/demandas") : null
    }
  }

  return (
    <div className="fixed inset-0 flex bg-white justify-center items-center">
      {loader()}
      <div className="flex">
        <form onSubmit={(e) => {handleSubmit(e)}} className="flex flex-col space-y-4 items-center">
          <div className="flex flex-col w-full px-2">
            <label className="text-xs">Email</label>
            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} className="border py-1 rounded" />
          </div>

          <div className="flex flex-col w-full px-2">
            <label className="text-xs">Senha</label>
            <div className="flex justify-between space-x-1.5 items-center">
              <input type={showPassword ? "text" : "password"} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border py-1 w-full rounded" />
              <img src={showPassword ? ocultar : ver} className="w-5 h-5 hover:scale-110 cursor-pointer" onClick={handlePasswordToggle} />
            </div>
          </div>

          <div className="flex flex-col items-center w-full px-2 space-y-2">
            <button type="submit" className="bg-orange-500 text-white text-center font-semibold w-full rounded shadow-lg hover:scale-105 py-1 duration-75">
              Entrar
            </button>
            <button className="border-b w-1/2 text-gray-500 text-xs hover:scale-105 py-1 duration-75">
              Esqueci minha senha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
