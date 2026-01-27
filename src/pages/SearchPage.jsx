import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { searchProducts } from '../services/products';
import ProductCard from '../components/ProductCard';

const SearchPage = ({ onAddToCart, cartItems, onUpdateQuantity, onRemoveItem }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(initialQuery);

    // Debounced Search Logic
    useEffect(() => {
        const timerId = setTimeout(async () => {
            if (searchTerm.length >= 3) {
                setLoading(true);
                try {
                    const results = await searchProducts(searchTerm);
                    setProducts(results || []);
                } catch (err) {
                    console.error(err);
                    setProducts([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setProducts([]);
                setLoading(false);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timerId);
    }, [searchTerm]);

    // Handle input change
    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchTerm(val);
    };

    return (
        <div style={styles.page}>
            {/* Header / Search Bar */}
            <div style={styles.header}>
                <Link to="/" style={styles.backButton}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                </Link>
                <div style={styles.searchForm}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Digite pelo menos 3 letras..."
                        style={styles.searchInput}
                        autoFocus
                    />
                    {loading && (
                        <div style={styles.spinnerWrapper}>
                            <div style={styles.spinner}></div>
                        </div>
                    )}
                </div>
            </div>

            {/* Results */}
            <div style={styles.content}>
                {loading ? (
                    <div style={styles.loading}>Buscando...</div>
                ) : (
                    <>
                        {searchTerm.length >= 3 && (
                            <h2 style={styles.resultsTitle}>
                                {products.length} resultados para "{searchTerm}"
                            </h2>
                        )}

                        {products.length === 0 ? (
                            <div style={styles.emptyState}>
                                {searchTerm.length < 3 ? (
                                    <>
                                        <span style={{ fontSize: '3rem', marginBottom: '10px' }}>⌨️</span>
                                        <p>Digite o nome do produto</p>
                                        <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>Mínimo de 3 letras para buscar.</p>
                                    </>
                                ) : (
                                    <>
                                        <span style={{ fontSize: '3rem', marginBottom: '10px' }}>🔍</span>
                                        <p>Nenhum produto encontrado.</p>
                                        <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>Tente termos diferentes como "banana" ou "tomate".</p>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div style={styles.grid}>
                                {products.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={onAddToCart}
                                        cartItems={cartItems}
                                        onUpdateQuantity={onUpdateQuantity}
                                        onRemoveItem={onRemoveItem}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

const styles = {
    page: {
        paddingTop: '0px',
        minHeight: '100vh',
        backgroundColor: '#FCFCFD',
    },
    header: {
        position: 'sticky',
        top: 0,
        backgroundColor: '#fff',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid #E5E7EB',
        zIndex: 100,
    },
    backButton: {
        color: '#374151',
        display: 'flex',
        alignItems: 'center',
    },
    searchForm: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: '12px',
        padding: '8px 12px',
        position: 'relative',
    },
    searchInput: {
        flex: 1,
        border: 'none',
        background: 'transparent',
        fontSize: '1rem',
        outline: 'none',
        color: '#1F2937',
    },
    spinnerWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinner: {
        width: '16px',
        height: '16px',
        border: '2px solid #E5E7EB',
        borderTop: '2px solid #22C55E',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    content: {
        padding: '16px',
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#6B7280',
    },
    resultsTitle: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: '16px',
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        color: '#374151',
        textAlign: 'center',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '16px',
    },
};

// Add keyframes for spinner if not present globally
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(styleSheet);

export default SearchPage;
