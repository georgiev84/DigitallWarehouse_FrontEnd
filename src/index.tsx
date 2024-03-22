import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductList from './components/ProductList';
import About from './pages/About';
import { NavigationProvider } from './context/NavigationContext';
import NotFound from './shared/NotFound';
import Login from './components/Login';
import axios from 'axios';

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />
  }, 
  {
    path:'/products',
    element: <ProductList />
  },
  {
    path:'/about',
    element: <About />
  },
  {
    path:'/login',
    element: <Login />
  },
  {
    path:'/*',
    element: <NotFound />
  }
])

// axios.interceptors.request.use((request)=>{
//   console.log("global interceptor - "+request);
//   request.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
//   return request;
// })

// axios.defaults.headers.common = {
//   'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
// };

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<NavigationProvider><RouterProvider router={router} /></NavigationProvider>);