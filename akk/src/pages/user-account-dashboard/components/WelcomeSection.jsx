import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ user }) => {
  const currentHour = new Date()?.getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {greeting}, {user?.firstName}!
          </h1>
          <p className="text-primary-foreground/80">
            Welcome back to your account dashboard
          </p>
        </div>
        <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-white/20 rounded-full">
          <Icon name="User" size={32} color="white" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <div className="text-center">
          <div className="text-2xl font-bold">{user?.totalOrders}</div>
          <div className="text-sm text-primary-foreground/80">Total Orders</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{user?.loyaltyPoints}</div>
          <div className="text-sm text-primary-foreground/80">Points</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{user?.wishlistCount}</div>
          <div className="text-sm text-primary-foreground/80">Wishlist</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">${user?.totalSpent}</div>
          <div className="text-sm text-primary-foreground/80">Total Spent</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;