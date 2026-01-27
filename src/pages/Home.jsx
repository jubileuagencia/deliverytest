import React from 'react';
import FeaturedProducts from '../components/FeaturedProducts';

const Home = ({ onAddToCart }) => {
    return (
        <main className="container" style={{ paddingBottom: '80px', paddingTop: '10px' }}>
            {/* Search Bar */}
            <div style={styles.searchContainer}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
                    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                    type="text"
                    placeholder="Buscar produtos frescos..."
                    style={styles.searchInput}
                />
                <button style={styles.filterButton}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                </button>
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
                    <CategoryItem icon="🍎" name="Frutas" color="#FEF2F2" />
                    <CategoryItem icon="🥕" name="Legumes" color="#ECFDF5" />
                    <CategoryItem icon="🥔" name="Raízes" color="#FFFBEB" />
                    <CategoryItem icon="🥬" name="Orgânicos" color="#F0F9FF" />
                </div>
            </div>

            {/* Products */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={styles.sectionTitle}>Ofertas do Dia</h3>
                <span style={styles.seeAll}>Ver todas</span>
            </div>
            <FeaturedProducts onAddToCart={onAddToCart} />
        </main>
    );
};

const CategoryItem = ({ icon, name, color }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div style={{ ...styles.categoryCircle, backgroundColor: color }}>
            <span style={{ fontSize: '1.5rem' }}>{icon}</span>
        </div>
        <span style={{ fontSize: '0.85rem', fontWeight: '500', color: '#374151' }}>{name}</span>
    </div>
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
        overflowX: 'auto',
        gap: '12px',
    },
    categoryCircle: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '4px',
    }
};

export default Home;
