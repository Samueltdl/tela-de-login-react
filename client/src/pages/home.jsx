import React from 'react'

import { useGetAllUsers } from '../services/getAllUsers'

export default function Home() {
  const { usersList, loading } = useGetAllUsers();

  console.log(usersList)

  return (
    <div className="fixed inset-0 bg-blue-200 ">
        <div className='flex h-full justify-center items-center'>
            <p className='text-blue-600 font-bold text-xl border-b border-blue-600'>Parabéns, seu login foi efetuado com sucesso!</p>
        </div>
    </div>
  )
}
