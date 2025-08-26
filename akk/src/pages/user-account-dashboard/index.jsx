import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import WelcomeSection from './components/WelcomeSection';
import QuickActions from './components/QuickActions';
import RecentOrders from './components/RecentOrders';
import AccountSidebar from './components/AccountSidebar';
import ProfileSection from './components/ProfileSection';
import AddressSection from './components/AddressSection';
import WishlistSection from './components/WishlistSection';
import OrdersSection from './components/OrdersSection';

const UserAccountDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);

  // Mock user data
  const [user, setUser] = useState({
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "female",
    memberSince: "2022-03-15",
    totalOrders: 24,
    loyaltyPoints: 1250,
    wishlistCount: 8,
    totalSpent: "2,847.50"
  });

  // Mock recent orders data
  const [recentOrders] = useState([
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      status: "Delivered",
      orderDate: "2024-08-20T10:30:00Z",
      deliveredDate: "2024-08-23T14:20:00Z",
      total: 89.99,
      subtotal: 79.99,
      shipping: 5.99,
      tax: 4.01,
      discount: 0,
      trackingNumber: "1Z999AA1234567890",
      items: [
        {
          name: "Wireless Bluetooth Headphones",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
          price: 79.99,
          quantity: 1,
          variant: "Black"
        }
      ],
      shippingAddress: {
        name: "Sarah Johnson",
        address1: "123 Main Street",
        address2: "Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001"
      }
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      status: "Shipped",
      orderDate: "2024-08-22T15:45:00Z",
      total: 156.47,
      subtotal: 139.98,
      shipping: 7.99,
      tax: 8.50,
      discount: 0,
      trackingNumber: "1Z999AA1234567891",
      items: [
        {
          name: "Smart Fitness Watch",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
          price: 139.98,
          quantity: 1,
          variant: "Silver"
        }
      ],
      shippingAddress: {
        name: "Sarah Johnson",
        address1: "123 Main Street",
        address2: "Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001"
      }
    },
    {
      id: 3,
      orderNumber: "ORD-2024-003",
      status: "Processing",
      orderDate: "2024-08-24T09:15:00Z",
      total: 245.99,
      subtotal: 219.99,
      shipping: 9.99,
      tax: 16.01,
      discount: 0,
      items: [
        {
          name: "Premium Coffee Maker",
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
          price: 219.99,
          quantity: 1,
          variant: "Stainless Steel"
        }
      ],
      shippingAddress: {
        name: "Sarah Johnson",
        address1: "123 Main Street",
        address2: "Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001"
      }
    }
  ]);

  // Mock addresses data
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "shipping",
      firstName: "Sarah",
      lastName: "Johnson",
      company: "",
      address1: "123 Main Street",
      address2: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
      isDefault: true
    },
    {
      id: 2,
      type: "billing",
      firstName: "Sarah",
      lastName: "Johnson",
      company: "Tech Solutions Inc.",
      address1: "456 Business Ave",
      address2: "Suite 200",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      phone: "+1 (555) 987-6543",
      isDefault: false
    }
  ]);

  // Mock wishlist data
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Premium Leather Backpack",
      brand: "Urban Explorer",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      rating: 4.8,
      inStock: true,
      discount: 19,
      addedDate: "2024-08-15T10:30:00Z"
    },
    {
      id: 2,
      name: "Wireless Charging Pad",
      brand: "TechGear",
      price: 39.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
      rating: 4.5,
      inStock: true,
      discount: null,
      addedDate: "2024-08-18T14:20:00Z"
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      brand: "EcoWear",
      price: 24.99,
      originalPrice: 29.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      rating: 4.3,
      inStock: false,
      discount: 17,
      addedDate: "2024-08-20T16:45:00Z"
    }
  ]);

  // Check screen size for mobile layout
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle quick actions
  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'track-order': setActiveTab('orders');
        break;
      case 'reorder': setActiveTab('orders');
        break;
      case 'wishlist': setActiveTab('wishlist');
        break;
      case 'support':
        // Navigate to support page or open chat
        alert('Support feature coming soon!');
        break;
      default:
        break;
    }
  };

  // Handle order actions
  const handleViewAllOrders = () => {
    setActiveTab('orders');
  };

  const handleTrackOrder = (orderId) => {
    alert(`Tracking order ${orderId}. This feature will show detailed tracking information.`);
  };

  const handleReorder = (orderId) => {
    const order = recentOrders?.find(o => o?.id === orderId);
    if (order) {
      alert(`Reordering items from order ${order?.orderNumber}. Items will be added to cart.`);
    }
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      alert(`Order ${orderId} has been cancelled.`);
    }
  };

  const handleReturnOrder = (orderId) => {
    alert(`Return process initiated for order ${orderId}.`);
  };

  // Handle profile updates
  const handleUpdateProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
    alert('Profile updated successfully!');
  };

  // Handle address management
  const handleAddAddress = (addressData) => {
    const newAddress = {
      ...addressData,
      id: Math.max(...addresses?.map(a => a?.id)) + 1
    };
    setAddresses(prev => [...prev, newAddress]);
    alert('Address added successfully!');
  };

  const handleUpdateAddress = (addressId, updatedData) => {
    setAddresses(prev => prev?.map(addr => 
      addr?.id === addressId ? { ...addr, ...updatedData } : addr
    ));
    alert('Address updated successfully!');
  };

  const handleDeleteAddress = (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev?.filter(addr => addr?.id !== addressId));
      alert('Address deleted successfully!');
    }
  };

  const handleSetDefaultAddress = (addressId) => {
    setAddresses(prev => prev?.map(addr => ({
      ...addr,
      isDefault: addr?.id === addressId
    })));
    alert('Default address updated!');
  };

  // Handle wishlist actions
  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const handleAddToCart = (item) => {
    alert(`${item?.name} added to cart!`);
  };

  const handleViewProduct = (productId) => {
    navigate('/product-detail');
  };

  // Handle cart click
  const handleCartClick = () => {
    navigate('/shopping-cart');
  };

  // Handle auth click
  const handleAuthClick = () => {
    navigate('/login');
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <WelcomeSection user={user} />
            <QuickActions onActionClick={handleQuickAction} />
            <RecentOrders 
              orders={recentOrders?.slice(0, 3)} 
              onViewAllOrders={handleViewAllOrders}
              onTrackOrder={handleTrackOrder}
              onReorder={handleReorder}
            />
          </div>
        );
      case 'orders':
        return (
          <OrdersSection
            orders={recentOrders}
            onTrackOrder={handleTrackOrder}
            onReorder={handleReorder}
            onCancelOrder={handleCancelOrder}
            onReturnOrder={handleReturnOrder}
          />
        );
      case 'profile':
        return (
          <ProfileSection
            user={user}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'addresses':
        return (
          <AddressSection
            addresses={addresses}
            onAddAddress={handleAddAddress}
            onUpdateAddress={handleUpdateAddress}
            onDeleteAddress={handleDeleteAddress}
            onSetDefault={handleSetDefaultAddress}
          />
        );
      case 'payment':
        return (
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Payment Methods</h2>
            <div className="text-center py-12">
              <p className="text-muted-foreground">Payment methods management coming soon!</p>
            </div>
          </div>
        );
      case 'wishlist':
        return (
          <WishlistSection
            wishlistItems={wishlistItems}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onAddToCart={handleAddToCart}
            onViewProduct={handleViewProduct}
          />
        );
      case 'preferences':
        return (
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Account Preferences</h2>
            <div className="text-center py-12">
              <p className="text-muted-foreground">Preferences settings coming soon!</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={true}
        cartItemCount={3}
        onCartClick={handleCartClick}
        onAuthClick={handleAuthClick}
        onSearchSubmit={(query) => console.log('Search:', query)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Breadcrumb />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <aside className="lg:w-64 flex-shrink-0">
              <AccountSidebar 
                activeTab={activeTab} 
                onTabChange={setActiveTab}
                isMobile={false}
              />
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <>
            <div className="h-20" /> {/* Spacer for fixed bottom nav */}
            <AccountSidebar 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
              isMobile={true}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default UserAccountDashboard;