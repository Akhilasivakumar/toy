import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="navbar" data-test="navbar">
            <div className="container navbar-content">
                <Link to="/" className="logo" data-test="nav-logo">
                    🧸 ToyStore
                </Link>

                <div className="nav-links">
                    <Link to="/" className="nav-link" data-test="nav-home">Home</Link>
                    {user ? (
                        <>
                            <span className="user-greeting" data-test="nav-user-greeting">Hi, {user.name}</span>
                            <button onClick={handleLogout} className="nav-btn logout-btn" data-test="nav-logout">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="nav-link" data-test="nav-login">Login</Link>
                    )}
                    <Link to="/cart" className="cart-icon" data-test="nav-cart">
                        🛒
                        {cartItemCount > 0 && <span className="cart-count" data-test="cart-count">{cartItemCount}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
