import React, { useContext, useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'
import { IProductFormData, ISubmitProductFormData } from '../interfaces/IProductFormData'
import NavigationContext from '../context/NavigationContext';

interface ProductFormProps {

}
type ErrorMessages = React.ReactNode[];
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

    const { handleSubmit, productEdit, handleUpdate, setShowPopup, setProductEdit } = useContext(NavigationContext);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        console.log("Product Edit changed:", productEdit); // Verify if useEffect is being called
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
    }, [productEdit.edit]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    const handleGroupSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedGroupId = event.target.value;
        const isChecked = event.target.checked;

        // Check if the selected group already exists in the formData.groups array
        const groupExistsIndex = formData.groups.findIndex(group => group.id === selectedGroupId);

        if (isChecked) {
            // If the group is not already selected, add it to the formData.groups array
            if (groupExistsIndex === -1) {
                const selectedGroup = {
                    id: selectedGroupId,
                    name: event.target.name // Retrieve the group name from the checkbox name
                };
                setFormData(prevState => ({
                    ...prevState,
                    groups: [...prevState.groups, selectedGroup]
                }));
            }
        } else {
            // If the group is already selected, remove it from the formData.groups array
            if (groupExistsIndex !== -1) {
                const updatedGroups = formData.groups.filter(group => group.id !== selectedGroupId);
                setFormData(prevState => ({
                    ...prevState,
                    groups: updatedGroups
                }));
            }
        }
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity)) {
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
        const checkErrors = validateForm(formData);
        setErrors(checkErrors)

        if (Object.keys(checkErrors).length > 0) {
            setErrors(checkErrors)
        } else {


            const sendData: ISubmitProductFormData = {
                title: formData.title,
                description: formData.description,
                price: formData.price,
                brandId: (formData.brandId ?? "").toLowerCase().trim(),
                groupIds: formData.groups.map(group => group.id.toLowerCase().trim()),
                sizes: formData.sizes,
            };

            if (productEdit.edit === true) {
                handleUpdate(productEdit.item.id, { ...productEdit.item, ...sendData });
                setProductEdit({ ...productEdit, edit: false });
            } else {
                handleSubmit({
                    ...sendData,
                    brandId: formData.brandId.toLowerCase().trim(),
                    groupIds: formData.groups.map(group => group.id.toLowerCase().trim())
                });

            }

            resetFormData()
            setShowPopup(false)
        }

    };

    const resetFormData = () => {
        console.log('reset form data')
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

        setProductEdit({ ...productEdit, edit: false });
    };
    function validateForm(formData: any): { [key: string]: string } {
        const errors: { [key: string]: string } = {};

        if (!formData.title || !formData.title.trim()) {
            errors.title = 'Title is required';
        }

        if (!formData.description || !formData.description.trim()) {
            errors.description = 'Description is required';
        }

        if (isNaN(formData.price) || formData.price <= 0) {
            errors.price = 'Price must be a positive number';
        }

        if (!formData.brandId || !formData.brandId.trim()) {
            errors.brand = 'Brand is required';
        }

        if (formData.groups.length === 0) {
            errors.groups = 'At least one group must be selected';
        }


        return errors;
    }

    return (
        <>
            <FaTimes className='closeButton' color='black' onClick={() => {setShowPopup(false); resetFormData();}} />
            <form onSubmit={handleAddProduct} className='productFormData'>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                {errors.title && <span className='error'>{errors.title}</span>}

                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                {errors.description && <span className='error'>{errors.description}</span>}

                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
                {errors.price && <span className='error'>{errors.price}</span>}

                <label htmlFor="brandId">Brand:</label>
                <select name="brandId" onChange={handleBrandSelect} value={formData.brandId}>
                    <option value="">Select a brand</option>
                    <option value="11111111-1111-1111-1111-111111111111">Adidas</option>
                    <option value="22222222-2222-2222-2222-222222222222" >Nike</option>
                </select>
                {errors.brand && <span className='error'>{errors.brand}</span>}
                <hr />

                <label>Groups:</label>
                {[
                    { id: '88888888-8888-8888-8888-888888888888', name: 'Male' },
                    { id: '99999999-9999-9999-9999-999999999999', name: 'Female' }
                ].map(group => (
                    <div key={group.id}>
                        <input
                            type="checkbox"
                            id={`group-${group.id}`}
                            name={group.name}
                            value={group.id}
                            checked={formData.groups.some(g => g.id === group.id)} // Check if the group is selected
                            onChange={handleGroupSelect}
                        />
                        <label htmlFor={`group-${group.id}`}>{group.name}</label>
                    </div>
                ))}
                {errors.groups && <span className='error'>{errors.groups}</span>}
                <hr />
                <label>Sizes:</label>
                {formData.sizes.map((size, index) => (
                    <div key={index} className='sizes'>
                        <label htmlFor={`quantity${index}`}>{size.name}:</label>
                        <input type="number" name={`quantity${index}`} value={size.quantity} onChange={(event) => handleQuantityChange(event, index)} />
                    </div>
                ))}

                <button type="submit">Submit</button>
            </form>
        </>
    );
};


export default ProductForm;