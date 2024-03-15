import React, { useState, useEffect, useContext } from 'react'
import Product from './Product'
import { IProduct } from '../interfaces/IProduct';
import './Product.css';
import Header from '../shared/Header';
import Layout from '../layouts/Layout';
import ProductForm from './ProductForm';
import { IProductFormData } from '../interfaces/IProductFormData';
import NavigationContext, { NavigationProvider } from '../context/NavigationContext';
import ErrorPopup from '../popups/ErrorPopup';

type Props = {}

function ProductList({ }: Props) {
  const { products, fetchProducts, showPopup, setShowPopup } = useContext(NavigationContext)


  useEffect(() => {
    fetchProducts()
  }, [])


  return (
    <>
      <Header />
      {showPopup && <ErrorPopup message={'Please fill all fields!'} />}
      <div className='productPage'>
        <div className='productForm'>
          <ProductForm />
        </div>
        <div className="productList">
          <div className="productListHeader">
            <div className="columnHeader">Title</div>
            <div className="columnHeader">Description</div>
            <div className="columnHeader">Price</div>
            <div className="columnHeader">Brand</div>
            <div className="columnHeader">Groups</div>
            <div className="columnHeader">Sizes</div>
          </div>
          <div>
            {products.length ? products.map((product: IProduct, index: React.Key | null | undefined) => (
              <Product key={index} product={product} />
            )) : <div>No products found</div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductList