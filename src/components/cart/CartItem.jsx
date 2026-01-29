import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <div className="cart-item">
            <div style={styles.imagePlaceholder}>
                {item.image_url ? (
                    <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                ) : (
                    <span style={{ fontSize: '1.5rem' }}>🥗</span>
                )}
            </div>

            <div style={styles.info}>
                <h3 style={styles.title}>{item.name}</h3>
                <p style={styles.price}>${Number(item.price).toFixed(2)}</p>
                {item.description && <p style={styles.desc}>{item.description}</p>}
            </div>

            <div style={styles.controls}>
                <div style={styles.quantityWrapper}>
                    <button
                        style={styles.qtyBtn}
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                    >-</button>
                    <span style={styles.qty}>{item.quantity}</span>
                    <button
                        style={styles.qtyBtn}
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                </div>

                <button
                    onClick={() => onRemove(item.id)}
                    style={styles.removeBtn}
                    aria-label="Remover item"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            </div>
        </div>
    );
};

const styles = {
    imagePlaceholder: {
        width: '60px',
        height: '60px',
        backgroundColor: '#F3F4F6',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: '2px',
    },
    price: {
        color: 'var(--primary-color)',
        fontWeight: '700',
        fontSize: '0.95rem',
    },
    desc: {
        fontSize: '0.8rem',
        color: '#9CA3AF',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    quantityWrapper: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: '8px',
        border: '1px solid #E5E7EB',
        padding: '2px',
    },
    qtyBtn: {
        width: '28px',
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        cursor: 'pointer',
        color: '#374151',
        fontWeight: 'bold',
    },
    qty: {
        minWidth: '24px',
        textAlign: 'center',
        fontSize: '0.9rem',
        fontWeight: '600',
    },
    removeBtn: {
        color: '#EF4444', // Red
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '5px',
    }
};

export default CartItem;
