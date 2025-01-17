import { useState } from 'react';

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
    // Handle form input change
    const handleChange = (e :any) => {
        const { name, value } = e.target;
        setOrder({
            ...order,
            [name]: value,
        });
    };
    
    const handlePostalCodeChange = async (e:any) => {
        const { value } = e.target;
        console.log("pin code is ",value);
    
        // Update postal code first
        setOrder((prevOrder) => ({
            ...prevOrder,
            postalCode: value,
        }));
    
        if (value.length >= 6) {
            try {
                const response = await fetch(`https://api.postalpincode.in/pincode/${value}`);
                const data = await response.json();
                console.log("data ia",data);
                if (data[0].PostOffice && data[0].PostOffice.length > 0) {
                    const { State, Country,District } = data[0].PostOffice[0];
                    console.log("state", State);
                    console.log("city is", District);
                    console.log("country", Country);
    
                    // Update city, country, and state
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
    
    // Handle form submission
    const handleSubmit = (e : any) => {
        e.preventDefault();
        console.log('Order Submitted:', order);
        // You can make an API call here to create the order in the backend
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
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={order.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email Address:</label>
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
                    <label htmlFor="apartment">Apartment/Unit:</label>
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
                        onChange={handlePostalCodeChange} // Update postal code
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
                        required
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
                        required
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
                <div>
                    <label htmlFor="total">Total Amount:</label>
                    <input
                        type="number"
                        id="total"
                        name="total"
                        value={order.total}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Status:</label>
                    <select
                        name="status"
                        value={order.status}
                        onChange={handleChange}
                    >
                        <option value="draft">Draft</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div>
                    <label>Payment Status:</label>
                    <select
                        name="paymentStatus"
                        value={order.paymentStatus}
                        onChange={handleChange}
                    >
                        <option value="unpaid">Unpaid</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

