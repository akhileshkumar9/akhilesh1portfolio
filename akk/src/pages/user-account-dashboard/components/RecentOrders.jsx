import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecentOrders = ({ orders, onViewAllOrders, onTrackOrder, onReorder }) => {
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

  return (
    <div className="bg-card rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onViewAllOrders}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {orders?.map((order) => (
          <div key={order?.id} className="border border-border rounded-lg p-4 hover:shadow-subtle transition-smooth">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src={order?.items?.[0]?.image}
                    alt={order?.items?.[0]?.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-foreground">Order #{order?.orderNumber}</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
                      <Icon name={getStatusIcon(order?.status)} size={12} className="mr-1" />
                      {order?.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {order?.items?.length} item{order?.items?.length > 1 ? 's' : ''} • ${order?.total}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Ordered on {new Date(order.orderDate)?.toLocaleDateString()}
                  </p>
                  {order?.trackingNumber && (
                    <p className="text-xs text-muted-foreground">
                      Tracking: {order?.trackingNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onTrackOrder(order?.id)}
                  iconName="Package"
                  iconPosition="left"
                >
                  Track
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
              </div>
            </div>
          </div>
        ))}
      </div>
      {orders?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No orders found</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.href = '/homepage'}>
            Start Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;