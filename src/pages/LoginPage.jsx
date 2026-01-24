import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
                navigate('/'); // Redirect to home on success
            } else {
                const { user } = await signup(email, password);
                if (user) {
                    // If email confirmation is disabled in Supabase, this logs in immediately.
                    // Otherwise user needs to confirm email.
                    alert('Check your email for confirmation link if required!');
                    if (user.identities?.length === 0) {
                        setError("User already registered. Please login.");
                    } else {
                        setIsLogin(true); // Switch to login view or keep here
                    }
                }
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={styles.page}>
            <div className="glass-panel" style={styles.formContainer}>
                <h2 style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            style={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            style={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            minLength={6}
                        />
                    </div>

                    <button type="submit" style={styles.submitButton} disabled={loading}>
                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>

                <p style={styles.switchText}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button style={styles.switchButton} onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    formContainer: {
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
    },
    title: {
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '2rem',
        background: 'linear-gradient(135deg, #fff 0%, #a0a0a0 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
    },
    input: {
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(0,0,0,0.2)',
        color: '#fff',
        fontSize: '1rem',
        outline: 'none',
    },
    submitButton: {
        marginTop: '10px',
        padding: '14px',
        borderRadius: '8px',
        backgroundColor: 'var(--primary-color)',
        color: '#fff',
        fontSize: '1rem',
        fontWeight: 'bold',
        transition: 'opacity 0.2s',
    },
    switchText: {
        marginTop: '25px',
        textAlign: 'center',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
    },
    switchButton: {
        background: 'none',
        color: 'var(--primary-color)',
        fontWeight: 'bold',
        textDecoration: 'underline',
    },
    error: {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        color: '#ff6b6b',
        padding: '10px',
        borderRadius: '8px',
        marginBottom: '20px',
        fontSize: '0.9rem',
        textAlign: 'center',
    },
};

export default LoginPage;
