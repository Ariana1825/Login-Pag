import { StrictMode } from 'react'
// import Pago from './Components/Pago'
// import Compras from './pages/ComprasDetalle'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <App />
 
   </StrictMode>,
)
