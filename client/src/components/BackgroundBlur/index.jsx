import React from 'react'

export const BgBlur = ({children}) => {
  return (
    <div className="fixed inset-0 z-40 flex bg-[rgba(0,0,0,0.1)] backdrop-blur-sm items-center justify-center">
        {children}
    </div>
  )
}