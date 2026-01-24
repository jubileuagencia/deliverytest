import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import CartToast from './components/CartToast';
import { sendCartNotification } from './services/notifications';
import { fetchCart, addToCartDB, updateQuantityDB, removeFromCartDB } from './services/cart';

// Wrapper component to access Auth Context
const AppContent = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync with DB on login
  useEffect(() => {
    if (user) {
      fetchCart(user.id).then(items => {
        // If we implemented local->remote merge, we'd do it here. 
        // For now, load DB cart.
        setCartItems(items);
      });
    }
  }, [user]);

  const handleAddToCart = async (product) => {
    console.log(`Added ${product.name} to cart`);

    // Optimistic Update / Logic
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    // DB Update
    if (user) {
      try {
        await addToCartDB(user.id, product);
        // Refresh cart to ensure we have the correct DB IDs and state
        const updatedItems = await fetchCart(user.id);
        setCartItems(updatedItems);
      } catch (err) {
        console.error("Failed to add to DB cart", err);
      }
    }

    setToastMessage(`Added ${product.name} to cart!`);
    sendCartNotification(product);
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    // Optimistic update
    setCartItems(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));

    if (user) {
      const item = cartItems.find(i => i.id === productId);
      // We prioritize refetching to ensure stability, or use the known cart_item_id
      if (item && item.cart_item_id) {
        try {
          await updateQuantityDB(item.cart_item_id, newQuantity);
        } catch (err) {
          console.error("Failed to update quantity", err);
        }
      } else {
        // If we don't have the ID yet (race condition), refetch first
        const freshCart = await fetchCart(user.id);
        const freshItem = freshCart.find(i => i.id === productId);
        if (freshItem) await updateQuantityDB(freshItem.cart_item_id, newQuantity);
      }

      // Ensure sync
      // fetchCart(user.id).then(setCartItems); // Optional: can enable if highly consistent experience needed
    }
  };

  const handleRemoveItem = async (productId) => {
    const item = cartItems.find(i => i.id === productId);
    setCartItems(prev => prev.filter(i => i.id !== productId));

    if (user) {
      try {
        if (item && item.cart_item_id) {
          await removeFromCartDB(item.cart_item_id);
        } else {
          const freshCart = await fetchCart(user.id);
          const freshItem = freshCart.find(i => i.id === productId);
          if (freshItem) await removeFromCartDB(freshItem.cart_item_id);
        }
        // Sync state
        fetchCart(user.id).then(setCartItems);
      } catch (err) {
        console.error("Failed to remove item", err);
      }
    }
  };

  const closeToast = () => setToastMessage(null);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <div className="App" style={{ paddingTop: '80px' }}>
        <Header cartCount={cartCount} />

        <Routes>
          <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/carrinho" element={
            <CartPage
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          } />
        </Routes>

        {toastMessage && <CartToast message={toastMessage} onClose={closeToast} />}
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
