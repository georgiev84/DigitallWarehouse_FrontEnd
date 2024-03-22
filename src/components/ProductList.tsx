import React, { useState, useEffect, useContext } from 'react'
import Product from './Product'
import { IProduct } from '../interfaces/IProduct';
import './Product.css';
import Layout from '../layouts/Layout';
import ProductForm from './ProductForm';
import NavigationContext from '../context/NavigationContext';
import Spinner from '../shared/Spinner';

type Props = {}

function ProductList({ }: Props) {
  const { fetchProducts, showPopup, editProduct, setShowPopup, handleDeleteClick, products } = useContext(NavigationContext)
  const [loading, setIsLoading] = useState(false)
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState('');


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
        <div className='productPage'>
          <button type="submit" onClick={() => setShowPopup(true)}>Add Product</button>
          <input type="text" className='search' placeholder="Search by product..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <div className='productForm'>
            {showPopup && (
              <>
                <ProductForm />
              </>
            )}
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

            {loading ? (
              <div className='spinner'>
                <Spinner />
              </div>
            ) : (
              <div>
                {products.length && products.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase())).map((product: IProduct, index: React.Key | null | undefined) => (
                  <Product key={index} product={product} />
                ))}
              </div>
            )}

          </div>
        </div>
      </Layout>
    </>
  )
}

export default ProductList