import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { ConfigProvider } from './context/ConfigContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/Header';
import CartNotification from './components/CartNotification';
import ProductDetailsModal from './components/ProductDetailsModal';
import BottomNavigation from './components/layout/BottomNavigation';
import ScrollToTop from './components/ScrollToTop';

// Lazy loading pages
const Home = React.lazy(() => import('./pages/Home'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const ProductPage = React.lazy(() => import('./pages/ProductPage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const FavoritesPage = React.lazy(() => import('./pages/FavoritesPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));

// Wrapper component to access Contexts
const AppContent = () => {
  const { cartItems } = useCart();
  const location = useLocation();
  const isCartPage = location.pathname === '/carrinho';

  // Routes where BottomNavigation should appear
  const showBottomNav = ['/', '/favoritos'].includes(location.pathname);

  // Selected Product for Modal (UI State)
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const showCartNotification = cartItems.length > 0 && !isCartPage && !location.pathname.startsWith('/produto/') && !selectedProduct && location.pathname !== '/cadastro' && location.pathname !== '/login';

  let paddingBottom = '0';
  if (showBottomNav && showCartNotification) {
    paddingBottom = '160px'; // Nav (70-80) + Notification Space (80)
  } else if (showBottomNav) {
    paddingBottom = '80px';
  } else if (showCartNotification) {
    paddingBottom = '100px'; // Notification (approx 70-80) + margin
  }

  return (
    <div className="App" style={{ paddingTop: '80px', paddingBottom }}>
      <Header />

      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Home onProductClick={handleProductClick} />} />
          <Route path="/produto/:id" element={<ProductPage />} />
          <Route path="/categoria/:categoryName" element={<CategoryPage onProductClick={handleProductClick} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/busca" element={<SearchPage onProductClick={handleProductClick} />} />
          <Route path="/favoritos" element={<FavoritesPage onProductClick={handleProductClick} />} />
          <Route path="/carrinho" element={<CartPage />} />
        </Routes>
      </Suspense>

      {/* Render Global Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          productId={selectedProduct}
          onClose={handleCloseModal}
        />
      )}

      {showBottomNav && <BottomNavigation />}

      {showCartNotification && (
        <CartNotification
          cartItems={cartItems}
          hasBottomNav={showBottomNav}
        />
      )}
    </div>
  );
};



function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <ConfigProvider>
          <CartProvider>
            <FavoritesProvider>
              <AppContent />
            </FavoritesProvider>
          </CartProvider>
        </ConfigProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;


