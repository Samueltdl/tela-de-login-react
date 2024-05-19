import React, { useState } from 'react'

//Components
import { BgBlur } from '../../BackgroundBlur';
import Loader from '../../loader';
import { InputField, ButtonCadastrar } from '../Items';

import { validateEmail } from '../../../utils/validators'; // validador do formato de email

export const ModalRecuperarSenha = ({isOpen, isClose}) => {

    const [ email, setEmail ] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            return alert("É necessáio informar seu e-mail.")
        }

        if (!validateEmail(email)) {
            return alert("Formato de e-mail inválido.")
        }

        console.log(email)
    }

    //Código do modal
    if(isOpen){
        return (
            <BgBlur> {
                <div className="flex flex-col h-auto max-[640px]:w-4/5 lg:w-1/4 md:w-1/3 sm:w-1/2 pb-2 items-center bg-white  rounded-md shadow-2xl z-40">

                    <div className="flex w-full px-4 py-4 border-b justify-between text-xl font-bold">
                        <p>Recuperar Senha</p>
                        <button className="bg-red-600 w-7 h-7 text-white hover:scale-110 duration-75 rounded" disabled={false} onClick={isClose} >X</button>
                    </div>
                    
                    <p className='text-sm p-4'>Digite seu endereço de e-mail abaixo que será enviado um código para recuperação de senha.</p>

                    <form className="flex flex-col justify-center items-center w-full h-full space-y-3" onSubmit={(e) => {handleSubmit(e)}}>
                    
                        <InputField
                            label="E-mail"
                            value={email}
                            onChange={setEmail}
                            type="email"
                            id="email"
                            //required
                        />
                        
                        <ButtonCadastrar label="Enviar" disabled={false}/>

                    </form>

                </div>
            } </BgBlur>
        );
    }
}
