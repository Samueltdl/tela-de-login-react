import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Imagens
import ocultar from '../assets/images/ocultar.png'
import ver from '../assets/images/ver.png'
import monkey from '../assets/images/monkey.jpeg'

//Components
import Loader from '../components/loader';

//Hook de login e verificação de usuário autenticado
import { useLogin, autenticado } from '../services/login';

export default function Login() {

  const {login, loading} = useLogin();
  const navigate = useNavigate()

  const loader = () => {
    return loading ? <Loader /> : null
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
      autenticado()=== true ? navigate("/home") : navigate("/")
    }
  }

  const labelStyle = "text-gray-600 font-semibold"
  const inputStyle = "w-full py-1 bg-gray-100 rounded hover:bg-gray-200 duration-200"

  return (
    <div className="fixed inset-0 flex bg-blue-300">

      {loader()}

      <div className="p-14 shadow-xl rounded-sm shadow-black overflow-y-auto w-1/3 bg-white">
        
        <h1 className='flex text-xl font-semibold text-gray-600'>Faça Login ou cadastre-se</h1>
        <img src={monkey} className=' rounded-full shadow-xl shadow-gray-300 scale-75'/>

        <form onSubmit={(e) => {handleSubmit(e)}} className="space-y-7">

          <div className="flex space-x-3 items-center">

            <label className={labelStyle}>Email</label>
            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} className={inputStyle} />
          
          </div>

          <div className="flex space-x-3 items-center">

            <label className={labelStyle}>Senha</label>
            <input type={showPassword ? "text" : "password"} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputStyle} />
            
            <img src={showPassword ? ocultar : ver} className="w-5 h-5 cursor-pointer hover:scale-110 duration-150" onClick={handlePasswordToggle} />
          
          </div>

          <div className='flex justify-center space-x-5 px-2'>

            <button type="submit" className="bg-green-500 w-1/3 h-7 text-white text-center text-sm font-semibold rounded-lg shadow-md shadow-gray-400 hover:scale-105 duration-150">
              Login
            </button>
            <button type="button" onClick={() => navigate('/cadastro')} className=" bg-red-500 w-1/3 h-7 text-white text-center text-sm font-semibold rounded-lg shadow-md shadow-gray-400 hover:scale-105 duration-150">
              Cadastre-se
            </button>

          </div>

          <div className='flex justify-center pr-3'>

            <button type='button' className="w-32 h-6 text-xs text-gray-400 border-b border-gray-400  hover:border-black hover:text-black duration-200">
              Esqueci minha senha
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}