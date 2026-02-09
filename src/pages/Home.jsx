import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../utils/mockData';
import { Button, Select, Checkbox } from '../components/ui/FormElements';
import './Home.css';

const Home = () => {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [sortBy, setSortBy] = useState('');

    // Extract unique categories
    const categories = [...new Set(products.map(p => p.category))];
    const subCategories = [...new Set(products.map(p => p.subCategory))];

    useEffect(() => {
        let result = products;

        if (categoryFilter) {
            result = result.filter(p => p.category === categoryFilter || p.subCategory === categoryFilter);
        }

        result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);

        if (sortBy === 'price-low-high') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high-low') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'name-a-z') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        setFilteredProducts([...result]);
    }, [categoryFilter, minPrice, maxPrice, sortBy]);

    const resetFilters = () => {
        setCategoryFilter('');
        setMinPrice(0);
        setMaxPrice(100);
        setSortBy('');
    };

    return (
        <div className="container home-container" data-test="home-page">
            <aside className="filters-sidebar" data-test="filters-sidebar">
                <h3 className="filter-title">Filters</h3>

                <div className="filter-group">
                    <label className="filter-label">Sort By</label>
                    <Select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        options={[
                            { value: 'price-low-high', label: 'Price: Low to High' },
                            { value: 'price-high-low', label: 'Price: High to Low' },
                            { value: 'name-a-z', label: 'Name (A-Z)' }
                        ]}
                        placeholder="Default"
                        data-test="sort-select"
                    />
                </div>

                <div className="filter-group">
                    <label className="filter-label">Price Range</label>
                    <div className="price-slider">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="slider"
                            data-test="price-slider"
                        />
                        <div className="price-values">
                            <span>${minPrice}</span>
                            <span>${maxPrice}</span>
                        </div>
                    </div>
                </div>

                <div className="filter-group">
                    <label className="filter-label">Category</label>
                    {categories.map(cat => (
                        <div key={cat} className="filter-checkbox">
                            <Checkbox
                                label={cat}
                                checked={categoryFilter === cat}
                                onChange={() => setCategoryFilter(categoryFilter === cat ? '' : cat)}
                                id={`cat-${cat}`}
                                data-test={`category-${cat}`}
                            />
                        </div>
                    ))}
                    <hr className="filter-divider" />
                    <label className="filter-label">Animal Type</label>
                    {subCategories.map(sub => (
                        <div key={sub} className="filter-checkbox">
                            <Checkbox
                                label={sub}
                                checked={categoryFilter === sub}
                                onChange={() => setCategoryFilter(categoryFilter === sub ? '' : sub)}
                                id={`sub-${sub}`}
                                data-test={`category-${sub}`}
                            />
                        </div>
                    ))}
                </div>

                <Button variant="secondary" onClick={resetFilters} data-test="reset-filters">
                    Reset Filters
                </Button>
            </aside>

            <section className="product-grid" data-test="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <Link to={`/product/${product.id}`} key={product.id} className="product-card card" data-test={`product-${product.id}`}>
                            <div className="product-image-container">
                                <img src={product.image} alt={product.name} className="product-image" />
                                {product.stock <= 5 && <span className="stock-badge">Low Stock</span>}
                            </div>
                            <div className="product-info">
                                <h5 className="product-name" data-test="product-name">{product.name}</h5>
                                <p className="product-price" data-test="product-price">${product.price.toFixed(2)}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="no-products">
                        <p>No products found.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
