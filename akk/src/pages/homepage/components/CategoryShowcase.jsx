import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CategoryShowcase = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Electronics",
      description: "Latest tech gadgets and devices",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      productCount: 245,
      icon: "Smartphone"
    },
    {
      id: 2,
      name: "Fashion",
      description: "Trendy clothing and accessories",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      productCount: 189,
      icon: "Shirt"
    },
    {
      id: 3,
      name: "Home & Kitchen",
      description: "Everything for your home",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      productCount: 156,
      icon: "Home"
    },
    {
      id: 4,
      name: "Sports & Fitness",
      description: "Gear up for an active lifestyle",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      productCount: 98,
      icon: "Dumbbell"
    },
    {
      id: 5,
      name: "Books & Media",
      description: "Knowledge and entertainment",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      productCount: 312,
      icon: "Book"
    },
    {
      id: 6,
      name: "Beauty & Health",
      description: "Self-care essentials",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
      productCount: 127,
      icon: "Heart"
    }
  ];

  const handleCategoryClick = (category) => {
    navigate('/product-detail', { state: { category: category?.name } });
  };

  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of products across different categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6">
          {categories?.map((category) => (
            <div
              key={category?.id}
              onClick={() => handleCategoryClick(category)}
              className="group relative bg-card rounded-xl overflow-hidden shadow-subtle hover:shadow-moderate transition-all duration-300 cursor-pointer"
            >
              {/* Background Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={category?.image}
                  alt={category?.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6">
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Icon name={category?.icon} size={18} className="text-white" />
                    </div>
                    <span className="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      {category?.productCount} items
                    </span>
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold mb-1">
                    {category?.name}
                  </h3>
                  <p className="text-sm text-white/90 mb-3">
                    {category?.description}
                  </p>
                  <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
                    <span>Shop Now</span>
                    <Icon name="ArrowRight" size={16} className="ml-1" />
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Featured Category Banner */}
        <div className="mt-12 relative bg-gradient-to-r from-primary to-primary/80 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 px-6 py-12 lg:px-12 lg:py-16 text-center text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Special Category Deals
            </h3>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Get up to 40% off on selected categories this week. Limited time offer!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/product-detail')}
                className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors duration-200"
              >
                Shop Deals
              </button>
              <button
                onClick={() => navigate('/product-detail')}
                className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors duration-200"
              >
                View All Categories
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;