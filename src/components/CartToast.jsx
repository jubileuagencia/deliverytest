import React, { useEffect } from 'react';

const CartToast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Disappear after 3 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div style={styles.toast}>
            <div style={styles.content}>
                <span style={styles.icon}>✅</span>
                <span style={styles.message}>{message}</span>
            </div>
        </div>
    );
};

const styles = {
    toast: {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(30, 30, 30, 0.95)',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '50px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        zIndex: 2000,
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255,255,255,0.1)',
        animation: 'slideUp 0.3s ease-out',
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    icon: {
        fontSize: '1.2rem',
    },
    message: {
        fontSize: '0.95rem',
        fontWeight: 500,
    },
};

// Add keyframes to global styles for animation if not present, 
// or relying on simple transition. For now this inline style works for structure.
// Ideally 'slideUp' would be in index.css

export default CartToast;
