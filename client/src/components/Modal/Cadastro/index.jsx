import React from 'react'

//Components
import { BgBlur } from '../../BackgroundBlur';

export const ModalCadastro = ({isOpen, isClose}) => {
  

//Código do modal
if(isOpen){
    return (
        <BgBlur> {
            <div className="bg-white w-1/3 max-h-full overflow-y-auto rounded-md shadow-2xl z-40">
                <div className="flex justify-between pt-4 px-16 ">
                    Cadastro
                    <button className="bg-black text-white font-black w-7 h-7 hover:scale-110 duration-75 rounded" onClick={isClose} >X</button>
                </div>
                
            </div>
        } </BgBlur>
        
    );
}
}
