import React from 'react';
import { Navigate, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './AdminRoute.module.css';

const AdminRoute = () => {
    const { user, profile, loading } = useAuth();

    if (loading) {
        return <div className={styles.loading}>Carregando...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (profile?.role !== 'admin') {
        return (
            <div className={styles.denied}>
                <h1>Você não é admin</h1>
                <p>Esta área é restrita para administradores.</p>
                <Link to="/" className={styles.backLink}>
                    Voltar para a Loja
                </Link>
            </div>
        );
    }

    return <Outlet />;
};

export default AdminRoute;
