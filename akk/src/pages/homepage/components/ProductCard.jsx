import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isInWishlist = false }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate('/product-detail', { state: { productId: product?.id } });
  };

  const handleAddToCart = (e) => {
    e?.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleWishlistToggle = (e) => {
    e?.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product?.id);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  return (
    <div className="group bg-card rounded-lg border border-border overflow-hidden shadow-subtle hover:shadow-moderate transition-all duration-300 cursor-pointer">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted" onClick={handleProductClick}>
        <Image
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product?.isNew && (
            <span className="bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded-full">
              New
            </span>
          )}
          {product?.discount && (
            <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
              -{product?.discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Icon
            name="Heart"
            size={16}
            className={isInWishlist ? 'text-error fill-current' : 'text-muted-foreground'}
          />
        </button>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="default"
            size="sm"
            onClick={handleAddToCart}
            iconName="ShoppingCart"
            iconPosition="left"
            fullWidth
            className="bg-white text-black hover:bg-white/90"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      {/* Product Info */}
      <div className="p-4" onClick={handleProductClick}>
        <div className="mb-2">
          <h3 className="font-medium text-foreground line-clamp-2 mb-1">
            {product?.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {product?.category}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={14}
                className={`${
                  i < Math.floor(product?.rating)
                    ? 'text-accent fill-current' :'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product?.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              {formatPrice(product?.price)}
            </span>
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product?.originalPrice)}
              </span>
            )}
          </div>
          
          {product?.stock <= 5 && product?.stock > 0 && (
            <span className="text-xs text-warning font-medium">
              Only {product?.stock} left
            </span>
          )}
          
          {product?.stock === 0 && (
            <span className="text-xs text-error font-medium">
              Out of stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;