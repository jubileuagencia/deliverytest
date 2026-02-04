import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
    fetchCart,
    addToCartDB,
    updateQuantityDB,
    removeFromCartDB,
    getLocalCart,
    saveLocalCart
} from '../services/cart';
import { sendCartNotification } from '../services/notifications';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Sync with DB on login or load local cart
    useEffect(() => {
        const loadCart = async () => {
            setLoading(true);
            if (user) {
                try {
                    const items = await fetchCart(user.id);
                    setCartItems(items);
                } catch (error) {
                    console.error("Failed to load cart from DB", error);
                }
            } else {
                const localItems = getLocalCart();
                setCartItems(localItems);
            }
            setLoading(false);
        };
        loadCart();
    }, [user]);

    // Add Item
    const addToCart = useCallback(async (product) => {
        // Optimistic Update
        let newItems = [];
        setCartItems((prev) => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                newItems = prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newItems = [...prev, { ...product, quantity: 1 }];
            }
            return newItems;
        });

        // Side Effects
        if (user) {
            try {
                await addToCartDB(user.id, product);
                // Background Sync / Revalidation could go here if needed
            } catch (err) {
                console.error("Failed to add to DB cart", err);
                // Rollback could be implemented here
            }
        } else {
            // Guest Persistence
            // We reconstruct state because setState is async/batched
            const currentItems = getLocalCart();
            const existing = currentItems.find(item => item.id === product.id);
            let updatedLocalItems;

            if (existing) {
                updatedLocalItems = currentItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedLocalItems = [...currentItems, { ...product, quantity: 1 }];
            }
            saveLocalCart(updatedLocalItems);
            // Ensure state matches persistence
            setCartItems(updatedLocalItems);
        }

        sendCartNotification(product);
    }, [user]);

    // Update Quantity
    const updateQuantity = useCallback(async (productId, newQuantity) => {
        if (newQuantity < 1) return;

        setCartItems(prev => prev.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        ));

        if (user) {
            const item = cartItems.find(i => i.id === productId);
            // Note: Optimistic state might be slightly ahead, so looking up in 'cartItems' strictly 
            // works if effect dependencies are managed, but 'cartItems' in this scope is closed over.
            // Better to fetch fresh or assume ID maps correctly.
            // Simplified logic for this step:
            // Re-finding from CURRENT state reference might fail if closure is stale.
            // Using helper:
            try {
                // We need the cart_item_id. If it's a fresh add, we might miss it.
                // Best practice: Fetch ID from DB or store it.
                // For now, trusting the item has it or we refresh.
                const currentItem = (await fetchCart(user.id)).find(i => i.id === productId);
                if (currentItem?.cart_item_id) {
                    await updateQuantityDB(currentItem.cart_item_id, newQuantity);
                }
            } catch (e) { console.error(e); }
        } else {
            const currentItems = getLocalCart();
            const updated = currentItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            );
            saveLocalCart(updated);
            setCartItems(updated);
        }
    }, [user, cartItems]); // Dependency on cartItems is risky for useCallback turnover but needed for ID lookup if we don't refetch.

    // Remove Item
    const removeFromCart = useCallback(async (productId) => {
        setCartItems(prev => prev.filter(i => i.id !== productId));

        if (user) {
            try {
                const currentItem = (await fetchCart(user.id)).find(i => i.id === productId);
                if (currentItem?.cart_item_id) {
                    await removeFromCartDB(currentItem.cart_item_id);
                }
            } catch (e) { console.error(e); }
        } else {
            const currentItems = getLocalCart();
            const updated = currentItems.filter(item => item.id !== productId);
            saveLocalCart(updated);
            setCartItems(updated);
        }
    }, [user]);

    const value = {
        cartItems,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
