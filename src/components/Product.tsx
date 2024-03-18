import React, { useContext } from "react";
import { IProduct } from "../interfaces/IProduct";
import { FaTimes, FaEdit } from 'react-icons/fa';
import NavigationContext from "../context/NavigationContext";

interface Props {
    product: IProduct;
}

const Product = ({ product }: Props) => {
    const { handleDeleteClick, editProduct } = useContext(NavigationContext)

    return (
        <div className="product">
            <div className="column">{product.title}</div>
            <div className="column">{product.description}</div>
            <div className="column">${product.price.toFixed(2)}</div>
            <div className="column">{product.brand}</div>
            <div className="column">
                {product.groups.map((group, index) => (
                    <div className="sizeRow" key={index}>
                        {group.name}
                    </div>
                ))}
            </div>
            <div className="column">
                {product.sizes.map((size, index) => (
                    <div className="sizeRow" key={index}>
                        {size.name}: {size.quantity}
                    </div>
                ))}
            </div>
            <div>
                <FaEdit className='deleteButton' color='orange' onClick={() => editProduct(product)} />
                <FaTimes className='deleteButton' color='red' onClick={() => handleDeleteClick(product.id)} />
            </div>

        </div>
    );
};

export default Product;