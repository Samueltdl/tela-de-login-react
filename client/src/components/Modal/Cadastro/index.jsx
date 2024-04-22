import React, { useState } from 'react';

// requisição de cadastro do usuário
import { useCadastrarUsuario } from '../../../services/cadastro';

//Components
import { BgBlur } from '../../BackgroundBlur';
import { InputField, ButtonCadastrar } from '../Items';
import Loader from '../../loader';

//Validadores
import { validateEmail, validateLenPassword, validatePassword } from '../../../utils/validators';

export const ModalCadastro = ({isOpen, isClose}) => {
    const { cadastrarUsuario, cadastrando } = useCadastrarUsuario();

    // dados preenchidos pelo usuário
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        const data = { name, email, username, password, confirmPassword };

        // varificando se todos os dados foram preenchidos
        if (!data.name || !data.email || !data.username || !data.password || !data.confirmPassword ) {
            return alert("Todos os campos precisam ser preenchidos.")
        }
        // validando o email
        if (!validateEmail(data.email)) {
            return alert("Formato de e-mail inválido.")
        }
        // validando o tamanho da senha
        if (!validateLenPassword(data.password)) {
            return
        }
        // validando se as senhas coincidem
        if (!validatePassword(data.password, data.confirmPassword)){
            return
        }

        await cadastrarUsuario(data);
        //window.location.reload();
    }

    //Código do modal
    if(isOpen){
        return (
            <>
            {cadastrando ? <Loader /> : null}
            <BgBlur> {
                <div className="flex flex-col h-auto max-[640px]:w-4/5 lg:w-1/4 md:w-1/3 sm:w-1/2 pb-2 items-center bg-white  rounded-md shadow-2xl z-40">
                    <div className="flex w-full px-4 py-4 border-b justify-between text-xl font-bold">
                        Cadastre-se!
                        <button className="bg-pink-400 text-white w-7 h-7 hover:scale-110 duration-75 rounded" onClick={isClose} >X</button>
                    </div>

                    <form className="flex flex-col justify-center items-center w-full h-full space-y-3" onSubmit={handleSubmit}>
                    <InputField
                        label="Nome"
                        value={name}
                        onChange={setName}
                        type="text"
                        id="name"
                        //required
                    />
                    <InputField
                        label="E-mail"
                        value={email}
                        onChange={setEmail}
                        type="email"
                        id="email"
                        //required
                    />
                    <InputField
                        label="Usuário"
                        value={username}
                        onChange={setUsername}
                        type="text"
                        id="username"
                        //required
                    />
                    <InputField
                        label="Senha"
                        value={password}
                        onChange={setPassword}
                        type="password"
                        id="password"
                        //required
                    />
                    <InputField
                        label="Confirmar Senha"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        type="password"
                        id="confirmPassword"
                        //required
                    />
                    <ButtonCadastrar label="Cadastrar"/>
                    </form>
                </div>
            } </BgBlur> 
            </>
            
        );
    }
    }
