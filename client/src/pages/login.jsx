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
      //console.log("Autenticado:", autenticado())
      autenticado() ? navigate("/home") : navigate("/")
      
      //autenticado === true ? navigate("/demandas") : null
    }
  }

  return (
    <div className="fixed inset-0 flex bg-blue-100 justify-center items-center">
      {loader()}
      <div className="shadow-lg z-40 w-1/3 h-1/2 p-11 rounded-2xl bg-blue-200">
        <form onSubmit={(e) => {handleSubmit(e)}} className="grid grid-rows-4 space-y-6">
          <div className="flex space-x-3 items-center">
            <label className="text-white font-semibold">Email</label>
            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} className="w-full py-1 rounded hover:bg-gray-200 duration-150" />
          </div>

          <div className="flex space-x-3 items-center">
          <label className="text-white font-semibold">Senha</label>
            <input type={showPassword ? "text" : "password"} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="py-1 w-full rounded hover:bg-gray-200 duration-150" />
            <img src={showPassword ? ocultar : ver} className="w-5 h-5 cursor-pointer hover:scale-110 duration-150" onClick={handlePasswordToggle} />
          </div>
          <div className='flex space-x-5 px-2'>
          <button type="submit" className=" bg-green-300 w-1/2 text-white text-center font-semibold rounded-lg shadow-lg hover:scale-105 duration-75">
            Login
          </button>
          <button type="button" onClick={() => navigate('/cadastro')} className=" bg-pink-300 w-1/2 text-white text-center font-semibold rounded-lg shadow-lg hover:scale-105 duration-75">
            Cadastre-se
          </button>
          </div>

          <button type='button' className="bg-gray-300 rounded-lg w-1/3 h-1/2 text-xs shadow-lg text-white hover:scale-105 duration-75">
            Esqueci minha senha
          </button>
        </form>
      </div>
    </div>
  );
}
