import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CartNotification.module.css';

const CartNotification = ({ cartItems, onClose, hasBottomNav }) => {
    // ... items calculation
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

    if (itemCount === 0) return null;

    return (
        <div
            className={styles.container}
            style={{ bottom: hasBottomNav ? '80px' : '20px' }}
        >
            <div className={styles.info}>
                <span className={styles.label}>Total</span>
                <div className={styles.values}>
                    <span className={styles.price}>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                    <span className={styles.count}> / {itemCount} itens</span>
                </div>
            </div>
            <Link to="/carrinho" className={styles.button} onClick={onClose}>
                Ver sacola
            </Link>
        </div>
    );
};

export default CartNotification;
