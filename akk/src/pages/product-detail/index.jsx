import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductReviews from './components/ProductReviews';
import RelatedProducts from './components/RelatedProducts';
import StickyAddToCart from './components/StickyAddToCart';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showStickyCart, setShowStickyCart] = useState(false);

  // Mock product data - in real app this would come from API
  const mockProduct = {
    id: 1,
    name: "Premium Wireless Bluetooth Headphones",
    category: "Electronics > Audio",
    brand: "AudioTech",
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.5,
    reviewCount: 342,
    description: "Experience premium sound quality with these wireless Bluetooth headphones featuring active noise cancellation, 30-hour battery life, and superior comfort for all-day listening.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge: 15 min = 3 hours playback",
      "Premium comfort padding",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone for calls"
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Impedance": "32Ω",
      "Weight": "290g",
      "Wireless Range": "10m",
      "Charging Port": "USB-C"
    },
    careInstructions: [
      "Clean with dry cloth only",
      "Store in provided case when not in use",
      "Avoid exposure to extreme temperatures",
      "Keep away from water and moisture"
    ],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop"
    ],
    variants: {
      color: {
        label: "Color",
        options: [
          { id: "black", name: "Midnight Black", hex: "#000000", available: true },
          { id: "white", name: "Pearl White", hex: "#FFFFFF", available: true },
          { id: "blue", name: "Ocean Blue", hex: "#1E40AF", available: false }
        ]
      },
      size: {
        label: "Size",
        options: [
          { id: "regular", name: "Regular", available: true },
          { id: "large", name: "Large", available: true }
        ]
      }
    },
    stock: 15,
    estimatedDelivery: "2-3 business days",
    inStock: true,
    isNew: false,
    discount: 33
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Wireless Earbuds Pro",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.3,
      reviewCount: 128,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
      category: "Electronics",
      isNew: true,
      stock: 25
    },
    {
      id: 3,
      name: "Gaming Headset RGB",
      price: 89.99,
      rating: 4.1,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=300&h=300&fit=crop",
      category: "Electronics",
      stock: 12
    },
    {
      id: 4,
      name: "Studio Monitor Headphones",
      price: 299.99,
      rating: 4.7,
      reviewCount: 256,
      image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=300&h=300&fit=crop",
      category: "Electronics",
      stock: 8
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.4,
      reviewCount: 167,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
      category: "Electronics",
      discount: 20,
      stock: 30
    }
  ];

  useEffect(() => {
    // Simulate loading product data
    const loadProduct = async () => {
      setIsLoading(true);
      // In real app, fetch product based on ID from location.state or URL params
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProduct(mockProduct);
      
      // Set default variants
      const defaultVariants = {};
      Object.keys(mockProduct?.variants || {})?.forEach(variantType => {
        const firstAvailable = mockProduct?.variants?.[variantType]?.options?.find(option => option?.available);
        if (firstAvailable) {
          defaultVariants[variantType] = firstAvailable?.id;
        }
      });
      setSelectedVariant(defaultVariants);
      setIsLoading(false);
    };

    loadProduct();
  }, [location]);

  // Handle sticky cart visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window?.scrollY;
      const windowHeight = window?.innerHeight;
      setShowStickyCart(scrollPosition > windowHeight * 0.5);
    };

    window?.addEventListener('scroll', handleScroll);
    return () => window?.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVariantChange = (variantType, optionId) => {
    setSelectedVariant(prev => ({
      ...prev,
      [variantType]: optionId
    }));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      productId: product?.id,
      name: product?.name,
      price: product?.price,
      image: product?.images?.[0],
      variants: selectedVariant,
      quantity: quantity
    };
    
    // In real app, this would dispatch to cart state/context
    console.log('Adding to cart:', cartItem);
    
    // Show success message or navigate to cart
    // For now, just navigate to cart
    navigate('/shopping-cart');
  };

  const handleAddToWishlist = () => {
    // In real app, this would dispatch to wishlist state/context
    console.log('Adding to wishlist:', product?.id);
  };

  const handleCartClick = () => {
    navigate('/shopping-cart');
  };

  const handleAuthClick = () => {
    navigate('/login');
  };

  const handleSearchSubmit = (searchQuery) => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Electronics', path: '/categories/electronics' },
    { label: 'Audio', path: '/categories/electronics/audio' },
    { label: product?.name || 'Product' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          onCartClick={handleCartClick}
          onAuthClick={handleAuthClick}
          onSearchSubmit={handleSearchSubmit}
        />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          onCartClick={handleCartClick}
          onAuthClick={handleAuthClick}
          onSearchSubmit={handleSearchSubmit}
        />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Product Not Found</h2>
            <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/homepage')}
              className="text-primary hover:underline"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onCartClick={handleCartClick}
        onAuthClick={handleAuthClick}
        onSearchSubmit={handleSearchSubmit}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* Product Content */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Product Images - Mobile: Full width, Desktop: 60% */}
          <div className="lg:col-span-7 mb-8 lg:mb-0">
            <ProductImageGallery images={product?.images} productName={product?.name} />
          </div>

          {/* Product Info - Mobile: Full width, Desktop: 40% */}
          <div className="lg:col-span-5">
            <ProductInfo
              product={product}
              selectedVariant={selectedVariant}
              quantity={quantity}
              onVariantChange={handleVariantChange}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          </div>
        </div>

        {/* Product Reviews */}
        <div className="mt-16">
          <ProductReviews productId={product?.id} rating={product?.rating} reviewCount={product?.reviewCount} />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts products={relatedProducts} onAddToCart={handleAddToCart} />
        </div>
      </main>

      {/* Sticky Add to Cart - Mobile Only */}
      {showStickyCart && (
        <StickyAddToCart
          product={product}
          selectedVariant={selectedVariant}
          quantity={quantity}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default ProductDetail;