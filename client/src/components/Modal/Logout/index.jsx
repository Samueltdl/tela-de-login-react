import React from 'react'
import { useNavigate } from "react-router-dom";

//Components
import { BgBlur } from '../../BackgroundBlur';

export default function ModalLogout ({isOpen, isClose}) {
    const navigate = useNavigate()

    // função para fazer o logout do usuário
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear(); // limpa as informações do localStorage
        navigate("/"); // redireciona o usuário para a tela de login
        // aqui pode ser interessante implementar uma chamada para o servidor para que invalide o token do usuário ao fazer logout
    }
  
    if(isOpen){
        return (
            <BgBlur> {
                <div className="grid grid-rows-3 bg-white w-60 h-40 justify-center items-center rounded-md shadow-xl shadow-gray-400 z-40">
                    <div className="flex justify-between">
                        <p className='font-semibold'>Logout</p>
                        <button type="button" className="bg-blue-400 text-white font-bold w-7 h-7 hover:bg-blue-500 duration-150 rounded" onClick={isClose} >X</button>
                    </div>
                    <div className='text-center'>
                        Deseja realmente sair?
                    </div>
                    <div className='text-center'>
                        <button type="button" onClick={(e) => handleLogout(e)} className="bg-blue-400 text-white w-20 h-8 hover:bg-blue-500 duration-150 rounded">Sair</button>
                    </div>
                </div>
            } </BgBlur>
        );
    }
}
