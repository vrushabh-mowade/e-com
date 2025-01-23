import React, { useState } from 'react';

export const ShippingAddressForm = () => {
    const [order, setOrder] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        company: '',
        address: '',
        apartment: '',
        postalCode: '',
        status: 'draft',
        paymentStatus: 'unpaid',
        city: '',
        country: '',
        orderNotice: '',
        total: 0,
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
        console.log('Postal code:', value);

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Order Submitted:', order);
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
                {/* Other form fields */}
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
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};
