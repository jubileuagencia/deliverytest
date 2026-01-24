import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ cartCount }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
        <div style={styles.logo}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ color: 'var(--primary-color)' }}>Food</span>Delivery
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {user ? (
            <div style={styles.userMenu}>
              <span style={styles.userEmail}>{user.email}</span>
              <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
            </div>
          ) : (
            <Link to="/login" style={styles.loginLink}>Login</Link>
          )}

          <div style={styles.cartContainer}>
            <Link to="/carrinho" style={styles.cartButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '70px',
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: '1.5rem',
    color: '#fff',
    letterSpacing: '-0.5px',
  },
  cartButton: {
    background: 'none',
    color: '#fff',
    position: 'relative',
    padding: '8px',
    transition: 'transform 0.2s',
  },
  badge: {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: 'var(--primary-color)',
    color: '#fff',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },
  userMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    fontSize: '0.9rem',
  },
  userEmail: {
    color: 'var(--text-secondary)',
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  logoutButton: {
    background: 'none',
    border: '1px solid rgba(255,255,255,0.2)',
    padding: '5px 12px',
    borderRadius: '20px',
    color: '#fff',
    fontSize: '0.8rem',
    transition: 'background 0.2s',
    cursor: 'pointer',
  },
  loginLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 600,
    marginRight: '10px',
  },
};

export default Header;
