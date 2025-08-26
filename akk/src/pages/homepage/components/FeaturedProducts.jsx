import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Button from '../../../components/ui/Button';


const FeaturedProducts = () => {
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [cartItems, setCartItems] = useState([]);

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      category: "Electronics",
      price: 199.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 124,
      isNew: true,
      discount: 20,
      stock: 15
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      category: "Fashion",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4.5,
      reviewCount: 89,
      isNew: false,
      discount: 25,
      stock: 8
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      category: "Electronics",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 203,
      isNew: true,
      stock: 12
    },
    {
      id: 4,
      name: "Leather Crossbody Bag",
      category: "Accessories",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 67,
      isNew: false,
      discount: 25,
      stock: 3
    },
    {
      id: 5,
      name: "Ceramic Coffee Mug Set",
      category: "Home & Kitchen",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
      rating: 4.4,
      reviewCount: 156,
      isNew: false,
      stock: 25
    },
    {
      id: 6,
      name: "Wireless Charging Pad",
      category: "Electronics",
      price: 39.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
      rating: 4.3,
      reviewCount: 91,
      isNew: false,
      discount: 20,
      stock: 18
    },
    {
      id: 7,
      name: "Minimalist Desk Lamp",
      category: "Home & Office",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 45,
      isNew: true,
      stock: 7
    },
    {
      id: 8,
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 59.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      rating: 4.5,
      reviewCount: 178,
      isNew: false,
      discount: 25,
      stock: 0
    }
  ];

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev?.find(item => item?.id === product?.id);
      if (existingItem) {
        return prev?.map(item =>
          item?.id === product?.id
            ? { ...item, quantity: item?.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleToggleWishlist = (productId) => {
    setWishlistItems(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(productId)) {
        newSet?.delete(productId);
      } else {
        newSet?.add(productId);
      }
      return newSet;
    });
  };

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products, carefully chosen for quality and style
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {featuredProducts?.map((product) => (
            <ProductCard
              key={product?.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isInWishlist={wishlistItems?.has(product?.id)}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;