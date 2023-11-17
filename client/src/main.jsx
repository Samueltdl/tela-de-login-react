import React from 'react'
import ReactDOM from 'react-dom/client'

//importando o TailwindCSS
import './main.css';

//Roteamento
import Routering from './routes/routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routering />
  </React.StrictMode>,
)