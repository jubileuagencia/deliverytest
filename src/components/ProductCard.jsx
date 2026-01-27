import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAdd, onClick }) => {
    return (
        <div style={styles.card} onClick={() => onClick && onClick(product)}>
            <div style={styles.imagePlaceholder}>
                {product.image_url ? (
                    <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <div style={styles.placeholderText}>Imagem</div>
                )}
            </div>

            <div style={styles.content}>
                <div style={{ color: 'inherit' }}>
                    <div>
                        <h3 style={styles.title}>{product.name}</h3>
                        {product.description && (
                            <p style={styles.description}>{product.description}</p>
                        )}
                    </div>
                </div>

                <div style={styles.footer}>
                    <span style={styles.price}>R$ {product.price.toFixed(2).replace('.', ',')}</span>
                    <button
                        style={styles.addButton}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent opening modal when clicking add
                            onAdd(product);
                        }}
                        aria-label="Adicionar ao carrinho"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    card: {
        width: '100%',
        height: '320px', // Increased fixed height
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        border: '1px solid #F3F4F6',
        transition: 'transform 0.2s ease',
        cursor: 'pointer',
    },
    imagePlaceholder: {
        height: '160px', // Fixed height for image
        backgroundColor: '#F3F4F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
    },
    placeholderText: {
        color: '#9CA3AF',
        fontSize: '0.9rem',
    },
    content: {
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '0.95rem',
        fontWeight: 600,
        color: '#1F2937',
        lineHeight: 1.3,
        marginBottom: '4px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        height: '40px', // Fixed height for title (approx 2 lines)
    },
    description: {
        fontSize: '0.8rem',
        color: '#6B7280',
        marginTop: '2px',
        lineHeight: 1.4,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '8px',
    },
    price: {
        fontSize: '1.1rem',
        color: 'var(--primary-color)',
        fontWeight: 700,
    },
    addButton: {
        width: '32px',
        height: '32px',
        borderRadius: '10px',
        backgroundColor: 'var(--primary-color)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s',
        border: 'none',
        cursor: 'pointer',
    },
};

export default ProductCard;
