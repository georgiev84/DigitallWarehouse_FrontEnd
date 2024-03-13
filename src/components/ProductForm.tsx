import React, { useState } from 'react';
import { IProductFormData } from '../interfaces/IProductFormData'

interface ProductFormProps {
    onSubmit: (data: IProductFormData) => void;
}

function ProductForm({ onSubmit }: ProductFormProps) {
    const [formData, setFormData] = useState<IProductFormData>({
        title: '',
        description: '',
        price: 0,
        brandId: '',
        groupIds: [],
        sizeInformation: [
            { name: 'Small', sizeId: '33333333-3333-3333-3333-333333333333', quantity: 0 },
            { name: 'Medium', sizeId: '44444444-4444-4444-4444-444444444444', quantity: 0 },
            { name: 'Large', sizeId: '55555555-5555-5555-5555-555555555555', quantity: 0 }
        ]
    });


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    const handleGroupSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGroup = event.target.value;
        setFormData((prevState) => ({
            ...prevState,
            groupIds: prevState.groupIds.includes(selectedGroup) ? prevState.groupIds.filter((id) => id !== selectedGroup) : [...prevState.groupIds, selectedGroup]
        }));
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newQuantity = parseInt(event.target.value);
        if (newQuantity > 0) {
            setFormData((prevState) => ({
                ...prevState,
                sizeInformation: prevState.sizeInformation.map((size, i) => (i === index ? { ...size, quantity: newQuantity } : size))
            }));
        }
    };
    const handleBrandSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBrand = event.target.value;
        setFormData((prevState) => ({
            ...prevState,
            brandId: selectedBrand
        }));
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({
            ...formData,
            brandId: formData.brandId.toLowerCase().trim(),
            groupIds: formData.groupIds.map((id) => id.toLowerCase().trim())
        });
    };

    return (
        <form onSubmit={handleSubmit} className='productFormData'>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />

            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />

            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />

            <label htmlFor="brandId">Brand:</label>
            <select name="brandId" onChange={handleBrandSelect}>
                <option value="">Select a brand</option>
                <option value="11111111-1111-1111-1111-111111111111">Adidas</option>
                <option value="22222222-2222-2222-2222-222222222222">Nike</option>
            </select>

            <h3>Groups:</h3>
            <select multiple name="groupIds" onChange={handleGroupSelect}>
                <option value="">Select a group</option>
                <option value="88888888-8888-8888-8888-888888888888">Male</option>
                <option value="99999999-9999-9999-9999-999999999999">Female</option>
            </select>

            <h3>Sizes:</h3>
            {formData.sizeInformation.map((size, index) => (
                <div key={index} className='sizes'>
                    <label htmlFor={`quantity${index}`}>{size.name}:</label>
                    <input type="number" name={`quantity${index}`} value={size.quantity} onChange={(event) => handleQuantityChange(event, index)} />
                </div>
            ))}

            <button type="submit">Submit</button>
        </form>
    );
};


export default ProductForm;