import React from 'react';
import { Link } from 'react-router-dom';

const CartPage = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
    const total = cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

    return (
        <div className="container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Your Cart</h2>

            {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '50px' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Your cart is empty.</p>
                    <Link to="/" style={styles.checkoutButton}>
                        Browse Menu
                    </Link>
                </div>
            ) : (
                <div style={styles.grid}>
                    <div style={styles.itemsList}>
                        {cartItems.map((item) => (
                            <div key={item.id} className="glass-panel" style={styles.itemRow}>
                                <div style={styles.itemInfo}>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{item.name}</h3>
                                    <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>${Number(item.price).toFixed(2)}</span>
                                </div>

                                <div style={styles.controls}>
                                    <button
                                        style={styles.quantityBtn}
                                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >-</button>
                                    <span style={styles.quantity}>{item.quantity}</span>
                                    <button
                                        style={styles.quantityBtn}
                                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    >+</button>

                                    <button
                                        style={styles.deleteBtn}
                                        onClick={() => onRemoveItem(item.id)}
                                        aria-label="Remove item"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="glass-panel" style={styles.summary}>
                        <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Summary</h3>
                        <div style={styles.summaryRow}>
                            <span>Items</span>
                            <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                        </div>
                        <div style={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div style={styles.summaryRow}>
                            <span>Delivery</span>
                            <span>$5.00</span>
                        </div>
                        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '20px 0' }} />
                        <div style={styles.summaryRow}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total</span>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                                ${(total + 5).toFixed(2)}
                            </span>
                        </div>
                        <button style={{ ...styles.checkoutButton, marginTop: '20px', width: '100%' }}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 350px',
        gap: '30px',
        '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
        }
    },
    itemsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    itemRow: {
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
    },
    itemInfo: {
        flex: 1,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    quantityBtn: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.2)',
        background: 'transparent',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background 0.2s',
    },
    quantity: {
        minWidth: '20px',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    deleteBtn: {
        marginLeft: '15px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.2rem',
    },
    summary: {
        padding: '30px',
        height: 'fit-content',
    },
    summaryRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
    },
    checkoutButton: {
        display: 'inline-block',
        backgroundColor: 'var(--primary-color)',
        color: '#fff',
        padding: '15px 30px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: 'bold',
        textAlign: 'center',
        transition: 'background 0.3s',
    },
};

export default CartPage;
