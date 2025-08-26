import React from 'react';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const StickyAddToCart = ({ product, selectedVariant, quantity, onAddToCart }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const getSelectedVariantText = () => {
    const variants = Object.entries(selectedVariant)?.map(([type, value]) => {
      const variant = product?.variants?.[type];
      const option = variant?.options?.find(opt => opt?.id === value);
      return option?.name || value;
    });
    return variants?.length > 0 ? variants?.join(', ') : '';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border shadow-elevated md:hidden">
      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Product Image */}
          <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={product?.images?.[0]}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground text-sm truncate">
              {product?.name}
            </h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{formatPrice(product?.price)}</span>
              {getSelectedVariantText() && (
                <>
                  <span>•</span>
                  <span className="truncate">{getSelectedVariantText()}</span>
                </>
              )}
              <span>•</span>
              <span>Qty: {quantity}</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={onAddToCart}
            disabled={!product?.inStock}
            size="sm"
            iconName="ShoppingCart"
            className="flex-shrink-0"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyAddToCart;