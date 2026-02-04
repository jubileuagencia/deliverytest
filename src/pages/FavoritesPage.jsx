import React, { useEffect, useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import FavoritesItem from '../components/favorites/FavoritesItem';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FavoritesPage = () => {
    const { getFavoritesWithDetails, toggleFavorite } = useFavorites();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const load = async () => {
            const data = await getFavoritesWithDetails();
            setProducts(data);
            setLoading(false);
        };
        load();
    }, [user, getFavoritesWithDetails]);

    const handleRemove = async (id) => {
        await toggleFavorite(id);
        // Optimistic Remove from UI
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    if (loading) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando favoritos...</div>;
    }

    return (
        <div className="container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Link to="/" style={{ marginRight: '12px', display: 'flex', alignItems: 'center', color: '#6B7280' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                </Link>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Meus Favoritos</h1>
            </div>

            {products.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#6B7280' }}>
                    <p>Você ainda não tem favoritos.</p>
                    <Link to="/" style={{ color: 'var(--primary-color)', fontWeight: '600', textDecoration: 'none' }}>
                        Explorar produtos
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {products.map(product => (
                        <FavoritesItem
                            key={product.id}
                            product={product}
                            onRemove={handleRemove}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
