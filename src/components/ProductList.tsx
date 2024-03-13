import React, { useState, useEffect } from 'react'
import Product from './Product'
import { IProduct } from '../interfaces/IProduct';
import './Product.css';
import Header from '../shared/Header';
import Layout from '../layouts/Layout';
import ProductForm from './ProductForm';
import { IProductFormData } from '../interfaces/IProductFormData';

type Props = {}

function ProductList({ }: Props) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const url = '/api/products'

  const fetchProducts = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSubmit = async (formData: IProductFormData) => {
    console.log('Submitted form data:', JSON.stringify(formData),);
    const response = await fetch('https://localhost:7054/api/products/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(formData),
    });
  
    console.log(response)
    if (!response.ok) {
      throw new Error('Failed to submit form data');
    }
  
    const data = await response.json();
    setProducts([data, ...products]);
  };

  return (
    <>
      <Header />
      <div className='productPage'>
        <div className='productForm'>
          <ProductForm onSubmit={handleSubmit} />
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
          <div >
            {products.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductList