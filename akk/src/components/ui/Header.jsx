import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ 
  isAuthenticated = false, 
  cartItemCount = 0, 
  onCartClick, 
  onAuthClick,
  onSearchSubmit 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Shop', path: '/homepage', icon: 'Store' },
    { label: 'Categories', path: '/categories', icon: 'Grid3X3' },
    { label: 'Deals', path: '/deals', icon: 'Tag' },
    { label: 'New Arrivals', path: '/new-arrivals', icon: 'Sparkles' }
  ];

  const handleLogoClick = () => {
    navigate('/homepage');
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim() && onSearchSubmit) {
      onSearchSubmit(searchQuery?.trim());
    }
  };

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      navigate('/shopping-cart');
    }
    setIsMobileMenuOpen(false);
  };

  const handleAuthClick = () => {
    if (onAuthClick) {
      onAuthClick();
    } else {
      navigate(isAuthenticated ? '/user-account-dashboard' : '/login');
    }
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location?.pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e?.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-moderate border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={handleLogoClick}
                className="flex items-center space-x-2 transition-smooth hover:opacity-80 focus-ring rounded-md p-1"
                aria-label="EcommerceHub Home"
              >
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="ShoppingBag" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold text-foreground hidden sm:block">
                  EcommerceHub
                </span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavClick(item?.path)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-smooth focus-ring ${
                    location?.pathname === item?.path
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </button>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearchSubmit} className="w-full relative">
                <div className={`relative transition-smooth ${isSearchFocused ? 'ring-2 ring-ring ring-offset-2' : ''} rounded-lg`}>
                  <Icon 
                    name="Search" 
                    size={20} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                  <input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:border-ring transition-smooth"
                  />
                </div>
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search */}
              <button
                className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-smooth focus-ring rounded-md"
                aria-label="Search"
              >
                <Icon name="Search" size={20} />
              </button>

              {/* Cart */}
              <button
                onClick={handleCartClick}
                className="relative p-2 text-muted-foreground hover:text-foreground transition-smooth focus-ring rounded-md"
                aria-label={`Shopping cart with ${cartItemCount} items`}
              >
                <Icon name="ShoppingCart" size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] transition-spring">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </button>

              {/* Account */}
              <button
                onClick={handleAuthClick}
                className="hidden sm:flex items-center space-x-2 p-2 text-muted-foreground hover:text-foreground transition-smooth focus-ring rounded-md"
                aria-label={isAuthenticated ? 'Account dashboard' : 'Sign in'}
              >
                <Icon name={isAuthenticated ? 'User' : 'LogIn'} size={20} />
                <span className="text-sm font-medium hidden lg:block">
                  {isAuthenticated ? 'Account' : 'Sign In'}
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-smooth focus-ring rounded-md"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-subtle"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bg-background border-b border-border shadow-elevated">
            <div className="px-4 py-6 space-y-6">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="md:hidden">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={20} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                  <input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-base placeholder:text-muted-foreground focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-smooth"
                  />
                </div>
              </form>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navigationItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavClick(item?.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-smooth focus-ring ${
                      location?.pathname === item?.path
                        ? 'text-primary bg-primary/10' :'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span className="font-medium">{item?.label}</span>
                  </button>
                ))}
              </nav>

              {/* Mobile Account */}
              <div className="pt-4 border-t border-border">
                <button
                  onClick={handleAuthClick}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-foreground hover:bg-muted transition-smooth focus-ring"
                >
                  <Icon name={isAuthenticated ? 'User' : 'LogIn'} size={20} />
                  <span className="font-medium">
                    {isAuthenticated ? 'My Account' : 'Sign In'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
};

export default Header;