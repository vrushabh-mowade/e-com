import React, { useState } from 'react';
import { usetopostCustomerOrder } from '../hooks/Order';
import { useNavigate } from 'react-router';


export const ShippingAddressForm = ()  => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const cardId = localStorage.getItem('cartId');
    const {postFormDetails  ,loading : postingloading,error :posterror} = usetopostCustomerOrder();
    const [order, setOrder] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        company: '',
        address: '',
        apartment: '',
        postalCode: '',
        status :'',
        paymentStatus :'draft',
        city: '',
        country: '',
        orderNotice: '',
        total: 0,
        userId: userId!,
        cartId :cardId!
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value,
        }));
    };

    const handlePostalCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setOrder((prevOrder) => ({
            ...prevOrder,
            postalCode: value,
        }));

        if (/^\d{6}$/.test(value)) {
            try {
                const response = await fetch(`https://api.postalpincode.in/pincode/${value}`);
                const data = await response.json();
                if (data[0].PostOffice && data[0].PostOffice.length > 0) {
                    const { District, Country } = data[0].PostOffice[0];
                    setOrder((prevOrder) => ({
                        ...prevOrder,
                        city: District,
                        country: Country,
                    }));
                } else {
                    console.error('No data found for this postal code');
                }
            } catch (error) {
                console.error('Error fetching postal code data:', error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await postFormDetails(order);
        navigate("/shipping");
        
        // Add API call or further processing here
    };

    return (
        <div>
            <h2>Create Customer Order</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">First Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={order.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastname">Last Name:</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={order.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={order.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={order.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="company">Company:</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={order.company}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={order.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="apartment">Apartment:</label>
                    <input
                        type="text"
                        id="apartment"
                        name="apartment"
                        value={order.apartment}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code:</label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={order.postalCode}
                        onChange={handlePostalCodeChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={order.city}
                        onChange={handleChange}
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={order.country}
                        onChange={handleChange}
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="orderNotice">Order Notice:</label>
                    <textarea
                        id="orderNotice"
                        name="orderNotice"
                        value={order.orderNotice}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Place Order</button>
                
            </form>
        </div>
    );
};
