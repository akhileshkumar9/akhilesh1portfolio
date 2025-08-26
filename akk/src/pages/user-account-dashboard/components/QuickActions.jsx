import React from 'react';

import Icon from '../../../components/AppIcon';

const QuickActions = ({ onActionClick }) => {
  const quickActions = [
    {
      id: 'track-order',
      title: 'Track Order',
      description: 'Check your order status',
      icon: 'Package',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      id: 'reorder',
      title: 'Reorder Items',
      description: 'Buy previous items again',
      icon: 'RotateCcw',
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      id: 'wishlist',
      title: 'View Wishlist',
      description: 'See your saved items',
      icon: 'Heart',
      color: 'bg-red-50 text-red-600 border-red-200'
    },
    {
      id: 'support',
      title: 'Get Support',
      description: 'Contact customer service',
      icon: 'MessageCircle',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => onActionClick(action?.id)}
            className={`p-4 rounded-lg border-2 transition-smooth hover:shadow-moderate focus-ring ${action?.color}`}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <Icon name={action?.icon} size={24} />
              <div>
                <div className="font-medium text-sm">{action?.title}</div>
                <div className="text-xs opacity-80">{action?.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;