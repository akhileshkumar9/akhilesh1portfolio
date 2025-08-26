import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrdersSection = ({ orders, onTrackOrder, onReorder, onCancelOrder, onReturnOrder }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'amount-high', label: 'Amount: High to Low' },
    { value: 'amount-low', label: 'Amount: Low to High' }
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'CheckCircle';
      case 'shipped':
        return 'Truck';
      case 'processing':
        return 'Clock';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Package';
    }
  };

  const filteredOrders = orders?.filter(order => filterStatus === 'all' || order?.status?.toLowerCase() === filterStatus)?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.orderDate) - new Date(a.orderDate);
        case 'oldest':
          return new Date(a.orderDate) - new Date(b.orderDate);
        case 'amount-high':
          return b?.total - a?.total;
        case 'amount-low':
          return a?.total - b?.total;
        default:
          return 0;
      }
    });

  const canCancelOrder = (order) => {
    return ['processing']?.includes(order?.status?.toLowerCase());
  };

  const canReturnOrder = (order) => {
    return ['delivered']?.includes(order?.status?.toLowerCase()) && 
           new Date() - new Date(order.deliveredDate) < 30 * 24 * 60 * 60 * 1000; // 30 days
  };

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold text-foreground">Order History</h2>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e?.target?.value)}
            className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-smooth"
          >
            {statusOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-smooth"
          >
            {sortOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-6">
        {filteredOrders?.map((order) => (
          <div key={order?.id} className="border border-border rounded-lg p-6">
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-foreground">Order #{order?.orderNumber}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
                      <Icon name={getStatusIcon(order?.status)} size={12} className="mr-1" />
                      {order?.status}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Ordered on {new Date(order.orderDate)?.toLocaleDateString()} • ${order?.total}
                  </div>
                  {order?.trackingNumber && (
                    <div className="text-sm text-muted-foreground">
                      Tracking: {order?.trackingNumber}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onTrackOrder(order?.id)}
                  iconName="Package"
                  iconPosition="left"
                >
                  Track Order
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onReorder(order?.id)}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reorder
                </Button>
                {canCancelOrder(order) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCancelOrder(order?.id)}
                    iconName="X"
                    iconPosition="left"
                    className="text-destructive hover:text-destructive"
                  >
                    Cancel
                  </Button>
                )}
                {canReturnOrder(order) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReturnOrder(order?.id)}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Return
                  </Button>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3">
              {order?.items?.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{item?.name}</h4>
                    <div className="text-sm text-muted-foreground">
                      {item?.variant && <span>Variant: {item?.variant} • </span>}
                      Qty: {item?.quantity} • ${item?.price} each
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-foreground">
                      ${(item?.price * item?.quantity)?.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="text-foreground">${order?.subtotal}</span>
              </div>
              {order?.discount > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Discount:</span>
                  <span className="text-green-600">-${order?.discount}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Shipping:</span>
                <span className="text-foreground">${order?.shipping}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Tax:</span>
                <span className="text-foreground">${order?.tax}</span>
              </div>
              <div className="flex justify-between items-center font-semibold text-foreground pt-2 border-t border-border">
                <span>Total:</span>
                <span>${order?.total}</span>
              </div>
            </div>

            {/* Delivery Information */}
            {order?.shippingAddress && (
              <div className="mt-4 pt-4 border-t border-border">
                <h5 className="font-medium text-foreground mb-2">Delivery Address</h5>
                <div className="text-sm text-muted-foreground">
                  <div>{order?.shippingAddress?.name}</div>
                  <div>{order?.shippingAddress?.address1}</div>
                  {order?.shippingAddress?.address2 && <div>{order?.shippingAddress?.address2}</div>}
                  <div>{order?.shippingAddress?.city}, {order?.shippingAddress?.state} {order?.shippingAddress?.zipCode}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredOrders?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            {filterStatus === 'all' ? 'No orders found' : `No ${filterStatus} orders`}
          </h3>
          <p className="text-muted-foreground mb-6">
            {filterStatus === 'all' ? "You haven't placed any orders yet" 
              : `You don't have any ${filterStatus} orders`}
          </p>
          {filterStatus === 'all' && (
            <Button 
              variant="default" 
              onClick={() => window.location.href = '/homepage'}
              iconName="ShoppingBag"
              iconPosition="left"
            >
              Start Shopping
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersSection;