import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProductInfo = ({
  product,
  selectedVariant = {},
  quantity = 1,
  onVariantChange,
  onQuantityChange,
  onAddToCart,
  onAddToWishlist
}) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const calculateDiscount = () => {
    if (product?.originalPrice && product?.price) {
      return Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100);
    }
    return 0;
  };

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={`${
          i < Math.floor(rating)
            ? 'text-accent fill-current' :'text-muted-foreground'
        }`}
      />
    ));
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      onQuantityChange?.(quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    if (quantity < (product?.stock || 1)) {
      onQuantityChange?.(quantity + 1);
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.();
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate?.setDate(today?.getDate() + 3); // Add 3 days
    
    return deliveryDate?.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const selectedVariantNames = Object.entries(selectedVariant)?.map(([type, value]) => {
    const variant = product?.variants?.[type];
    const option = variant?.options?.find(opt => opt?.id === value);
    return option?.name || value;
  })?.join(', ');

  return (
    <div className="space-y-6">
      {/* Product Title and Brand */}
      <div>
        <p className="text-sm text-muted-foreground mb-1">{product?.brand}</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
          {product?.name}
        </h1>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {renderStars(product?.rating)}
          <span className="text-sm font-medium text-foreground ml-1">
            {product?.rating}
          </span>
        </div>
        <span className="text-sm text-muted-foreground">
          ({product?.reviewCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-foreground">
            {formatPrice(product?.price)}
          </span>
          {product?.originalPrice && product?.originalPrice > product?.price && (
            <>
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product?.originalPrice)}
              </span>
              <span className="bg-error text-error-foreground text-sm font-medium px-2 py-1 rounded">
                {calculateDiscount()}% OFF
              </span>
            </>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Free shipping on orders over $99
        </p>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${product?.inStock ? 'bg-success' : 'bg-error'}`} />
        <span className={`text-sm font-medium ${product?.inStock ? 'text-success' : 'text-error'}`}>
          {product?.inStock ? `In Stock (${product?.stock} available)` : 'Out of Stock'}
        </span>
      </div>

      {/* Product Description */}
      <div className="prose prose-sm max-w-none">
        <p className="text-muted-foreground leading-relaxed">
          {product?.description}
        </p>
      </div>

      {/* Variants Selection */}
      {product?.variants && Object.keys(product?.variants)?.length > 0 && (
        <div className="space-y-4">
          {Object.entries(product?.variants)?.map(([variantType, variantData]) => (
            <div key={variantType}>
              <label className="block text-sm font-medium text-foreground mb-2">
                {variantData?.label}: {
                  variantData?.options?.find(opt => opt?.id === selectedVariant?.[variantType])?.name
                }
              </label>
              <div className="flex flex-wrap gap-2">
                {variantData?.options?.map((option) => (
                  <button
                    key={option?.id}
                    onClick={() => onVariantChange?.(variantType, option?.id)}
                    disabled={!option?.available}
                    className={`px-4 py-2 rounded-md border text-sm font-medium transition-all duration-200 ${
                      selectedVariant?.[variantType] === option?.id
                        ? 'border-primary bg-primary text-primary-foreground'
                        : option?.available
                        ? 'border-border bg-background text-foreground hover:border-primary'
                        : 'border-border bg-muted text-muted-foreground cursor-not-allowed'
                    } ${variantType === 'color' ? 'flex items-center gap-2' : ''}`}
                  >
                    {variantType === 'color' && option?.hex && (
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: option?.hex }}
                      />
                    )}
                    {option?.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={handleQuantityDecrease}
              disabled={quantity <= 1}
              className="p-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Minus" size={16} />
            </button>
            <span className="px-4 py-2 min-w-[60px] text-center font-medium">
              {quantity}
            </span>
            <button
              onClick={handleQuantityIncrease}
              disabled={quantity >= (product?.stock || 1)}
              className="p-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
          <span className="text-sm text-muted-foreground">
            {product?.stock} available
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={onAddToCart}
          disabled={!product?.inStock}
          size="lg"
          fullWidth
          iconName="ShoppingCart"
          className="h-12 text-base font-semibold"
        >
          Add to Cart
        </Button>
        
        <Button
          onClick={handleWishlistToggle}
          variant="outline"
          size="lg"
          fullWidth
          iconName="Heart"
          className={`h-12 ${isWishlisted ? 'text-error border-error' : ''}`}
        >
          {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </Button>
      </div>

      {/* Delivery Information */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Icon name="Truck" size={20} className="text-primary" />
          <div>
            <p className="font-medium text-foreground">Estimated Delivery</p>
            <p className="text-sm text-muted-foreground">
              {getEstimatedDelivery()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Icon name="RotateCcw" size={20} className="text-primary" />
          <div>
            <p className="font-medium text-foreground">Free Returns</p>
            <p className="text-sm text-muted-foreground">
              30-day return window
            </p>
          </div>
        </div>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-2">
        {/* Features */}
        <div className="border border-border rounded-lg">
          <button
            onClick={() => toggleSection('features')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
          >
            <span className="font-medium text-foreground">Features</span>
            <Icon
              name={expandedSection === 'features' ? 'ChevronUp' : 'ChevronDown'}
              size={20}
            />
          </button>
          {expandedSection === 'features' && (
            <div className="px-4 pb-4">
              <ul className="space-y-2">
                {product?.features?.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Check" size={16} className="text-success" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Specifications */}
        <div className="border border-border rounded-lg">
          <button
            onClick={() => toggleSection('specifications')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
          >
            <span className="font-medium text-foreground">Specifications</span>
            <Icon
              name={expandedSection === 'specifications' ? 'ChevronUp' : 'ChevronDown'}
              size={20}
            />
          </button>
          {expandedSection === 'specifications' && (
            <div className="px-4 pb-4">
              <div className="space-y-2">
                {Object.entries(product?.specifications || {})?.map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{key}:</span>
                    <span className="text-foreground font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Care Instructions */}
        <div className="border border-border rounded-lg">
          <button
            onClick={() => toggleSection('care')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
          >
            <span className="font-medium text-foreground">Care Instructions</span>
            <Icon
              name={expandedSection === 'care' ? 'ChevronUp' : 'ChevronDown'}
              size={20}
            />
          </button>
          {expandedSection === 'care' && (
            <div className="px-4 pb-4">
              <ul className="space-y-2">
                {product?.careInstructions?.map((instruction, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Info" size={16} className="text-primary" />
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Social Sharing */}
      <div className="pt-4 border-t border-border">
        <p className="text-sm font-medium text-foreground mb-3">Share this product</p>
        <div className="flex items-center gap-3">
          <button className="p-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#1877F2]/90 transition-colors">
            <Icon name="Facebook" size={16} />
          </button>
          <button className="p-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1DA1F2]/90 transition-colors">
            <Icon name="Twitter" size={16} />
          </button>
          <button className="p-2 bg-[#25D366] text-white rounded-lg hover:bg-[#25D366]/90 transition-colors">
            <Icon name="MessageCircle" size={16} />
          </button>
          <button className="p-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors">
            <Icon name="Share" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;