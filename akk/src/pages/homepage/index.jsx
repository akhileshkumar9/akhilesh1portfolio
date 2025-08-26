import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturedProducts from './components/FeaturedProducts';
import CategoryShowcase from './components/CategoryShowcase';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

const Homepage = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');
      setIsAuthenticated(!!(token && user));
    };

    checkAuthStatus();
    
    // Listen for storage changes (login/logout from other tabs)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  // Load cart count from localStorage
  useEffect(() => {
    const loadCartCount = () => {
      try {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const totalCount = cartItems?.reduce((sum, item) => sum + (item?.quantity || 1), 0);
        setCartItemCount(totalCount);
      } catch (error) {
        console.error('Error loading cart count:', error);
        setCartItemCount(0);
      }
    };

    loadCartCount();
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', loadCartCount);
    
    return () => {
      window.removeEventListener('cartUpdated', loadCartCount);
    };
  }, []);

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    // In a real app, this would trigger search functionality
    console.log('Searching for:', query);
  };

  const handleCartClick = () => {
    // Navigate to cart page - handled by Header component
  };

  const handleAuthClick = () => {
    // Navigate to login/account page - handled by Header component
  };

  return (
    <>
      <Helmet>
        <title>EcommerceHub - Your Trusted Online Shopping Destination</title>
        <meta 
          name="description" 
          content="Discover quality products, exceptional service, and unbeatable prices at EcommerceHub. Shop electronics, fashion, home goods and more with fast shipping and secure checkout." 
        />
        <meta name="keywords" content="online shopping, ecommerce, electronics, fashion, home goods, deals, free shipping" />
        <meta property="og:title" content="EcommerceHub - Your Trusted Online Shopping Destination" />
        <meta property="og:description" content="Shop quality products with exceptional service and unbeatable prices. Fast shipping and secure checkout guaranteed." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ecommercehub.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EcommerceHub - Online Shopping" />
        <meta name="twitter:description" content="Your trusted destination for quality products and great deals." />
        <link rel="canonical" href="https://ecommercehub.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "EcommerceHub",
            "url": "https://ecommercehub.com",
            "description": "Your trusted online shopping destination for quality products",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://ecommercehub.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header
          isAuthenticated={isAuthenticated}
          cartItemCount={cartItemCount}
          onCartClick={handleCartClick}
          onAuthClick={handleAuthClick}
          onSearchSubmit={handleSearchSubmit}
        />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Featured Products */}
          <FeaturedProducts />

          {/* Category Showcase */}
          <CategoryShowcase />

          {/* Newsletter Section */}
          <NewsletterSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Homepage;