import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

const CartPage = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
    const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

    const handleCheckout = () => {
        alert('Proceeding to checkout...');
        // Integrate with payment gateway or order service here
    };

    return (
        <div className="container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '30px', color: '#111827' }}>Seu Carrinho</h2>

            {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#6B7280', marginTop: '50px' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Seu carrinho está vazio.</p>
                    <Link to="/" style={styles.emptyButton}>
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

const styles = {
    emptyButton: {
        display: 'inline-block',
        backgroundColor: '#22C55E',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: '600',
        transition: 'background 0.3s',
    }
};

export default CartPage;
