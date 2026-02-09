import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" data-test="footer">
            <div className="container footer-content">
                <div className="footer-section">
                    <h3 className="footer-title">🧸 ToyStore</h3>
                    <p className="footer-text">The best place to find your furry friends.</p>
                </div>
                <div className="footer-section">
                    <h4 className="footer-subtitle">Links</h4>
                    <a href="#" className="footer-link">About Us</a>
                    <a href="#" className="footer-link">Contact</a>
                    <a href="#" className="footer-link">Terms</a>
                </div>
                <div className="footer-section">
                    <h4 className="footer-subtitle">Follow Us</h4>
                    <div className="social-links">
                        <span className="social-icon">📘</span>
                        <span className="social-icon">📷</span>
                        <span className="social-icon">🐦</span>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 ToyStore. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
