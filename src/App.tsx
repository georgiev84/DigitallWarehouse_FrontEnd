import React from 'react';
import './App.css';
import ProductList from './components/ProductList';
import Layout from './layouts/Layout';
import { Link } from 'react-router-dom';
import Header from './shared/Header';
import { NavigationProvider } from './context/NavigationContext';

function App() {
  return (
    <NavigationProvider>
        <Header />
        <div className="content">
          Home Page
        </div>
    </NavigationProvider>
  );
}

export default App;
