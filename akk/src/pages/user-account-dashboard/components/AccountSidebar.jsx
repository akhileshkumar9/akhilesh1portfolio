import React from 'react';
import Icon from '../../../components/AppIcon';

const AccountSidebar = ({ activeTab, onTabChange, isMobile = false }) => {
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview & quick actions'
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: 'Package',
      description: 'Order history & tracking'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      description: 'Personal information'
    },
    {
      id: 'addresses',
      label: 'Addresses',
      icon: 'MapPin',
      description: 'Shipping & billing addresses'
    },
    {
      id: 'payment',
      label: 'Payment Methods',
      icon: 'CreditCard',
      description: 'Saved payment options'
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: 'Heart',
      description: 'Saved items'
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: 'Settings',
      description: 'Account settings'
    }
  ];

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40">
        <div className="flex overflow-x-auto">
          {navigationItems?.slice(0, 5)?.map((item) => (
            <button
              key={item?.id}
              onClick={() => onTabChange(item?.id)}
              className={`flex-1 min-w-0 px-2 py-3 text-center transition-smooth ${
                activeTab === item?.id
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={item?.icon} size={20} className="mx-auto mb-1" />
              <span className="text-xs font-medium truncate">{item?.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-card rounded-lg p-6 h-fit sticky top-24">
      <h3 className="font-semibold text-foreground mb-4">Account Menu</h3>
      <nav className="space-y-2">
        {navigationItems?.map((item) => (
          <button
            key={item?.id}
            onClick={() => onTabChange(item?.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-smooth focus-ring ${
              activeTab === item?.id
                ? 'text-primary bg-primary/10 border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={item?.icon} size={18} />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{item?.label}</div>
              <div className="text-xs opacity-80 truncate">{item?.description}</div>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AccountSidebar;