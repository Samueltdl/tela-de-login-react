import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Imagens
import ocultar from '../assets/images/ocultar.png'
import ver from '../assets/images/ver.png'
import monkey from '../assets/images/monkey.jpeg'

//Components
import Loader from '../components/loader';
import { ModalCadastro } from '../components/Modal/Cadastro';
import { ModalRecuperarSenha } from '../components/Modal/RecuperarSenha';

//Hook de login
import { useLogin } from '../services/login';

// validador de usuário autenticado
import { authenticate } from '../utils/auth/authenticate';

export default function Login() {

  const {login, loading} = useLogin();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const [openModalCadastro, setOpenModalCadastro] = useState(false);
  const [openModalRecuperarSenha, setOpenModalRecuperarSenha] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {email, password}
    //console.log(data)

    if (!data || !data.email || !data.password){
      return alert("Todos os campos precisam ser preenchidos!")
    }
    else{
      await login(data)
      //console.log("Autenticado:", autenticado())
      authenticate()=== true ? navigate("/home") : navigate("/")
    }
  }

  // styles dos inputs e das labels de email e password, para não ficarem repetidos no html
  const labelStyle = "text-gray-600 font-semibold lg:text-base md:text-sm"
  const inputStyle = "w-full py-1 bg-gray-100 rounded hover:bg-gray-200 duration-200"

  return (
    <div className="fixed inset-0 bg-blue-300 overflow-y-auto">
      
      {loading ? <Loader /> : null}

      <ModalCadastro isOpen={openModalCadastro} isClose={() => setOpenModalCadastro(!openModalCadastro)} />
      <ModalRecuperarSenha isOpen={openModalRecuperarSenha} isClose={() => setOpenModalRecuperarSenha(!openModalRecuperarSenha)} />

      <div className="min-h-full w-full min-[1000px]:w-1/3 min-[850px]:w-5/12 min-[650px]:w-1/2 min-[1450px]:w-1/4 bg-white p-10 rounded-sm shadow-xl shadow-black">
        
        <h1 className='text-xl font-semibold text-gray-600'>Faça Login ou cadastre-se</h1>
        <img src={monkey} className='rounded-full shadow-xl shadow-gray-300 scale-75'/>

        <form onSubmit={(e) => {handleSubmit(e)}} className="space-y-7">

          <div className="flex flex-col">

            <label className={labelStyle}>E-mail</label>
            <input type="email" name="email" id="email" onChange={(e) => setemail(e.target.value)} className={inputStyle} />
          
          </div>

          <div className="flex flex-col">

            <label className={labelStyle}>Senha</label>
            <div className='flex flex-row space-x-2 items-center'>
              <input type={showPassword ? "text" : "password"} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputStyle} />
              <img src={showPassword ? ocultar : ver} className="w-6 h-6 cursor-pointer hover:scale-110 duration-150" onClick={handlePasswordToggle} />
            </div>
          
          </div>

          <div className='flex justify-center space-x-5 px-2'>

            <button type="submit" disabled={loading} className="bg-green-500 w-1/3 h-7 text-white text-center text-sm font-semibold rounded-lg shadow-md shadow-gray-400 hover:scale-105 duration-150">
              Login
            </button>
            <button type="button" onClick={() => setOpenModalCadastro(!openModalCadastro)} className=" bg-red-500 w-1/3 h-7 text-white text-center text-sm font-semibold rounded-lg shadow-md shadow-gray-400 hover:scale-105 duration-150">
              Cadastre-se
            </button>

          </div>

          <div className='flex justify-center'>

            <button type='button' onClick={() => setOpenModalRecuperarSenha(!openModalRecuperarSenha)} className="w-32 h-6 text-xs text-gray-400 border-b border-gray-400 hover:border-black hover:text-black duration-200">
              Esqueci minha senha
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}