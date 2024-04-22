import React from 'react'

//Componente de input dos dados
function InputField({ label, value, onChange, type, id, required }) {
  return (
    <div className="flex flex-col lg:text-sm lg:w-1/2">
      <label className="font-semibold" htmlFor={id}>{label}</label>
      <input
        className="border rounded"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        id={id}
        required={required}
      />
    </div>
  );
}

//Componente de botão para submeter o formulário
function ButtonCadastrar({label}) {
  return (
    <div className="">
      <button type="submit" className="bg-blue-500 text-sm rounded p-1 text-white hover:scale-105 duration-75">
          {label}
      </button>
    </div>
  );
}


export { InputField, ButtonCadastrar }