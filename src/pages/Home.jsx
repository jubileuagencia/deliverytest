import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeaturedProducts from '../components/FeaturedProducts';
import { getCategories } from '../services/products';

const Home = ({ onAddToCart, onProductClick }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            if (data) setCategories(data);
        };
        fetchCategories();
    }, []);

    return (
        <main className="container" style={{ paddingBottom: '80px', paddingTop: '10px' }}>
            {/* Search Bar - Redirects to SearchPage on interaction */}
            <div
                onClick={() => window.location.href = '/busca'}
                style={{ ...styles.searchContainer, cursor: 'text' }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
                    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span style={{ color: '#9CA3AF', fontSize: '1rem' }}>Buscar produtos frescos...</span>
            </div>

            {/* Promo Banner */}
            <div style={styles.bannerWrapper}>
                <div style={styles.bannerContent}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '10px', color: '#1F2937' }}>
                        Abasteça sua loja<br />
                        <span style={{ color: '#22C55E' }}>30% OFF</span> hoje!
                    </h2>
                    <button style={styles.bannerButton}>Peça agora</button>
                </div>
                <div style={styles.bannerImagePlaceholder}>
                    {/* Placeholder for fresh veggie image */}
                    <span style={{ fontSize: '3rem' }}>🥦</span>
                </div>
            </div>

            {/* Categories */}
            <div style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={styles.sectionTitle}>Categorias</h3>
                    <span style={styles.seeAll}>Ver todas</span>
                </div>
                <div style={styles.categoryGrid}>
                    {categories.map(category => (
                        <CategoryItem
                            key={category.id}
                            icon={category.icon}
                            name={category.name}
                            color={category.color}
                        />
                    ))}
                </div>
            </div>

            {/* Products */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={styles.sectionTitle}>Ofertas do Dia</h3>
                <span style={styles.seeAll}>Ver todas</span>
            </div>
            <FeaturedProducts onAddToCart={onAddToCart} onProductClick={onProductClick} />

            {/* Bottom Navigation */}
            <div style={styles.bottomNav}>
                <div style={{ ...styles.navItem, ...styles.activeNavItem }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    <span>Início</span>
                </div>
                <div style={styles.navItem}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    <span>Pedidos</span>
                </div>
                <div style={styles.navItem}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    <span>Favoritos</span>
                </div>
                <div style={styles.navItem}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                    <span>Painel</span>
                </div>
            </div>
        </main>
    );
};

const CategoryItem = ({ icon, name, color }) => (
    <Link to={`/categoria/${name}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
        <div style={{ ...styles.categoryCircle, backgroundColor: color }}>
            <span style={{ fontSize: '1.5rem' }}>{icon}</span>
        </div>
        <span style={{ fontSize: '0.85rem', fontWeight: '500', color: '#374151' }}>{name}</span>
    </Link>
);

const styles = {
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#F3F4F6', // Gray-100
        padding: '12px 16px',
        borderRadius: '16px',
        marginBottom: '24px',
        border: '1px solid #E5E7EB',
    },
    searchInput: {
        border: 'none',
        background: 'transparent',
        flex: 1,
        fontSize: '1rem',
        outline: 'none',
        color: '#374151',
    },
    filterButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#6B7280',
    },
    bannerWrapper: {
        backgroundColor: '#DCFCE7', // Green-100
        borderRadius: '24px',
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        position: 'relative',
        overflow: 'hidden',
    },
    bannerContent: {
        zIndex: 1,
    },
    bannerButton: {
        backgroundColor: '#111827', // Black/Gray-900
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '30px',
        fontWeight: '600',
        fontSize: '0.9rem',
        marginTop: '8px',
    },
    bannerImagePlaceholder: {
        width: '100px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#111827',
    },
    seeAll: {
        color: '#22C55E',
        fontWeight: '600',
        fontSize: '0.9rem',
        cursor: 'pointer',
    },
    categoryGrid: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 5px', // Minimal padding within the flex container
    },
    categoryCircle: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '4px',
    },
    bottomNav: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#fff',
        borderTop: '1px solid #E5E7EB',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '12px 0 20px', // Extra padding for safe area
        zIndex: 1000,
        boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.05)',
    },
    navItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        fontSize: '0.7rem',
        fontWeight: '500',
        color: '#9CA3AF',
        cursor: 'pointer',
    },
    activeNavItem: {
        color: '#22C55E', // Green
    }
};

export default Home;
