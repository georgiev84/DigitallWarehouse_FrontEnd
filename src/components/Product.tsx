import React from "react";
import { IProduct } from "../interfaces/IProduct";

interface Props {
    product: IProduct;
}

const Product = ({ product }: Props) => {
    return (
        <div className="product">
            <div className="column">{product.title}</div>
            <div className="column">{product.description}</div>
            <div className="column">Price: ${product.price.toFixed(2)}</div>
            <div className="column">Brand: {product.brand}</div>
            <div className="column">Groups: {product.groups.join(', ')}</div>
            <div className="column">
                {product.sizes.map((size, index) => (
                    <div className="sizeRow" key={index}>
                        {size.name}: {size.quantityInStock} in stock
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;