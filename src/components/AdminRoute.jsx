import React from 'react';
import { Navigate, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
    const { user, profile, loading } = useAuth(); // Assuming 'profile' will be added to AuthContext

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>Carregando...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (profile?.role !== 'admin') {
        return (
            <div style={{ padding: '50px', textAlign: 'center', color: '#ef4444' }}>
                <h1>Você não é admin</h1>
                <p>Esta área é restrita para administradores.</p>
                <Link to="/" style={{ color: '#6b7280', textDecoration: 'underline', marginTop: '20px', display: 'block' }}>
                    Voltar para a Loja
                </Link>
            </div>
        );
    }

    return <Outlet />;
};

export default AdminRoute;
