import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../utils/mockData';
import { useCart } from '../context/CartContext';
import { Button, Input } from '../components/ui/FormElements';
import { useToast } from '../context/ToastContext';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToast } = useToast();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const found = products.find(p => p.id === id);
        if (found) {
            setProduct(found);
        } else {
            navigate('/');
        }
    }, [id, navigate]);

    const handleAddToCart = () => {
        if (product) {
            addToCart({ ...product, quantity: Number(quantity) });
            addToast(`Added ${quantity} ${product.name}(s) to cart`, 'success');
        }
    };

    if (!product) return <div className="loading-container">Loading...</div>;

    return (
        <div className="container product-detail-container" data-test="product-detail">
            <div className="detail-image-wrapper">
                <img src={product.image} alt={product.name} className="detail-image" data-test="product-image" />
            </div>
            <div className="detail-info">
                <h1 className="detail-title" data-test="product-title">{product.name}</h1>
                <div className="detail-meta">
                    <span className="detail-category" data-test="product-category">{product.category}</span>
                    <span className="detail-stock" data-test="product-stock">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                </div>
                <p className="detail-price" data-test="product-price">${product.price.toFixed(2)}</p>
                <p className="detail-description" data-test="product-description">{product.description}</p>

                <div className="detail-actions">
                    <div className="quantity-selector">
                        <Input
                            type="number"
                            min="1"
                            max={product.stock}
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
                            label="Quantity"
                            id="quantity"
                            data-test="quantity-input"
                        />
                    </div>
                    <Button onClick={handleAddToCart} disabled={product.stock === 0} data-test="add-to-cart">
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
