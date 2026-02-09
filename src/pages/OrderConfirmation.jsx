import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/FormElements';

const OrderConfirmation = () => {
    return (
        <div className="container" style={{ padding: '4rem', textAlign: 'center' }} data-test="order-confirmation-page">
            <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <h2 style={{ color: '#22c55e', marginBottom: '1rem' }} data-test="success-message">Order Confirmed!</h2>
                <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
                    Thank you for your purchase. Your order has been received and is being processed.
                </p>
                <p style={{ marginBottom: '2rem', fontWeight: 'bold' }}>Order ID: #{Math.floor(Math.random() * 1000000)}</p>
                <Link to="/">
                    <Button data-test="continue-shopping">Continue Shopping</Button>
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;
