import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email?.trim()) {
      setError('Email address is required');
      return;
    }
    if (!emailRegex?.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubscribed(false);
    setEmail('');
    setError('');
  };

  if (isSubscribed) {
    return (
      <section className="py-12 lg:py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Check" size={32} className="text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Welcome to Our Newsletter!
            </h2>
            <p className="text-lg text-white/90 mb-6">
              Thank you for subscribing! You'll receive our latest updates, exclusive deals, and product launches directly in your inbox.
            </p>
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Subscribe Another Email
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12 text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Mail" size={32} className="text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Stay in the Loop
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special offers.
            </p>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  error={error}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
              <Button
                type="submit"
                variant="default"
                loading={isSubmitting}
                disabled={isSubmitting}
                className="bg-white text-primary hover:bg-white/90 sm:px-8"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
          </form>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-white/90">
            <div className="flex items-center justify-center gap-2">
              <Icon name="Zap" size={20} />
              <span className="text-sm">Exclusive Deals</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Icon name="Bell" size={20} />
              <span className="text-sm">New Arrivals</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Icon name="Gift" size={20} />
              <span className="text-sm">Special Offers</span>
            </div>
          </div>

          {/* Privacy Note */}
          <p className="text-xs text-white/70 mt-6">
            We respect your privacy. Unsubscribe at any time. No spam, just great deals!
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;