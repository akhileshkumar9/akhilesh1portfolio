import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  const navigate = useNavigate();

  const heroSlides = [
    {
      id: 1,
      title: "Summer Collection 2024",
      subtitle: "Discover the latest trends",
      description: "Shop our curated selection of premium fashion items with up to 50% off selected styles",
      ctaText: "Shop Now",
      ctaAction: () => navigate('/product-detail'),
      backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
      mobileImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop"
    },
    {
      id: 2,
      title: "Tech Essentials",
      subtitle: "Power up your lifestyle",
      description: "From smartphones to smart home devices, find everything you need for a connected life",
      ctaText: "Explore Tech",
      ctaAction: () => navigate('/product-detail'),
      backgroundImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop",
      mobileImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=500&fit=crop"
    }
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides?.length]);

  const currentHero = heroSlides?.[currentSlide];

  return (
    <section className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden bg-muted">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={window.innerWidth >= 640 ? currentHero?.backgroundImage : currentHero?.mobileImage}
          alt={currentHero?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {currentHero?.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-2">
              {currentHero?.subtitle}
            </p>
            <p className="text-sm sm:text-base text-white/80 mb-8 max-w-lg">
              {currentHero?.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={currentHero?.ctaAction}
                className="bg-white text-black hover:bg-white/90"
              >
                {currentHero?.ctaText}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/product-detail')}
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;