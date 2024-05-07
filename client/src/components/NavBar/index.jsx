import React, { useState } from "react";

import ModalLogout from "../Modal/Logout"; // modal para fazer logout

export default function NavBar () {

    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <ModalLogout isOpen={openModal} isClose={() => setOpenModal(false)} />
            <div className="fixed top-0 w-full h-12 bg-gray-400">
                <button onClick={() => setOpenModal(true)} disabled={openModal} className="fixed top-2 end-4 h-7 w-14 bg-blue-400 hover:bg-blue-500 duration-150 text-white rounded">
                    Sair
                </button>
            </div>
        </>
    );
}