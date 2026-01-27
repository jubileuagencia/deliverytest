import React from 'react';
import { Link } from 'react-router-dom';

const CartNotification = ({ cartItems, onClose, hasBottomNav }) => {
    // ... items calculation
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

    if (itemCount === 0) return null;

    return (
        <div style={{ ...styles.container, bottom: hasBottomNav ? '80px' : '20px' }}>
            <div style={styles.info}>
                <span style={styles.label}>Total</span>
                <div style={styles.values}>
                    <span style={styles.price}>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                    <span style={styles.count}> / {itemCount} itens</span>
                </div>
            </div>
            <Link to="/carrinho" style={styles.button} onClick={onClose}>
                Ver sacola
            </Link>
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        // bottom: set dynamically
        left: '20px',
        right: '20px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        zIndex: 2000,
        animation: 'slideUp 0.3s ease-out',
        border: '1px solid #F3F4F6',
        transition: 'bottom 0.3s ease', // Smooth transition if nav appears/disappears
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '0.85rem',
        color: '#9CA3AF',
        marginBottom: '2px',
    },
    values: {
        display: 'flex',
        alignItems: 'baseline',
    },
    price: {
        fontSize: '1rem',
        fontWeight: '700',
        color: '#1F2937', // Dark gray/black
        marginRight: '4px',
    },
    count: {
        fontSize: '0.85rem',
        color: '#9CA3AF',
    },
    button: {
        backgroundColor: '#22C55E', // Green
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '0.9rem',
        transition: 'background-color 0.2s',
    }
};

export default CartNotification;
