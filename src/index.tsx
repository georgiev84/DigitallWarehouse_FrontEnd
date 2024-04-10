import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductList from './components/ProductList';
import About from './pages/About';
import { NavigationProvider } from './context/NavigationContext';
import NotFound from './shared/NotFound';
import Login from './components/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/products',
    element: <ProductList />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/*',
    element: <NotFound />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <GoogleOAuthProvider clientId='50840905083-r9f54aru9bsjeiucvv1jbknh2bhvndkg.apps.googleusercontent.com'>
    <NavigationProvider>
      <RouterProvider router={router} />
    </NavigationProvider>
  </GoogleOAuthProvider>);