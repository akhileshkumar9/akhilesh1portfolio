import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrderSummary = ({ items, subtotal, shipping, tax, total, promoCode, onPromoCodeChange, onApplyPromo, promoDiscount }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <h3 className="text-lg font-semibold text-foreground mb-4">Order Summary</h3>
      {/* Items */}
      <div className="space-y-4 mb-6">
        {items?.map((item) => (
          <div key={item?.id} className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={item?.image}
                alt={item?.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                {item?.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{item?.name}</p>
              <p className="text-xs text-muted-foreground">{item?.variant}</p>
            </div>
            <p className="text-sm font-medium text-foreground">${(item?.price * item?.quantity)?.toFixed(2)}</p>
          </div>
        ))}
      </div>
      {/* Promo Code */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => onPromoCodeChange(e?.target?.value)}
            className="flex-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-smooth"
          />
          <button
            onClick={onApplyPromo}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Apply
          </button>
        </div>
        {promoDiscount > 0 && (
          <div className="mt-2 flex items-center text-success text-sm">
            <Icon name="Check" size={16} className="mr-1" />
            <span>Promo code applied! You saved ${promoDiscount?.toFixed(2)}</span>
          </div>
        )}
      </div>
      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">${subtotal?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground">${shipping?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="text-foreground">${tax?.toFixed(2)}</span>
        </div>
        {promoDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>
            <span className="text-success">-${promoDiscount?.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t border-border pt-3">
          <div className="flex justify-between">
            <span className="text-base font-semibold text-foreground">Total</span>
            <span className="text-lg font-bold text-foreground">${total?.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
        <div className="flex items-center">
          <Icon name="Shield" size={14} className="mr-1" />
          <span>SSL Secured</span>
        </div>
        <div className="flex items-center">
          <Icon name="Lock" size={14} className="mr-1" />
          <span>256-bit Encryption</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;