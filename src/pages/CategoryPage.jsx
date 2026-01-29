import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../services/products';
import PageHeader from '../components/common/PageHeader';
import ProductGrid from '../components/products/ProductGrid';
import styles from './CategoryPage.module.css';

const CategoryPage = ({ onAddToCart, onProductClick, cartItems, onUpdateQuantity, onRemoveItem }) => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const data = await getProductsByCategory(categoryName);
                setProducts(data);
            } catch (error) {
                console.error("Failed to load category products", error);
            } finally {
                setLoading(false);
            }
        };

        if (categoryName) {
            window.scrollTo(0, 0); // Ensure page starts at top
            loadProducts();
        }
    }, [categoryName]);

    return (
        <div className={`container ${styles.page}`}>
            <PageHeader title={categoryName} />

            {loading ? (
                <div className={styles.loading}>Carregando...</div>
            ) : products.length === 0 ? (
                <div className={styles.empty}>
                    Nenhum produto encontrado nesta categoria.
                </div>
            ) : (
                <ProductGrid
                    products={products}
                    onAdd={onAddToCart}
                    onClick={onProductClick}
                    cartItems={cartItems}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemoveItem={onRemoveItem}
                />
            )}
        </div>
    );
};

export default CategoryPage;
