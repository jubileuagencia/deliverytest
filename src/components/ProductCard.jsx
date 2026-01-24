import React from 'react';

const ProductCard = ({ product, onAdd }) => {
    return (
        <div className="glass-panel" style={styles.card}>
            <div style={styles.imagePlaceholder}>
                <div style={styles.placeholderText}>Image</div>
            </div>
            <div style={styles.content}>
                <h3 style={styles.title}>{product.name}</h3>
                <div style={styles.footer}>
                    <span style={styles.price}>${product.price.toFixed(2)}</span>
                    <button style={styles.addButton} onClick={() => onAdd(product)} aria-label="Add to cart">
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
        minWidth: '260px',
        height: '350px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
    },
    imagePlaceholder: {
        flex: 1,
        background: 'linear-gradient(to bottom right, #2a2a2a, #333)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderText: {
        color: 'rgba(255,255,255,0.2)',
        fontSize: '1.2rem',
        fontWeight: 600,
    },
    content: {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
    },
    price: {
        fontSize: '1.1rem',
        color: 'var(--primary-color)',
        fontWeight: 700,
    },
    addButton: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s, background-color 0.2s',
    },
};

export default ProductCard;
