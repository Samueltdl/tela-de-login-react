import React from 'react';

import { useGetAllUsers } from '../services/getAllUsers'; // importando hook de requisição

// components
import Loader from '../components/loader';
import NavBar from '../components/NavBar';

export default function Home() {
  const { usersList, loading } = useGetAllUsers();

  console.log(usersList)

  return (
    <>
    {loading ? <Loader /> : null}
      <div className="fixed inset-0 overflow-y-auto bg-blue-200 flex flex-col justify-center items-center"> 
        <NavBar />
      
        <div className='grid grid-cols-2 space-x-4 rounded-lg w-full h-full p-10'>

          <div className='p-4 bg-white rounded-lg shadow-md shadow-gray-900'>
            infos do usuário logado
          </div>

          <div className='p-4 bg-white rounded-lg shadow-md shadow-gray-900'>
            <div className="grid grid-cols-2 h-10 mx-3 my-1.5 px-4 rounded bg-white hover:bg-gray-100 text-sm">
              <p className="flex items-center">Nome:</p>
              <p className="flex items-center">Nome de usuário:</p>
              
            </div>
            {usersList.map((user) => (
              <div className="grid grid-cols-2 h-20 mx-3 my-1.5 px-4 rounded bg-white hover:bg-gray-100 text-sm">
                <p className="flex items-center">{user.name}</p>
                <p className="flex items-center">{user.username}</p>
              </div>
            ))}
          </div>
          
        </div>

      </div>
    </>
  )
}
