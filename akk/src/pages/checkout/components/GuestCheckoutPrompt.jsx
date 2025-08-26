import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GuestCheckoutPrompt = ({ onContinueAsGuest, onCreateAccount, isVisible }) => {
  if (!isVisible) return null;

  const benefits = [
    {
      icon: 'Clock',
      title: 'Faster Checkout',
      description: 'Save your information for quicker future purchases'
    },
    {
      icon: 'Package',
      title: 'Order Tracking',
      description: 'Track your orders and view purchase history'
    },
    {
      icon: 'Heart',
      title: 'Wishlist',
      description: 'Save items for later and get notified of price drops'
    },
    {
      icon: 'Tag',
      title: 'Exclusive Offers',
      description: 'Get access to member-only deals and early sales'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle mb-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="UserPlus" size={24} className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Create an account for a better experience
        </h3>
        <p className="text-muted-foreground">
          Join thousands of satisfied customers and enjoy exclusive benefits
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {benefits?.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={benefit?.icon} size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">{benefit?.title}</h4>
              <p className="text-xs text-muted-foreground">{benefit?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={onCreateAccount}
          iconName="UserPlus"
          iconPosition="left"
          className="flex-1"
        >
          Create Account
        </Button>
        <Button
          variant="outline"
          onClick={onContinueAsGuest}
          iconName="ArrowRight"
          iconPosition="right"
          className="flex-1"
        >
          Continue as Guest
        </Button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Already have an account?{' '}
          <button className="text-primary hover:underline font-medium">
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default GuestCheckoutPrompt;