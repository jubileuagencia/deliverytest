import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../services/favorites';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch favorites when user changes
    useEffect(() => {
        if (user) {
            loadFavorites();
        } else {
            setFavorites([]);
            setLoading(false);
        }
    }, [user]);

    const loadFavorites = async () => {
        setLoading(true);
        try {
            const data = await getFavorites(user.id);
            // Store just the IDs for quick lookup in isFavorite
            // But wait, the service checks for 'products' join. 
            // The service returns the list of products directly.
            // But 'favorites' state is used for isFavorite(id) check.
            // Let's modify state strategy or service.
            // Current service 'getFavorites' returns full product objects.
            // We need IDs for fast checkout.

            // Let's optimize: Store full objects in 'favorites' state?
            // Or keep 'favorites' as IDs list?
            // The previous context kept 'favorites' as IDs list (lines 33-34).
            // But getFavoritesWithDetails did a separate fetch.

            // Let's update the strategy:
            // 1. Fetch all favorites (full objects) on load.
            // 2. Store them.
            // 3. isFavorite checks if ID exists in list.
            setFavorites(data);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        } finally {
            setLoading(false);
        }
    };

    const isFavorite = (productId) => {
        return favorites.some(fav => fav.id === productId);
    };

    const toggleFavorite = async (productId) => {
        if (!user) return false;

        const isFav = isFavorite(productId);

        try {
            if (isFav) {
                await removeFavorite(user.id, productId);
                setFavorites(prev => prev.filter(fav => fav.id !== productId));
            } else {
                await addFavorite(user.id, productId);
                // Optimistic update or refetch? 
                // We need product details to add to state if we want to display it immediately.
                // For now, let's just add a placeholder or fetch it.
                // Or simplified: Just trigger a reload or add if we have the product object.
                // Since this is called from ProductPage, we might have the product object? 
                // The signature is just (productId).
                // Let's reload for correctness or accept inconsistency until reload.
                // Better: loadFavorites();
                loadFavorites();
            }
            return true;
        } catch (error) {
            console.error('Error toggling favorite:', error);
            return false;
        }
    };

    // Deprecated/Alias for compatibility or used by page
    const getFavoritesWithDetails = async () => {
        return favorites;
    };

    return (
        <FavoritesContext.Provider value={{ favorites, loading, isFavorite, toggleFavorite, getFavoritesWithDetails }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    return useContext(FavoritesContext);
};
