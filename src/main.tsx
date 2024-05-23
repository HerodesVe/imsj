import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'primereact/resources/themes/saga-blue/theme.css';   // Tema de PrimeReact
import 'primereact/resources/primereact.min.css';           // Estilos base de PrimeReact
import 'primeicons/primeicons.css';                         // Iconos de PrimeIcons
import 'primeflex/primeflex.css';     
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
