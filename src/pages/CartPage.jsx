import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import styles from './CartPage.module.css';

const CartPage = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
    const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

    const handleCheckout = () => {
        alert('Proceeding to checkout...');
        // Integrate with payment gateway or order service here
    };

    return (
        <div className={`container ${styles.page}`}>
            <h2 className={styles.title}>Seu Carrinho</h2>

            {cartItems.length === 0 ? (
                <div className={styles.emptyState}>
                    <p className={styles.emptyText}>Seu carrinho está vazio.</p>
                    <Link to="/" className={styles.emptyButton}>
                        Ver Produtos Frescos
                    </Link>
                </div>
            ) : (
                <div className="cart-grid">
                    <div className="cart-items-list">
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdateQuantity={onUpdateQuantity}
                                onRemove={onRemoveItem}
                            />
                        ))}
                    </div>

                    <CartSummary subtotal={subtotal} onCheckout={handleCheckout} />
                </div>
            )}
        </div>
    );
};

export default CartPage;
