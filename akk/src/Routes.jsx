import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ShoppingCart from './pages/shopping-cart';
import Login from './pages/login';
import UserAccountDashboard from './pages/user-account-dashboard';
import CheckoutPage from './pages/checkout';
import Homepage from './pages/homepage';
import ProductDetail from './pages/product-detail';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CheckoutPage />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-account-dashboard" element={<UserAccountDashboard />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;