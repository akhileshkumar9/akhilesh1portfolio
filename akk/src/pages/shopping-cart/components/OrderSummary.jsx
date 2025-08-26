import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummary = ({ 
  subtotal, 
  tax, 
  shipping, 
  discount, 
  total, 
  itemCount,
  onApplyCoupon,
  appliedCoupon 
}) => {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode?.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    setIsApplyingCoupon(true);
    setCouponError('');

    try {
      const result = await onApplyCoupon(couponCode?.trim()?.toUpperCase());
      if (!result?.success) {
        setCouponError(result?.message || 'Invalid coupon code');
      } else {
        setCouponCode('');
      }
    } catch (error) {
      setCouponError('Failed to apply coupon. Please try again.');
    }

    setIsApplyingCoupon(false);
  };

  const handleRemoveCoupon = () => {
    onApplyCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/homepage');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
      <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>
      {/* Order Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </span>
          <span className="font-medium text-foreground">${subtotal?.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-success flex items-center gap-1">
              <Icon name="Tag" size={14} />
              Discount {appliedCoupon && `(${appliedCoupon})`}
            </span>
            <span className="font-medium text-success">-${discount?.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Tax</span>
          <span className="font-medium text-foreground">${tax?.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-1">
            Shipping
            <Icon name="Info" size={14} className="text-muted-foreground" />
          </span>
          <span className="font-medium text-foreground">
            {shipping === 0 ? 'FREE' : `$${shipping?.toFixed(2)}`}
          </span>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-foreground">Total</span>
            <span className="text-lg font-semibold text-foreground">${total?.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Coupon Section */}
      <div className="mb-6">
        {!appliedCoupon ? (
          <div className="space-y-3">
            <Input
              label="Coupon Code"
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e?.target?.value?.toUpperCase())}
              error={couponError}
              className="text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleApplyCoupon}
              loading={isApplyingCoupon}
              disabled={!couponCode?.trim()}
              fullWidth
            >
              Apply Coupon
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">
                Coupon "{appliedCoupon}" applied
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveCoupon}
              className="text-muted-foreground hover:text-foreground h-auto p-1"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
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

        <Button
          variant="outline"
          size="default"
          onClick={handleContinueShopping}
          fullWidth
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Continue Shopping
        </Button>
      </div>
      {/* Security Badge */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Icon name="Shield" size={14} />
          <span>Secure checkout with SSL encryption</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;