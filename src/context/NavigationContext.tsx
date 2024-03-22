import React, { createContext, useState, useEffect } from 'react';
import { ISubmitProductFormData } from '../interfaces/IProductFormData';
import { IProduct } from '../interfaces/IProduct';
import { IProductEdit } from '../interfaces/IProductEdit';
import axiosUtils from '../interceptors/axiosUtils';

type NavigationContextType = {
  handleDeleteClick: (value: string) => void;
  fetchProducts: () => Promise<void>;
  products: IProduct[];
  handleSubmit: (formData: ISubmitProductFormData) => Promise<void>;
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdate: (id: string, updItem: ISubmitProductFormData) => Promise<void>;
  editProduct: (item: IProduct) => Promise<void>;
  productEdit: IProductEdit;
  setProductEdit: React.Dispatch<React.SetStateAction<{
    item: IProduct;
    edit: boolean;
  }>>;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
};
const initialProductEditState: IProductEdit = {
  item: {} as IProduct,
  edit: false,
};

const NavigationContext = createContext<NavigationContextType>({
  handleDeleteClick: () => { },
  fetchProducts: () => Promise.resolve(),
  products: [],
  handleSubmit: () => Promise.resolve(),
  showPopup: false,
  setShowPopup: () => { },
  handleUpdate: async () => { },
  editProduct: async () => { },
  productEdit: initialProductEditState,
  setProductEdit: async () => { },
  setProducts: async () => {}
});

export const NavigationProvider = ({ children }: any) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const url = '/api/products'
  const [showPopup, setShowPopup] = useState(false);
  const [productEdit, setProductEdit] = useState({
    item: {} as IProduct,
    edit: false
  });
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
  const [expiresAt, setExpiresAt] = useState(localStorage.getItem("expireRefreshToken"))

  useEffect(() => {
    if (accessToken && refreshToken) {
      const now = new Date();
      //setExpiresAt(now.getTime());
    }
  }, [accessToken, refreshToken]);




  const handleDeleteClick = async (id: string) => {
    if (window.confirm('Are you sure you want to delete product?')) {
      try {
        const response = await fetch(`${url}/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  }


  const handleSubmit = async (formData: ISubmitProductFormData) => {
    try {
      const response = await axiosUtils.post(url, formData, {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      });
  
      if (!response.data) {
        throw new Error('Failed to submit form data');
      }
  
      setProducts([response.data, ...products]);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosUtils.get(url);
  
      if (!response.data) {
        throw new Error('Failed to fetch products');
      }
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const editProduct = async (product: IProduct) => {
    console.log(product)
    setProductEdit({
      item: product,
      edit: true
    })
    setShowPopup(true)
  }

  const handleUpdate = async (id: string, updItem: ISubmitProductFormData) => {
    try {
      const response = await axiosUtils.put(`${url}/${id}`, updItem, {
        headers: {
          'Content-type': 'application/json',
        },
      });
  
      const data = response.data;
  
      setProducts(
        products.map((item) => (item.id === id ? { ...item, ...data } : item))
      );
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <NavigationContext.Provider value={{
      handleDeleteClick,
      fetchProducts,
      products,
      handleSubmit,
      showPopup,
      setShowPopup,
      handleUpdate,
      editProduct,
      productEdit,
      setProductEdit,
      setProducts
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext;
