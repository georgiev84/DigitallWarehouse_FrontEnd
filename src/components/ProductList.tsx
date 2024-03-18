import React, { useState, useEffect, useContext } from 'react'
import Product from './Product'
import { IProduct } from '../interfaces/IProduct';
import './Product.css';
import Layout from '../layouts/Layout';
import ProductForm from './ProductForm';
import NavigationContext, { NavigationProvider } from '../context/NavigationContext';
import ErrorPopup from '../popups/ErrorPopup';
import Spinner from '../shared/Spinner';

type Props = {}

function ProductList({ }: Props) {
  const { products, fetchProducts, showPopup, setShowPopup } = useContext(NavigationContext)
  const [loading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchProducts();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);


  return (
    <>
      <Layout>
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
              <div className="columnHeader"></div>
            </div>
            <div>
              {loading ? (
                <div className='spinner'>
                  <Spinner />
                </div>
              ) : (
                <div>
                  {products.length && products.map((product: IProduct, index: React.Key | null | undefined) => (
                    <Product key={index} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ProductList