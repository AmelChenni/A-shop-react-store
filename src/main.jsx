import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from 'react-toastify';

// import { FontAwesomeIcon } from '../node_modules/@fortawesome/fontawesome-free';


import Slider from "react-slick";


import './index.css'
import App from './App.jsx'
import ScrollToTop from './Components/ScrollToTop/ScrollToTop.jsx'
import CartContextProvider from './Components/Context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
<>     
    <CartContextProvider>
    <ToastContainer />
    <App />
    </CartContextProvider>  
</>
)
