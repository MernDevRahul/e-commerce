import {Toaster} from 'react-hot-toast'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from "react-router-dom";
import { Provider} from 'react-redux'
import store from './store/store.js';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <Provider store={store}>
    <Toaster/>
  <App />
  </Provider>
  </GoogleOAuthProvider>
  </BrowserRouter>
  
)
