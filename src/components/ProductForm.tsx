import React, { useContext, useState, useEffect } from 'react';
import { IProductFormData, ISubmitProductFormData } from '../interfaces/IProductFormData'
import NavigationContext from '../context/NavigationContext';

interface ProductFormProps {
}

function ProductForm({ }: ProductFormProps) {
    const [formData, setFormData] = useState<IProductFormData>({
        id: '',
        title: '',
        description: '',
        price: 0,
        brand: '',
        brandId: '',
        groups: [],
        sizes: [
            { name: 'Small', id: '33333333-3333-3333-3333-333333333333', quantity: 0 },
            { name: 'Medium', id: '44444444-4444-4444-4444-444444444444', quantity: 0 },
            { name: 'Large', id: '55555555-5555-5555-5555-555555555555', quantity: 0 }
        ]
    });

    const { handleSubmit, productEdit, handleUpdate } = useContext(NavigationContext);

    useEffect(() => {
        if (productEdit.edit === true) {
            console.log('Groups:', productEdit.item.groups);
            setFormData({
                ...formData,
                title: productEdit.item.title || '',
                description: productEdit.item.description || '',
                price: productEdit.item.price || 0,
                brandId: productEdit.item.brandId || '11111111-1111-1111-1111-111111111111',
                groups: productEdit.item.groups || [
                    { name: 'Group1', id: '88888888-8888-8888-8888-888888888888' },
                    { name: 'Group2', id: '99999999-9999-9999-9999-999999999999' }
                ],
                sizes: productEdit.item.sizes || [
                    { name: 'Small', id: '33333333-3333-3333-3333-333333333333', quantity: 10 },
                    { name: 'Medium', id: '44444444-4444-4444-4444-444444444444', quantity: 20 },
                    { name: 'Large', id: '55555555-5555-5555-5555-555555555555', quantity: 30 }
                ]
            });
        }
    }, [productEdit]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    const handleGroupSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGroupId = event.target.value;
        console.log('Selected Group ID:', selectedGroupId);
    
        const groupExistsIndex = formData.groups.findIndex(group => group.id === selectedGroupId);
        if (groupExistsIndex !== -1) {
            const updatedGroups = formData.groups.filter((group, index) => index !== groupExistsIndex);
            setFormData(prevState => ({ ...prevState, groups: updatedGroups }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                groups: [
                    ...prevState.groups,
                    {
                        id: selectedGroupId,
                        name: 'New Group',
                    }
                ]
            }));
        }
    };
    
    

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity)) { // Ensure it's a valid number
            setFormData((prevState) => ({
                ...prevState,
                sizes: prevState.sizes.map((size, i) => (i === index ? { ...size, quantity: newQuantity } : size))
            }));
        }
    };
    const handleBrandSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBrand = event.target.value;
        console.log('handleBrandSelect')
        setFormData((prevState) => ({
            ...prevState,
            brandId: selectedBrand
        }));

    };

    const handleAddProduct = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData)
        const sendData: ISubmitProductFormData = {
            title: formData.title,
            description: formData.description,
            price: formData.price,
            brandId: (formData.brandId ?? "").toLowerCase().trim(),
            groupIds: formData.groups.map(group => group.id.toLowerCase().trim()),
            sizes: formData.sizes,
        };

        if (productEdit.edit === true) {
            handleUpdate(productEdit.item.id, sendData)
            console.log('handleupdate')
        } else {
            handleSubmit({
                ...sendData,
                brandId: formData.brandId.toLowerCase().trim(),
                groupIds: formData.groups.map(group => group.id.toLowerCase().trim())
            });
        }

        setFormData({
            id: '',
            title: '',
            description: '',
            price: 0,
            brand: '',
            brandId: '',
            groups: [],
            sizes: [
                { name: 'Small', id: '33333333-3333-3333-3333-333333333333', quantity: 0 },
                { name: 'Medium', id: '44444444-4444-4444-4444-444444444444', quantity: 0 },
                { name: 'Large', id: '55555555-5555-5555-5555-555555555555', quantity: 0 }
            ]
        });
    };

    return (
        <form onSubmit={handleAddProduct} className='productFormData'>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />

            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />

            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />

            <label htmlFor="brandId">Brand:</label>
            <select name="brandId" onChange={handleBrandSelect} value={formData.brandId}>
                <option value="">Select a brand</option>
                <option value="11111111-1111-1111-1111-111111111111" selected={productEdit.edit && formData.brandId === '11111111-1111-1111-1111-111111111111'}>Adidas</option>
                <option value="22222222-2222-2222-2222-222222222222" selected={productEdit.edit && formData.brandId === '22222222-2222-2222-2222-222222222222'}>Nike</option>
            </select>

            <h3>Groups:</h3>
            <select multiple name="groupIds" onChange={handleGroupSelect} value={formData.groups.map(group => group.id)} >
                <option value="88888888-8888-8888-8888-888888888888">Male</option>
                <option value="99999999-9999-9999-9999-999999999999">Female</option>
            </select>

            <h3>Sizes:</h3>
            {formData.sizes.map((size, index) => (
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