import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove, onSaveForLater }) => {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > item?.stock) return;
    
    setIsUpdating(true);
    await onUpdateQuantity(item?.id, newQuantity);
    setIsUpdating(false);
  };

  const handleProductClick = () => {
    navigate('/product-detail', { state: { productId: item?.id } });
  };

  const handleRemove = () => {
    onRemove(item?.id);
  };

  const handleSaveForLater = () => {
    onSaveForLater(item?.id);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6 transition-smooth hover:shadow-subtle">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <button
            onClick={handleProductClick}
            className="block w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-muted focus-ring"
          >
            <Image
              src={item?.image}
              alt={item?.name}
              className="w-full h-full object-cover hover:scale-105 transition-smooth"
            />
          </button>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <button
                onClick={handleProductClick}
                className="text-left focus-ring rounded-md p-1 -m-1"
              >
                <h3 className="font-semibold text-foreground hover:text-primary transition-smooth truncate">
                  {item?.name}
                </h3>
              </button>
              
              {item?.variant && (
                <p className="text-sm text-muted-foreground mt-1">
                  {item?.variant?.color && `Color: ${item?.variant?.color}`}
                  {item?.variant?.color && item?.variant?.size && ' • '}
                  {item?.variant?.size && `Size: ${item?.variant?.size}`}
                </p>
              )}
              
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-semibold text-foreground">
                  ${item?.price?.toFixed(2)}
                </span>
                {item?.originalPrice && item?.originalPrice > item?.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${item?.originalPrice?.toFixed(2)}
                  </span>
                )}
              </div>

              {item?.stock <= 5 && (
                <p className="text-sm text-warning mt-1 flex items-center gap-1">
                  <Icon name="AlertTriangle" size={14} />
                  Only {item?.stock} left in stock
                </p>
              )}
            </div>

            {/* Desktop Price */}
            <div className="hidden sm:block text-right">
              <p className="text-lg font-semibold text-foreground">
                ${(item?.price * item?.quantity)?.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(item?.quantity - 1)}
                  disabled={item?.quantity <= 1 || isUpdating}
                  className="h-8 w-8 p-0 rounded-r-none border-r border-border"
                >
                  <Icon name="Minus" size={16} />
                </Button>
                
                <span className="px-3 py-1 text-sm font-medium min-w-[3rem] text-center">
                  {isUpdating ? '...' : item?.quantity}
                </span>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(item?.quantity + 1)}
                  disabled={item?.quantity >= item?.stock || isUpdating}
                  className="h-8 w-8 p-0 rounded-l-none border-l border-border"
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>

              {/* Mobile Price */}
              <div className="sm:hidden">
                <p className="text-lg font-semibold text-foreground">
                  ${(item?.price * item?.quantity)?.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSaveForLater}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="Heart" size={16} />
                <span className="hidden sm:inline ml-1">Save for Later</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="text-muted-foreground hover:text-error"
              >
                <Icon name="Trash2" size={16} />
                <span className="hidden sm:inline ml-1">Remove</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;