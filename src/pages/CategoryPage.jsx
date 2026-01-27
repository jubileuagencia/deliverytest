import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory } from '../services/products';

const CategoryPage = ({ onAddToCart }) => {
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
            loadProducts();
        }
    }, [categoryName]);

    return (
        <div className="container" style={styles.page}>
            <div style={styles.header}>
                <Link to="/" style={styles.backLink}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                    Voltar
                </Link>
                <h2 style={styles.title}>{categoryName}</h2>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>Carregando...</div>
            ) : products.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', color: '#6B7280' }}>
                    Nenhum produto encontrado nesta categoria.
                </div>
            ) : (
                <div style={styles.grid}>
                    {products.map(product => (
                        <div key={product.id} style={styles.cardWrapper}>
                            <ProductCard product={product} onAdd={onAddToCart} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    page: {
        padding: '20px',
        paddingTop: '40px',
        minHeight: '100vh',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '30px',
    },
    backLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        textDecoration: 'none',
        color: '#6B7280',
        fontWeight: '600',
    },
    title: {
        fontSize: '2rem',
        fontWeight: '800',
        color: '#1F2937',
        textTransform: 'capitalize',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', // 2 Products per row
        gap: '15px',
        justifyItems: 'center', // Center items in the cells
    },
    cardWrapper: {
        // Wrapper to ensure card takes full width of grid cell
    }
};

export default CategoryPage;
