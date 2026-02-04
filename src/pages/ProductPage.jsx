import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/products';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
    const { isFavorite, toggleFavorite } = useFavorites();
    const { user } = useAuth();

    const handleToggleFavorite = (e) => {
        e.stopPropagation();
        if (!user) {
            navigate('/login');
            return;
        }
        toggleFavorite(product.id);
    };

    const cartItem = cartItems?.find(item => item.id === product?.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    useEffect(() => {
        const loadProduct = async () => {
            // ... existing logic ...
            setLoading(true);
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error("Failed to load product", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadProduct();
        }
    }, [id]);

    const handleIncrement = () => {
        updateQuantity(product.id, quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            updateQuantity(product.id, quantity - 1);
        } else {
            removeFromCart(product.id);
        }
    };

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Carregando produto...</div>;
    if (!product) return <div style={{ padding: '40px', textAlign: 'center' }}>Produto não encontrado.</div>;

    return (
        <div className="container" style={styles.page}>
            {/* Header / Back Button */}
            {/* Header / Back Button */}
            <div style={styles.header}>
                <button onClick={() => navigate(-1)} style={styles.backLink}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                    Voltar
                </button>
            </div>

            {/* Product Image */}
            <div style={styles.imageContainer}>
                {product.image_url ? (
                    <img src={product.image_url} alt={product.name} style={styles.image} />
                ) : (
                    <div style={styles.placeholder}>🥦</div>
                )}
                <button style={styles.favoriteButton} onClick={handleToggleFavorite}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite(product.id) ? "#EF4444" : "none"} stroke={isFavorite(product.id) ? "#EF4444" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>

            {/* Product Details */}
            <div style={styles.details}>
                <h1 style={styles.title}>{product.name}</h1>

                <div style={styles.priceRow}>
                    <span style={styles.price}>R$ {product.price.toFixed(2).replace('.', ',')}</span>
                    <span style={styles.unit}>/ unidade</span>
                </div>

                {/* Description Section */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Descrição</h3>
                    <p style={styles.description}>
                        {product.description || "Sem descrição disponível."}
                    </p>
                </div>

                {/* Additional Info (Category) */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Categoria</h3>
                    <span style={styles.badge}>
                        {product.categories?.name || "Geral"}
                    </span>
                </div>
            </div>

            {/* Action Bar (Fixed Bottom) */}
            <div style={styles.actionBar}>
                {quantity === 0 ? (
                    <button
                        className={styles.addButton}
                        onClick={() => addToCart(product)}
                    >
                        Adicionar à Sacola - R$ {product.price.toFixed(2).replace('.', ',')}
                    </button>
                ) : (
                    <div style={styles.quantityControl}>
                        <button style={styles.qtyButton} onClick={handleDecrement}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                        <span style={styles.qtyValue}>{quantity}</span>
                        <button style={styles.qtyButton} onClick={handleIncrement}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Spacer for fixed bottom bar */}
            <div style={{ height: '100px' }}></div>
        </div>
    );
};

const styles = {
    page: {
        padding: '20px',
        maxWidth: '600px', // Limit width on large screens
        margin: '0 auto',
    },
    header: {
        marginBottom: '20px',
    },
    backLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        textDecoration: 'none',
        color: '#6B7280',
        fontWeight: '600',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        fontFamily: 'inherit',
        fontSize: '1rem',
    },
    imageContainer: {
        width: '100%',
        aspectRatio: '4/3',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        marginBottom: '24px',
        backgroundColor: '#F3F4F6',
        position: 'relative', // Needed for absolute positioning
    },
    favoriteButton: {
        position: 'absolute',
        top: '16px',
        right: '16px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        zIndex: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    placeholder: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '4rem',
    },
    details: {
        padding: '0 10px',
    },
    title: {
        fontSize: '1.75rem',
        fontWeight: '800',
        color: '#1F2937',
        marginBottom: '8px',
        lineHeight: 1.2,
    },
    priceRow: {
        display: 'flex',
        alignItems: 'baseline',
        gap: '8px',
        marginBottom: '24px',
    },
    price: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: 'var(--primary-color)', // Green
    },
    unit: {
        fontSize: '1rem',
        color: '#9CA3AF',
    },
    section: {
        marginBottom: '24px',
    },
    sectionTitle: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '8px',
    },
    description: {
        fontSize: '0.95rem',
        color: '#6B7280',
        lineHeight: 1.6,
    },
    badge: {
        display: 'inline-block',
        padding: '6px 12px',
        backgroundColor: '#F3F4F6',
        color: '#4B5563',
        borderRadius: '16px',
        fontSize: '0.85rem',
        fontWeight: '500',
    },
    actionBar: {
        position: 'fixed',
        bottom: '20px', // Adjusted to 20px since notification is hidden
        left: '20px',
        right: '20px',
        zIndex: 100,
    },
    addButton: {
        width: '100%',
        backgroundColor: 'var(--primary-color)',
        color: '#fff',
        border: 'none',
        padding: '16px',
        borderRadius: '16px',
        fontSize: '1rem',
        fontWeight: '700',
        boxShadow: '0 4px 14px rgba(34, 197, 94, 0.4)',
        cursor: 'pointer',
    },
    quantityControl: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F3F4F6',
        borderRadius: '16px',
        padding: '8px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    },
    qtyButton: {
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: 'none',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        cursor: 'pointer',
        color: '#1F2937',
    },
    qtyValue: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#1F2937',
    }
};

export default ProductPage;
