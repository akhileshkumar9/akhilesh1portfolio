import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ items = [], className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-generate breadcrumbs if no items provided
  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/homepage', icon: 'Home' }];

    const pathMap = {
      'homepage': { label: 'Home', icon: 'Home' },
      'product-detail': { label: 'Product', icon: 'Package' },
      'shopping-cart': { label: 'Cart', icon: 'ShoppingCart' },
      'checkout': { label: 'Checkout', icon: 'CreditCard' },
      'user-account-dashboard': { label: 'Account', icon: 'User' },
      'login': { label: 'Sign In', icon: 'LogIn' },
      'categories': { label: 'Categories', icon: 'Grid3X3' },
      'deals': { label: 'Deals', icon: 'Tag' },
      'new-arrivals': { label: 'New Arrivals', icon: 'Sparkles' }
    };

    pathSegments?.forEach((segment, index) => {
      const path = '/' + pathSegments?.slice(0, index + 1)?.join('/');
      const config = pathMap?.[segment];
      
      if (config && path !== '/homepage') {
        breadcrumbs?.push({
          label: config?.label,
          path: path,
          icon: config?.icon
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items?.length > 0 ? items : generateBreadcrumbs();

  const handleClick = (path, isLast) => {
    if (!isLast && path) {
      navigate(path);
    }
  };

  if (breadcrumbItems?.length <= 1) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center space-x-1 text-sm ${className}`}
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbItems?.map((item, index) => {
          const isLast = index === breadcrumbItems?.length - 1;
          const isClickable = !isLast && item?.path;

          return (
            <li key={`${item?.path}-${index}`} className="flex items-center">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-muted-foreground mx-1" 
                />
              )}
              {isClickable ? (
                <button
                  onClick={() => handleClick(item?.path, isLast)}
                  className="flex items-center space-x-1 px-2 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth focus-ring"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item?.icon && index === 0 && (
                    <Icon name={item?.icon} size={14} />
                  )}
                  <span className="truncate max-w-[120px] sm:max-w-none">
                    {item?.label}
                  </span>
                </button>
              ) : (
                <span 
                  className={`flex items-center space-x-1 px-2 py-1 truncate max-w-[120px] sm:max-w-none ${
                    isLast 
                      ? 'text-foreground font-medium' 
                      : 'text-muted-foreground'
                  }`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item?.icon && index === 0 && (
                    <Icon name={item?.icon} size={14} />
                  )}
                  <span>{item?.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;