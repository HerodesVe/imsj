import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';   // Tema de PrimeReact
import 'primereact/resources/primereact.min.css';                 // Estilos base de PrimeReact
import 'primeicons/primeicons.css';                               // Iconos de PrimeIcons
import 'primeflex/primeflex.css';                                 // Utilidades de PrimeFlex
import './index.css';                                             // Tus estilos personalizados

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
);
