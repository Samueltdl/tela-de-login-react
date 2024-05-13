import React from 'react';

import { useGetUsersByPage, useGetUserLoged } from '../services/getUser'; // importando hook de requisição

// components
import Loader from '../components/loader';
import NavBar from '../components/NavBar';

export default function Home() {

  const page = 1
  const perPage = 5
  
  const { user } = useGetUserLoged();
  const { usersList, loading } = useGetUsersByPage(page, perPage);
  //console.log(user);
  //console.log(usersList);
  
  const containerStyle = 'inset-0 p-4 bg-white rounded-lg shadow-md shadow-gray-900'
  
  const userLogedInfo = (label, info) => {
    return (
      <div className='flex space-x-2 text-md'>
          <p className='font-semibold'>{label}</p>
          <p>{info}</p>
        </div>
    );
  }
  
  return (
    <>
    {loading ? <Loader /> : null}
      <div className="fixed inset-0 overflow-y-auto bg-blue-200 flex flex-col justify-center items-center"> 
        <NavBar />
      
        <div className='grid grid-cols-2 w-full gap-x-20 rounded-lg px-24'>

          <div className={containerStyle}>
            
            <div className='flex flex-col space-y-3'>

              <h1 className='text-center text-xl font-semibold border-b border-gray-300'>Minhas informações:</h1>

              <div className='flex flex-col space-y-4'>
                {userLogedInfo('ID:', user.userId)}
                {userLogedInfo('Nome:', user.name)}
                {userLogedInfo('E-mail:', user.email)}
                {userLogedInfo('Nome de usuário:', user.username)}
                {userLogedInfo('Data de registro:', user.registrationDate.split('T')[0])}
              </div>

            </div>

          </div>

          <div className={containerStyle}>
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
