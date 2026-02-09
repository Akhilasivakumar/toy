import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button, Input } from '../components/ui/FormElements';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    return (
        <div className="container cart-container" data-test="cart-page">
            <h2 className="cart-title" data-test="page-title">Your Shopping Cart</h2>

            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty.</p>
                    <Link to="/">
                        <Button>Continue Shopping</Button>
                    </Link>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item card" data-test={`cart-item-${item.id}`}>
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4 data-test="item-name">{item.name}</h4>
                                    <p className="item-price" data-test="item-price">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="cart-item-actions">
                                    <Input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                        className="quantity-input"
                                        data-test={`item-quantity-${item.id}`}
                                    />
                                    <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)} data-test={`remove-${item.id}`}>
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary card" data-test="cart-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span data-test="cart-total">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <hr />
                        <div className="summary-row total">
                            <span>Total</span>
                            <span data-test="cart-total-final">${cartTotal.toFixed(2)}</span>
                        </div>
                        <Button className="w-full" onClick={() => navigate('/checkout')} data-test="proceed-to-checkout">
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
