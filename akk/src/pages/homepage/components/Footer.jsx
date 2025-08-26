import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/contact' },
      { label: 'Careers', path: '/careers' },
      { label: 'Press', path: '/press' }
    ],
    support: [
      { label: 'Help Center', path: '/help' },
      { label: 'Shipping Info', path: '/shipping' },
      { label: 'Returns', path: '/returns' },
      { label: 'Size Guide', path: '/size-guide' }
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'Accessibility', path: '/accessibility' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com' },
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com' },
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com' }
  ];

  const trustBadges = [
    {
      name: 'SSL Secure',
      icon: 'Shield',
      description: 'SSL Encrypted'
    },
    {
      name: 'Money Back',
      icon: 'RotateCcw',
      description: '30-Day Returns'
    },
    {
      name: 'Fast Shipping',
      icon: 'Truck',
      description: 'Free Shipping'
    },
    {
      name: '24/7 Support',
      icon: 'Headphones',
      description: 'Customer Support'
    }
  ];

  const handleLinkClick = (path) => {
    navigate(path);
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-foreground text-white">
      {/* Trust Badges Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges?.map((badge, index) => (
              <div key={index} className="flex items-center gap-3 text-center md:text-left">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={badge?.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">{badge?.name}</div>
                  <div className="text-xs text-white/70">{badge?.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold">EcommerceHub</span>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              Your trusted online shopping destination for quality products, exceptional service, and unbeatable prices. Shop with confidence and discover amazing deals every day.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks?.map((social) => (
                <button
                  key={social?.name}
                  onClick={() => handleSocialClick(social?.url)}
                  className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={`Follow us on ${social?.name}`}
                >
                  <Icon name={social?.icon} size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.path}>
                  <button
                    onClick={() => handleLinkClick(link?.path)}
                    className="text-white/80 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks?.support?.map((link) => (
                <li key={link?.path}>
                  <button
                    onClick={() => handleLinkClick(link?.path)}
                    className="text-white/80 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks?.legal?.map((link) => (
                <li key={link?.path}>
                  <button
                    onClick={() => handleLinkClick(link?.path)}
                    className="text-white/80 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white/70">
              © {currentYear} EcommerceHub. All rights reserved.
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/70">We accept:</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center">
                  <Icon name="CreditCard" size={14} />
                </div>
                <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center">
                  <Icon name="Smartphone" size={14} />
                </div>
                <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center">
                  <Icon name="Wallet" size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;