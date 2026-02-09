import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button, Input, Select, Radio } from '../components/ui/FormElements';
import { Loader, useToast } from '../context/ToastContext';
import './Cart.css'; // Reusing cart styles for layout

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        paymentMethod: 'creditCard'
    });

    const handleChange = (e) => {
        const { id, value, name } = e.target;
        setFormData(prev => ({ ...prev, [name || id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            clearCart();
            addToast('Order placed successfully!', 'success');
            navigate('/order-confirmation');
            setIsLoading(false);
        }, 1500);
    };

    if (cart.length === 0) {
        return <div className="container" style={{ padding: '2rem' }}>Cart is empty.</div>;
    }

    return (
        <div className="container checkout-container" data-test="checkout-page">
            <h2 className="cart-title" data-test="page-title">Checkout</h2>

            <div className="checkout-content">
                <form onSubmit={handleSubmit} className="checkout-form card">
                    <h3>Shipping Information</h3>
                    <div className="form-row">
                        <Input
                            label="First Name" id="firstName" value={formData.firstName} onChange={handleChange} required data-test="first-name"
                        />
                        <Input
                            label="Last Name" id="lastName" value={formData.lastName} onChange={handleChange} required data-test="last-name"
                        />
                    </div>
                    <Input
                        label="Address" id="address" value={formData.address} onChange={handleChange} required data-test="address"
                    />
                    <div className="form-row">
                        <Input
                            label="City" id="city" value={formData.city} onChange={handleChange} required data-test="city"
                        />
                        <Input
                            label="Zip Code" id="zip" value={formData.zip} onChange={handleChange} required data-test="zip"
                        />
                    </div>

                    <h3>Payment Method</h3>
                    <div className="payment-methods">
                        <Radio
                            label="Credit Card" name="paymentMethod" value="creditCard" checked={formData.paymentMethod === 'creditCard'} onChange={handleChange} id="pm-cc" data-test="payment-cc"
                        />
                        <Radio
                            label="PayPal" name="paymentMethod" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={handleChange} id="pm-pp" data-test="payment-pp"
                        />
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full" data-test="place-order">
                        {isLoading ? <Loader /> : `Place Order ($${cartTotal.toFixed(2)})`}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
