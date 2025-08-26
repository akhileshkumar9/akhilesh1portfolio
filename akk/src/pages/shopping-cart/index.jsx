import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EmptyCart from './components/EmptyCart';
import CartSummaryMobile from './components/CartSummaryMobile';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      originalPrice: 249.99,
      quantity: 1,
      stock: 15,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      variant: {
        color: "Black",
        size: null
      }
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      originalPrice: null,
      quantity: 2,
      stock: 3,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      variant: {
        color: "Navy Blue",
        size: "Large"
      }
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      price: 299.99,
      originalPrice: 349.99,
      quantity: 1,
      stock: 8,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      variant: {
        color: "Space Gray",
        size: "42mm"
      }
    }
  ];

  // Mock featured products for empty cart
  const mockFeaturedProducts = [
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      rating: 4.5,
      reviewCount: 128
    },
    {
      id: 5,
      name: "Laptop Stand",
      price: 49.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 89
    },
    {
      id: 6,
      name: "Wireless Mouse",
      price: 39.99,
      originalPrice: 59.99,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
      rating: 4.3,
      reviewCount: 256
    },
    {
      id: 7,
      name: "Phone Case",
      price: 19.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 342
    }
  ];

  // Mock coupon codes
  const validCoupons = {
    'SAVE10': { discount: 0.1, type: 'percentage', message: '10% off applied!' },
    'WELCOME20': { discount: 20, type: 'fixed', message: '$20 off applied!' },
    'FREESHIP': { discount: 0, type: 'shipping', message: 'Free shipping applied!' }
  };

  // Load cart data
  useEffect(() => {
    const loadCartData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Load from localStorage or use mock data
      const savedCart = localStorage.getItem('shopping-cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (error) {
          setCartItems(mockCartItems);
        }
      } else {
        setCartItems(mockCartItems);
      }
      
      setIsLoading(false);
    };

    loadCartData();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems?.length > 0) {
      localStorage.setItem('shopping-cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('shopping-cart');
    }
  }, [cartItems]);

  // Calculate totals
  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const itemCount = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 75 ? 0 : 9.99; // Free shipping over $75
  const total = subtotal + tax + shipping - discount;

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems?.map(item =>
        item?.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems?.filter(item => item?.id !== itemId));
  };

  const handleSaveForLater = (itemId) => {
    // In a real app, this would move the item to wishlist
    const item = cartItems?.find(item => item?.id === itemId);
    if (item) {
      // Save to wishlist (mock)
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const wishlistItem = { ...item, addedAt: new Date()?.toISOString() };
      localStorage.setItem('wishlist', JSON.stringify([...wishlist, wishlistItem]));
      
      // Remove from cart
      handleRemoveItem(itemId);
    }
  };

  const handleApplyCoupon = async (couponCode) => {
    if (!couponCode) {
      setAppliedCoupon(null);
      setDiscount(0);
      return { success: true };
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const coupon = validCoupons?.[couponCode];
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code' };
    }

    setAppliedCoupon(couponCode);
    
    if (coupon?.type === 'percentage') {
      setDiscount(subtotal * coupon?.discount);
    } else if (coupon?.type === 'fixed') {
      setDiscount(Math.min(coupon?.discount, subtotal));
    } else if (coupon?.type === 'shipping') {
      setDiscount(shipping);
    }

    return { success: true, message: coupon?.message };
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Shopping Cart', path: '/shopping-cart', icon: 'ShoppingCart' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          cartItemCount={0}
          onCartClick={() => {}}
          onAuthClick={() => {}}
          onSearchSubmit={() => {}}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your cart...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={itemCount}
        onCartClick={() => {}}
        onAuthClick={() => {}}
        onSearchSubmit={() => {}}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
            {cartItems?.length > 0 && (
              <p className="text-muted-foreground mt-2">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            )}
          </div>
          
          {cartItems?.length > 0 && (
            <button
              onClick={() => navigate('/homepage')}
              className="hidden sm:flex items-center gap-2 text-primary hover:text-primary/80 transition-smooth focus-ring rounded-md px-3 py-2"
            >
              <Icon name="ArrowLeft" size={16} />
              Continue Shopping
            </button>
          )}
        </div>

        {cartItems?.length === 0 ? (
          <EmptyCart featuredProducts={mockFeaturedProducts} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems?.map((item) => (
                <CartItem
                  key={item?.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                  onSaveForLater={handleSaveForLater}
                />
              ))}

              {/* Bulk Actions - Desktop */}
              <div className="hidden sm:flex items-center justify-between pt-4 border-t border-border">
                <button
                  onClick={() => setCartItems([])}
                  className="flex items-center gap-2 text-muted-foreground hover:text-error transition-smooth focus-ring rounded-md px-3 py-2"
                >
                  <Icon name="Trash2" size={16} />
                  Clear Cart
                </button>
                
                <button
                  onClick={() => navigate('/homepage')}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-smooth focus-ring rounded-md px-3 py-2"
                >
                  <Icon name="ArrowLeft" size={16} />
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Order Summary - Desktop */}
            <div className="hidden lg:block">
              <OrderSummary
                subtotal={subtotal}
                tax={tax}
                shipping={shipping}
                discount={discount}
                total={total}
                itemCount={itemCount}
                onApplyCoupon={handleApplyCoupon}
                appliedCoupon={appliedCoupon}
              />
            </div>
          </div>
        )}

        {/* Mobile Order Summary */}
        {cartItems?.length > 0 && (
          <>
            <div className="lg:hidden mt-8 mb-20">
              <OrderSummary
                subtotal={subtotal}
                tax={tax}
                shipping={shipping}
                discount={discount}
                total={total}
                itemCount={itemCount}
                onApplyCoupon={handleApplyCoupon}
                appliedCoupon={appliedCoupon}
              />
            </div>

            <CartSummaryMobile
              total={total}
              itemCount={itemCount}
              discount={discount}
              appliedCoupon={appliedCoupon}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;