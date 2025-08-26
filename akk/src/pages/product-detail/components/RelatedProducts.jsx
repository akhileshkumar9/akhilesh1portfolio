import React, { useRef } from 'react';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const RelatedProducts = ({ products = [], onAddToCart }) => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={`${
          i < Math.floor(rating)
            ? 'text-accent fill-current' :'text-muted-foreground'
        }`}
      />
    ));
  };

  const scrollLeft = () => {
    if (scrollContainerRef?.current) {
      scrollContainerRef?.current?.scrollBy({
        left: -280,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef?.current) {
      scrollContainerRef?.current?.scrollBy({
        left: 280,
        behavior: 'smooth'
      });
    }
  };

  const handleProductClick = (product) => {
    navigate('/product-detail', { state: { productId: product?.id } });
  };

  const handleAddToCart = (e, product) => {
    e?.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  if (!products?.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          You Might Also Like
        </h2>
        
        {/* Desktop Navigation Arrows */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={scrollLeft}
            className="p-2 bg-background border border-border rounded-full hover:bg-muted transition-colors"
            aria-label="Scroll left"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 bg-background border border-border rounded-full hover:bg-muted transition-colors"
            aria-label="Scroll right"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </div>

      {/* Products Carousel */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products?.map((product) => (
            <div
              key={product?.id}
              className="flex-shrink-0 w-64 group cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="bg-card rounded-lg border border-border overflow-hidden shadow-subtle hover:shadow-moderate transition-all duration-300">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
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

                  {/* Quick Add to Cart */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      onClick={(e) => handleAddToCart(e, product)}
                      variant="default"
                      size="sm"
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
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="font-medium text-foreground line-clamp-2 mb-1 text-sm">
                      {product?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {product?.category}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      {renderStars(product?.rating)}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product?.reviewCount})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground text-sm">
                        {formatPrice(product?.price)}
                      </span>
                      {product?.originalPrice && product?.originalPrice > product?.price && (
                        <span className="text-xs text-muted-foreground line-through">
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
            </div>
          ))}
        </div>

        {/* Scroll Indicators for Mobile */}
        <div className="flex justify-center mt-4 gap-1 md:hidden">
          {products?.slice(0, Math.ceil(products?.length / 2))?.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 bg-muted-foreground rounded-full opacity-30"
            />
          ))}
        </div>
      </div>

      {/* View All Link */}
      <div className="text-center pt-4">
        <Button
          variant="outline"
          onClick={() => navigate('/categories/electronics')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All Similar Products
        </Button>
      </div>
    </div>
  );
};

export default RelatedProducts;