import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import CartNotification from './components/CartNotification';
import { sendCartNotification } from './services/notifications';
import { fetchCart, addToCartDB, updateQuantityDB, removeFromCartDB, getLocalCart, saveLocalCart } from './services/cart';

// Wrapper component to access Auth Context
const AppContent = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Sync with DB on login or load local cart
  useEffect(() => {
    if (user) {
      // User is logged in: Fetch from DB
      fetchCart(user.id).then(items => {
        setCartItems(items);
      });
    } else {
      // Guest: Load from Local Storage
      const localItems = getLocalCart();
      setCartItems(localItems);
    }
  }, [user]);

  const handleAddToCart = async (product) => {
    // Shared Optimistic Update
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

    // Persistence Logic
    if (user) {
      try {
        await addToCartDB(user.id, product);
        // We could refetch here, but optimistic update handles the UI immediate feedback
        const updatedItems = await fetchCart(user.id);
        setCartItems(updatedItems);
      } catch (err) {
        console.error("Failed to add to DB cart", err);
      }
    } else {
      // Guest: Save to Local Storage immediately
      // Note: newItems is calculated inside the setter callback above, 
      // but React state updates are async, so we duplicate the logic or use an effect.
      // A cleaner way in this function scope:
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
      // We also update state to ensure UI sync if the optimistic update above has race conditions
      setCartItems(updatedLocalItems);
    }

    sendCartNotification(product);
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    // Optimistic Update
    setCartItems(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));

    if (user) {
      // ... existing DB logic ...
      const item = cartItems.find(i => i.id === productId);
      if (item && item.cart_item_id) {
        try { await updateQuantityDB(item.cart_item_id, newQuantity); } catch (e) { console.error(e) }
      } else {
        // Fallback if missing ID
        const freshCart = await fetchCart(user.id);
        const freshItem = freshCart.find(i => i.id === productId);
        if (freshItem) await updateQuantityDB(freshItem.cart_item_id, newQuantity);
      }
    } else {
      // Guest: Update Local Storage
      const currentItems = getLocalCart();
      const updatedLocalItems = currentItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      saveLocalCart(updatedLocalItems);
      setCartItems(updatedLocalItems);
    }
  };

  const handleRemoveItem = async (productId) => {
    // Optimistic Update
    setCartItems(prev => prev.filter(i => i.id !== productId));

    if (user) {
      const item = cartItems.find(i => i.id === productId);
      if (item && item.cart_item_id) {
        try { await removeFromCartDB(item.cart_item_id); } catch (e) { console.error(e) }
      } else {
        const freshCart = await fetchCart(user.id);
        const freshItem = freshCart.find(i => i.id === productId);
        if (freshItem) await removeFromCartDB(freshItem.cart_item_id);
      }
      fetchCart(user.id).then(setCartItems);
    } else {
      // Guest: Remove from Local Storage
      const currentItems = getLocalCart();
      const updatedLocalItems = currentItems.filter(item => item.id !== productId);
      saveLocalCart(updatedLocalItems);
      setCartItems(updatedLocalItems);
    }
  };

  const closeToast = () => setToastMessage(null);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const location = useLocation();
  const isCartPage = location.pathname === '/carrinho';

  // ... (rest of logic)

  return (
    <div className="App" style={{ paddingTop: '80px' }}>
      <Header cartCount={cartCount} />

      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/produto/:id" element={
          <ProductPage
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        } />
        <Route path="/categoria/:categoryName" element={<CategoryPage onAddToCart={handleAddToCart} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/carrinho" element={
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        } />
        <Route path="/busca" element={
          <SearchPage
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        } />
      </Routes>

      {cartItems.length > 0 && !isCartPage && !location.pathname.startsWith('/produto/') && (
        <CartNotification
          cartItems={cartItems}
          hasBottomNav={location.pathname === '/'}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
