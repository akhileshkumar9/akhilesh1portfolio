import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WishlistSection = ({ wishlistItems, onRemoveFromWishlist, onAddToCart, onViewProduct }) => {
  const handleAddToCart = (item) => {
    onAddToCart(item);
    // Optionally remove from wishlist after adding to cart
    // onRemoveFromWishlist(item.id);
  };

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">My Wishlist</h2>
        <span className="text-sm text-muted-foreground">
          {wishlistItems?.length} item{wishlistItems?.length !== 1 ? 's' : ''}
        </span>
      </div>
      {wishlistItems?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems?.map((item) => (
            <div key={item?.id} className="border border-border rounded-lg p-4 hover:shadow-moderate transition-smooth">
              <div className="relative mb-4">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={() => onRemoveFromWishlist(item?.id)}
                  className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-subtle rounded-full hover:bg-background transition-smooth focus-ring"
                  aria-label="Remove from wishlist"
                >
                  <Icon name="X" size={16} className="text-muted-foreground" />
                </button>
                {!item?.inStock && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-subtle rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">Out of Stock</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-foreground line-clamp-2">{item?.name}</h3>
                  <p className="text-sm text-muted-foreground">{item?.brand}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-foreground">${item?.price}</span>
                    {item?.originalPrice && item?.originalPrice > item?.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${item?.originalPrice}
                      </span>
                    )}
                  </div>
                  {item?.rating && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                      <span className="text-sm text-muted-foreground">{item?.rating}</span>
                    </div>
                  )}
                </div>

                {item?.discount && (
                  <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <Icon name="Tag" size={12} className="mr-1" />
                    {item?.discount}% OFF
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    fullWidth
                    onClick={() => handleAddToCart(item)}
                    disabled={!item?.inStock}
                    iconName="ShoppingCart"
                    iconPosition="left"
                  >
                    {item?.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewProduct(item?.id)}
                    iconName="Eye"
                    iconPosition="left"
                  >
                    View
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  Added on {new Date(item.addedDate)?.toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon name="Heart" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-6">
            Save items you love to your wishlist and never lose track of them
          </p>
          <Button 
            variant="default" 
            onClick={() => window.location.href = '/homepage'}
            iconName="ShoppingBag"
            iconPosition="left"
          >
            Start Shopping
          </Button>
        </div>
      )}
      {wishlistItems?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                const inStockItems = wishlistItems?.filter(item => item?.inStock);
                inStockItems?.forEach(item => onAddToCart(item));
              }}
              disabled={!wishlistItems?.some(item => item?.inStock)}
              iconName="ShoppingCart"
              iconPosition="left"
            >
              Add All to Cart
            </Button>
            <Button
              variant="ghost"
              fullWidth
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
                  wishlistItems?.forEach(item => onRemoveFromWishlist(item?.id));
                }
              }}
              iconName="Trash2"
              iconPosition="left"
            >
              Clear Wishlist
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistSection;