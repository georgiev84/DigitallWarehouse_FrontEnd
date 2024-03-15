import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductList from './components/ProductList';
import About from './pages/About';
import { NavigationProvider } from './context/NavigationContext';

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
  }
])
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<NavigationProvider><RouterProvider router={router} /></NavigationProvider>);