import React from 'react';

const CartSummary = ({ subtotal, onCheckout }) => {
    const deliveryFee = 5.00; // Fixed for now
    const total = subtotal + deliveryFee;

    return (
        <div className="cart-summary">
            <h3 style={styles.title}>Resumo do Pedido</h3>

            <div style={styles.row}>
                <span style={styles.label}>Subtotal</span>
                <span style={styles.value}>${subtotal.toFixed(2)}</span>
            </div>

            <div style={styles.row}>
                <span style={styles.label}>Taxa de Entrega</span>
                <span style={styles.value}>${deliveryFee.toFixed(2)}</span>
            </div>

            <div style={styles.divider} />

            <div style={styles.row}>
                <span style={styles.totalLabel}>Total</span>
                <span style={styles.totalValue}>${total.toFixed(2)}</span>
            </div>

            <button style={styles.checkoutBtn} onClick={onCheckout}>
                Finalizar Pedido
            </button>
        </div>
    );
};

const styles = {
    title: {
        fontSize: '1.25rem',
        fontWeight: '700',
        marginBottom: '20px',
        color: '#111827',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '12px',
    },
    label: {
        color: '#6B7280', // Gray-500
        fontSize: '0.95rem',
    },
    value: {
        fontWeight: '600',
        color: '#374151',
    },
    divider: {
        height: '1px',
        backgroundColor: '#E5E7EB',
        margin: '16px 0',
    },
    totalLabel: {
        fontSize: '1.1rem',
        fontWeight: '700',
        color: '#111827',
    },
    totalValue: {
        fontSize: '1.25rem',
        fontWeight: '800',
        color: '#22C55E', // Primary Green
    },
    checkoutBtn: {
        width: '100%',
        backgroundColor: '#111827', // Black
        color: '#fff',
        padding: '14px',
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '1rem',
        marginTop: '24px',
        cursor: 'pointer',
        transition: 'opacity 0.2s',
    },
};

export default CartSummary;
