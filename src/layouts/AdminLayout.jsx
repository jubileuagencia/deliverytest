import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
    const { logout, user } = useAuth();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const isActive = (path) => location.pathname === path;

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className={styles.adminContainer}>
            {/* Mobile Header with Hamburger */}
            <div className={styles.mobileHeader}>
                <h2>Levee Admin</h2>
                <button
                    className={`${styles.hamburger} ${isMobileMenuOpen ? styles.isActive : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && <div className={styles.overlay} onClick={closeMobileMenu}></div>}

            <aside className={`${styles.sidebar} ${isMobileMenuOpen ? styles.show : ''}`}>
                <div className={styles.sidebarHeader}>
                    <h2>Levee Admin</h2>
                    <p className={styles.userEmail}>{user?.email}</p>
                </div>

                <nav className={styles.navConfig}>
                    <Link
                        to="/admin"
                        className={`${styles.navItem} ${isActive('/admin') ? styles.active : ''}`}
                        onClick={closeMobileMenu}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/produtos"
                        className={`${styles.navItem} ${isActive('/admin/produtos') ? styles.active : ''}`}
                        onClick={closeMobileMenu}
                    >
                        Produtos
                    </Link>
                    <Link
                        to="/admin/pedidos"
                        className={`${styles.navItem} ${isActive('/admin/pedidos') ? styles.active : ''}`}
                        onClick={closeMobileMenu}
                    >
                        Pedidos
                    </Link>
                    <Link
                        to="/admin/clientes"
                        className={`${styles.navItem} ${isActive('/admin/clientes') ? styles.active : ''}`}
                        onClick={closeMobileMenu}
                    >
                        Clientes
                    </Link>
                </nav>

                <div className={styles.sidebarFooter}>
                    <button onClick={logout} className={styles.logoutBtn}>Sair</button>
                    <Link to="/" className={styles.backLink}>Voltar para Loja</Link>
                </div>
            </aside>

            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
