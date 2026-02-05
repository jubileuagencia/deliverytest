
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';
import styles from './LoginPage.module.css'; // Reusing Login Page layout styles

const RegisterPage = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && user) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    const handleSuccess = () => {
        alert("Cadastro realizado com sucesso! Verifique seu e-mail.");
        navigate('/login');
    };

    return (
        <div className={`container ${styles.page}`} style={{ flexDirection: 'column' }}>
            <RegisterForm onSuccess={handleSuccess} />

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>
                    Já tem uma conta?{' '}
                </span>
                <button
                    onClick={() => navigate('/login')}
                    style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                >
                    Entrar
                </button>
            </div>
        </div>
    );
};

export default RegisterPage;
