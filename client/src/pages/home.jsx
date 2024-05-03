import React from 'react'

import { useGetAllUsers } from '../services/getAllUsers'

export default function Home() {
  const { usersList, loading } = useGetAllUsers();

  console.log(usersList)

  return (
    <div className="fixed inset-0 bg-blue-200 flex justify-center items-center lg:p-4">
        <div className='grid grid-cols-2 space-x-4 bg-purple-100 rounded-lg w-full h-full'>

          <div className='p-4'>
            infos do usuário logado
          </div>

          <div className='p-4'>
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
  )
}
