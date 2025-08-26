import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const OrderConfirmation = ({ orderData, onContinueShopping, onViewOrder }) => {
  const { orderNumber, estimatedDelivery, items, total, shippingAddress, paymentMethod } = orderData;

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="CheckCircle" size={32} className="text-success" />
      </div>
      {/* Success Message */}
      <h1 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h1>
      <p className="text-muted-foreground mb-6">
        Thank you for your purchase. Your order has been successfully placed and is being processed.
      </p>
      {/* Order Details Card */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-subtle mb-6 text-left">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Order Details</h2>
          <span className="text-sm text-muted-foreground">#{orderNumber}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Estimated Delivery</h3>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">{estimatedDelivery}</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Total Amount</h3>
            <div className="flex items-center space-x-2">
              <Icon name="DollarSign" size={16} className="text-primary" />
              <span className="text-lg font-bold text-foreground">${total?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Items Summary */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Items Ordered</h3>
          <div className="space-y-3">
            {items?.slice(0, 3)?.map((item) => (
              <div key={item?.id} className="flex items-center space-x-3">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item?.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item?.quantity}</p>
                </div>
                <span className="text-sm font-medium text-foreground">
                  ${(item?.price * item?.quantity)?.toFixed(2)}
                </span>
              </div>
            ))}
            {items?.length > 3 && (
              <p className="text-sm text-muted-foreground">
                +{items?.length - 3} more items
              </p>
            )}
          </div>
        </div>

        {/* Shipping & Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Shipping Address</h3>
            <div className="text-sm text-muted-foreground">
              <p>{shippingAddress?.firstName} {shippingAddress?.lastName}</p>
              <p>{shippingAddress?.address}</p>
              {shippingAddress?.apartment && <p>{shippingAddress?.apartment}</p>}
              <p>{shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.zipCode}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Payment Method</h3>
            <div className="flex items-center space-x-2">
              <Icon name="CreditCard" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {paymentMethod?.type === 'card' 
                  ? `**** **** **** ${paymentMethod?.lastFour}`
                  : paymentMethod?.type
                }
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Next Steps */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">What happens next?</h3>
        <div className="space-y-2 text-sm text-muted-foreground text-left">
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={14} className="text-primary flex-shrink-0" />
            <span>Order confirmation email sent to your inbox</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Package" size={14} className="text-primary flex-shrink-0" />
            <span>Your order will be processed within 1-2 business days</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Truck" size={14} className="text-primary flex-shrink-0" />
            <span>Shipping notification with tracking details will follow</span>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={onViewOrder}
          iconName="Eye"
          iconPosition="left"
          className="flex-1"
        >
          View Order Details
        </Button>
        <Button
          variant="outline"
          onClick={onContinueShopping}
          iconName="ShoppingBag"
          iconPosition="left"
          className="flex-1"
        >
          Continue Shopping
        </Button>
      </div>
      {/* Support Info */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Need help with your order?
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <button className="text-primary hover:underline flex items-center space-x-1">
            <Icon name="MessageCircle" size={14} />
            <span>Live Chat</span>
          </button>
          <button className="text-primary hover:underline flex items-center space-x-1">
            <Icon name="Phone" size={14} />
            <span>Call Support</span>
          </button>
          <button className="text-primary hover:underline flex items-center space-x-1">
            <Icon name="Mail" size={14} />
            <span>Email Us</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;