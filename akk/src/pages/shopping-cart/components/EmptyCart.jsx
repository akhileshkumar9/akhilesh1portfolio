import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = ({ featuredProducts = [] }) => {
  const navigate = useNavigate();

  const handleStartShopping = () => {
    navigate('/homepage');
  };

  const handleProductClick = (productId) => {
    navigate('/product-detail', { state: { productId } });
  };

  return (
    <div className="text-center py-12 sm:py-16">
      {/* Empty State Illustration */}
      <div className="mb-8">
        <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon name="ShoppingCart" size={64} className="text-muted-foreground" />
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
          Your cart is empty
        </h2>
        
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
        </p>

        <Button
          variant="default"
          size="lg"
          onClick={handleStartShopping}
          iconName="ShoppingBag"
          iconPosition="left"
        >
          Start Shopping
        </Button>
      </div>
      {/* Featured Products */}
      {featuredProducts?.length > 0 && (
        <div className="mt-12 sm:mt-16">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            You might like these
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts?.slice(0, 4)?.map((product) => (
              <div
                key={product?.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-subtle transition-smooth"
              >
                <button
                  onClick={() => handleProductClick(product?.id)}
                  className="w-full focus-ring"
                >
                  <div className="aspect-square bg-muted overflow-hidden">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-full object-cover hover:scale-105 transition-smooth"
                    />
                  </div>
                  
                  <div className="p-4 text-left">
                    <h4 className="font-medium text-foreground truncate mb-2">
                      {product?.name}
                    </h4>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        ${product?.price?.toFixed(2)}
                      </span>
                      {product?.originalPrice && product?.originalPrice > product?.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product?.originalPrice?.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {product?.rating && (
                      <div className="flex items-center gap-1 mt-2">
                        <div className="flex items-center">
                          {[...Array(5)]?.map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={12}
                              className={
                                i < Math.floor(product?.rating)
                                  ? 'text-accent fill-current' :'text-muted-foreground'
                              }
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({product?.reviewCount})
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Additional Actions */}
      <div className="mt-8 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
          <button
            onClick={() => navigate('/user-account-dashboard')}
            className="flex items-center gap-2 hover:text-foreground transition-smooth focus-ring rounded-md px-2 py-1"
          >
            <Icon name="User" size={16} />
            View Account
          </button>
          
          <div className="hidden sm:block w-px h-4 bg-border" />
          
          <button
            onClick={() => navigate('/homepage')}
            className="flex items-center gap-2 hover:text-foreground transition-smooth focus-ring rounded-md px-2 py-1"
          >
            <Icon name="Heart" size={16} />
            View Wishlist
          </button>
          
          <div className="hidden sm:block w-px h-4 bg-border" />
          
          <button
            onClick={() => navigate('/homepage')}
            className="flex items-center gap-2 hover:text-foreground transition-smooth focus-ring rounded-md px-2 py-1"
          >
            <Icon name="HelpCircle" size={16} />
            Need Help?
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;