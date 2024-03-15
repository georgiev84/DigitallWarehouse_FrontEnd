import React, { createContext, useState } from 'react';
import { IProductFormData, ISubmitProductFormData } from '../interfaces/IProductFormData';
import { IProduct } from '../interfaces/IProduct';
import { IProductEdit } from '../interfaces/IProductEdit';
import { Size } from '../interfaces/Size';

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
});

export const NavigationProvider = ({ children }: any) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const url = '/api/products'
  const [showPopup, setShowPopup] = useState(false);
  const [productEdit, setProductEdit] = useState({
    item: {} as IProduct,
    edit: false
  });

  const handleDeleteClick = async (id: string) => {
    if (window.confirm('Are you sure you want to delete product?')) {
      try {
        const response = await fetch(`https://localhost:7054/api/products/${id}`, {
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
    console.log('test ' + id)
  }

  const handleSubmit = async (formData: ISubmitProductFormData) => {
    console.log('handle submit')
    console.log(formData)
    if (!formData.title || !formData.price || !formData.description || !formData.groupIds || !formData.sizes || !formData.brandId) {
      setShowPopup(true);
      return;
    }
    
    const response = await fetch('https://localhost:7054/api/products/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form data');
    }

    const data = await response.json();
    setProducts([data, ...products]);
  };

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

  const editProduct = async (product: IProduct) => {
    console.log(product)
    setProductEdit({
      item:product,
      edit: true
    })
  }

  const handleUpdate = async (id: string, updItem: ISubmitProductFormData) => {
    console.log(updItem)
    console.log(url+`/${id}`);
    const response = await fetch(url+`/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updItem)
    })

    const data = await response.json();
    console.log('response:')
    console.log(data);

    setProducts(
      products.map((item) => (item.id === id ? { ...item, ...data } : item))
    )
  }

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
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext;
