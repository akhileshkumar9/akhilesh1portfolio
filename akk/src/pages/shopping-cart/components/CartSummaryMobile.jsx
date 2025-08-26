import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartSummaryMobile = ({ 
  total, 
  itemCount, 
  discount,
  appliedCoupon 
}) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-40 sm:hidden">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>
          {discount > 0 && appliedCoupon && (
            <p className="text-xs text-success flex items-center gap-1">
              <Icon name="Tag" size={12} />
              {appliedCoupon} applied
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-foreground">
            ${total?.toFixed(2)}
          </p>
          {discount > 0 && (
            <p className="text-xs text-muted-foreground line-through">
              ${(total + discount)?.toFixed(2)}
            </p>
          )}
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        onClick={handleCheckout}
        fullWidth
        iconName="CreditCard"
        iconPosition="left"
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummaryMobile;