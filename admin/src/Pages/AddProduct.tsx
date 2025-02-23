import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddProduct } from '../Hooks/AddproductDetails';
import { ProductDetailsType } from '../Hooks/AddproductDetails';

export const AddProduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductDetailsType>({
        slug : '',
        title: '',
        mainimage :'',
        price: 123,
        rating: 4.5,
        description: '',
        manufacturer: '',
        inStock: 2000,
        categoryId: '',
    });
    
    const { addProduct} = useAddProduct();
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
    
        setProduct((prev) => ({
          ...prev, // ✅ Keep previous product state
          [name]: value, // ✅ Update only the field that changed
        }));
    
        console.log(name, value); // Debugging output
      };

    const handleSubmit = async (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addProduct(product);
        navigate("/shipping");
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                    <label className="block text-gray-700">slug(unique Name)</label>
                    <input
                        type="text"
                        name="slug"
                        value={product.slug}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Product Title</label>
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Product Image</label>
                    <input
                        type="text"
                        name="mainimage"
                        value={product.mainimage}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Rating (0-5)</label>
                    <input
                        type="number"
                        name="rating"
                        value={product.rating}
                        onChange={handleChange}
                        min="0"
                        max="5"
                        className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Manufacturer</label>
                    <input
                        type="text"
                        name="manufacturer"
                        value={product.manufacturer}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Stock Quantity</label>
                    <input
                        type="number"
                        name="inStock"
                        value={product.inStock}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Category ID</label>
                    <input
                        type="text"
                        name="categoryId"
                        value={product.categoryId}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Add Product Details
                </button>
            </form>
        </div>
    );
};
