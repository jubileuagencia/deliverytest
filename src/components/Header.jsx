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

        {/* Location Selector (Left) */}
        <div style={styles.locationWrapper}>
          <span style={styles.locationLabel}>Localização atual</span>
          <div style={styles.locationValue}>
            Jl. Soekarno Hatta 15A...
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}><path d="m6 9 6 6 6-6" /></svg>
          </div>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

          {/* Notification Bell */}
          <button style={styles.iconButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span style={styles.notifBadge}></span>
          </button>

          {/* Cart */}
          <Link to="/carrinho" style={styles.cartButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </Link>

          {/* Profile/Logout (Simplified for Mobile view) */}
          {user ? (
            <button onClick={handleLogout} style={{ ...styles.iconButton, color: 'var(--primary-color)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
            </button>
          ) : (
            <Link to="/login" style={{ ...styles.iconButton, fontSize: '0.8rem', fontWeight: '600', color: 'var(--primary-color)' }}>
              Entrar
            </Link>
          )}
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
    height: '80px', // Taller for 2-line location
    backgroundColor: '#FFFFFF', // White bg
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0 20px',
  },
  locationWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  locationLabel: {
    fontSize: '0.75rem',
    color: '#9CA3AF', // Gray-400
    marginBottom: '2px',
  },
  locationValue: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#1F2937', // Gray-800
    display: 'flex',
    alignItems: 'center',
  },
  iconButton: {
    background: '#F3F4F6', // Light gray circle
    border: 'none',
    width: '40px',
    height: '40px',
    borderRadius: '12px', // Soft square
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1F2937',
    position: 'relative',
    cursor: 'pointer',
  },
  notifBadge: {
    position: 'absolute',
    top: '10px',
    right: '12px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#EF4444',
    border: '1px solid #FFF',
  },
  cartButton: {
    background: '#22C55E', // Primary Green
    color: '#fff',
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: '#EF4444',
    color: '#fff',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #FFF',
  },
};

export default Header;
