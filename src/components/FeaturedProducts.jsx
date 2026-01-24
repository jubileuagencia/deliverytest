import React, { useEffect, useState } from 'react';
import Carousel from './Carousel';
import { getProducts } from '../services/products';

const FeaturedProducts = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                if (data && data.length > 0) {
                    setProducts(data);
                } else {
                    console.warn('No products found in DB. Showing empty state.');
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px', color: '#fff' }}>Loading products...</div>;
    }

    return <Carousel products={products} onAdd={onAddToCart} />;
};

export default FeaturedProducts;
