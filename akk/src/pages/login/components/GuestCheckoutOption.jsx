import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GuestCheckoutOption = ({ onGuestCheckout }) => {
  const navigate = useNavigate();

  const handleGuestCheckout = () => {
    if (onGuestCheckout) {
      onGuestCheckout();
    } else {
      navigate('/checkout');
    }
  };

  const benefits = [
    'Quick checkout process',
    'No account required',
    'Secure payment processing',
    'Order tracking via email'
  ];

  return (
    <div className="bg-muted/50 rounded-lg p-6 border border-border">
      <div className="text-center mb-4">
        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Icon name="ShoppingCart" size={24} className="text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Continue as Guest
        </h3>
        <p className="text-sm text-muted-foreground">
          Complete your purchase without creating an account
        </p>
      </div>
      <div className="space-y-2 mb-6">
        {benefits?.map((benefit, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Icon name="Check" size={16} className="text-success flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{benefit}</span>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        size="lg"
        fullWidth
        onClick={handleGuestCheckout}
        iconName="ArrowRight"
        iconPosition="right"
      >
        Continue as Guest
      </Button>
      <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-primary mb-1">
              Why create an account?
            </p>
            <ul className="text-xs text-primary/80 space-y-1">
              <li>• Track orders and view history</li>
              <li>• Save addresses and payment methods</li>
              <li>• Get exclusive offers and early access</li>
              <li>• Faster checkout for future purchases</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestCheckoutOption;