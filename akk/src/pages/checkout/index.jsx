import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import StepIndicator from './components/StepIndicator';
import OrderSummary from './components/OrderSummary';
import ShippingForm from './components/ShippingForm';
import PaymentForm from './components/PaymentForm';
import GuestCheckoutPrompt from './components/GuestCheckoutPrompt';
import OrderConfirmation from './components/OrderConfirmation';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mock user authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showGuestPrompt, setShowGuestPrompt] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Mock cart items from location state or default
  const cartItems = location?.state?.cartItems || [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      variant: "Black, Large",
      price: 199.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      variant: "Silver, 42mm",
      price: 299.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
    }
  ];

  // Mock saved addresses for logged-in users
  const savedAddresses = [
    {
      id: 'addr1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main Street',
      apartment: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US'
    }
  ];

  // Mock saved payment methods for logged-in users
  const savedPaymentMethods = [
    {
      id: 'pm1',
      cardholderName: 'John Doe',
      lastFour: '4242',
      brand: 'Visa',
      expiryMonth: '12',
      expiryYear: '2027'
    }
  ];

  // Form data state
  const [formData, setFormData] = useState({
    shipping: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US',
      deliveryOption: 'standard',
      specialInstructions: '',
      saveAddress: false
    },
    payment: {
      paymentMethod: 'stripe',
      cardNumber: '',
      cardholderName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      sameAsShipping: true,
      billingFirstName: '',
      billingLastName: '',
      billingAddress: '',
      billingCity: '',
      billingZipCode: '',
      savePaymentMethod: false,
      savedPaymentId: ''
    }
  });

  // Form errors state
  const [errors, setErrors] = useState({});

  // Checkout steps configuration
  const steps = [
    {
      id: 1,
      title: 'Shipping',
      description: 'Address & delivery'
    },
    {
      id: 2,
      title: 'Payment',
      description: 'Payment method'
    },
    {
      id: 3,
      title: 'Review',
      description: 'Confirm order'
    }
  ];

  // Calculate order totals
  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const deliveryPrice = formData?.shipping?.deliveryOption === 'standard' ? 5.99 : 
                       formData?.shipping?.deliveryOption === 'express' ? 12.99 : 24.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryPrice + tax - promoDiscount;

  // Handle form data changes
  const handleFormChange = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
    // Clear errors for the changed section
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(data)?.forEach(key => {
        delete newErrors?.[key];
      });
      return newErrors;
    });
  };

  // Validate form data
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      const { shipping } = formData;
      if (!shipping?.firstName?.trim()) newErrors.firstName = 'First name is required';
      if (!shipping?.lastName?.trim()) newErrors.lastName = 'Last name is required';
      if (!shipping?.email?.trim()) newErrors.email = 'Email is required';
      if (!shipping?.phone?.trim()) newErrors.phone = 'Phone number is required';
      if (!shipping?.address?.trim()) newErrors.address = 'Address is required';
      if (!shipping?.city?.trim()) newErrors.city = 'City is required';
      if (!shipping?.state) newErrors.state = 'State is required';
      if (!shipping?.zipCode?.trim()) newErrors.zipCode = 'ZIP code is required';
      if (!shipping?.country) newErrors.country = 'Country is required';
    }

    if (step === 2) {
      const { payment } = formData;
      if (payment?.paymentMethod === 'stripe' && !payment?.savedPaymentId) {
        if (!payment?.cardNumber?.trim()) newErrors.cardNumber = 'Card number is required';
        if (!payment?.cardholderName?.trim()) newErrors.cardholderName = 'Cardholder name is required';
        if (!payment?.expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
        if (!payment?.expiryYear) newErrors.expiryYear = 'Expiry year is required';
        if (!payment?.cvv?.trim()) newErrors.cvv = 'CVV is required';
      }

      if (!payment?.sameAsShipping) {
        if (!payment?.billingFirstName?.trim()) newErrors.billingFirstName = 'Billing first name is required';
        if (!payment?.billingLastName?.trim()) newErrors.billingLastName = 'Billing last name is required';
        if (!payment?.billingAddress?.trim()) newErrors.billingAddress = 'Billing address is required';
        if (!payment?.billingCity?.trim()) newErrors.billingCity = 'Billing city is required';
        if (!payment?.billingZipCode?.trim()) newErrors.billingZipCode = 'Billing ZIP code is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  // Handle step navigation
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps?.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle guest checkout
  const handleContinueAsGuest = () => {
    setShowGuestPrompt(false);
    setIsLoggedIn(false);
  };

  const handleCreateAccount = () => {
    navigate('/login', { 
      state: { 
        returnTo: '/checkout',
        cartItems: cartItems 
      }
    });
  };

  // Handle promo code
  const handleApplyPromo = () => {
    // Mock promo code validation
    const validPromoCodes = {
      'SAVE10': 10,
      'WELCOME20': 20,
      'FIRST15': 15
    };

    if (validPromoCodes?.[promoCode?.toUpperCase()]) {
      setPromoDiscount(validPromoCodes?.[promoCode?.toUpperCase()]);
    } else {
      setPromoDiscount(0);
      // Could show error message here
    }
  };

  // Handle order placement
  const handlePlaceOrder = async () => {
    if (!validateStep(2)) return;

    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderCompleted(true);
    }, 3000);
  };

  // Mock order data for confirmation
  const orderData = {
    orderNumber: 'ORD-' + Date.now()?.toString()?.slice(-6),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    items: cartItems,
    total: total,
    shippingAddress: formData?.shipping,
    paymentMethod: {
      type: formData?.payment?.paymentMethod === 'stripe' ? 'card' : formData?.payment?.paymentMethod,
      lastFour: formData?.payment?.cardNumber?.slice(-4) || '4242'
    }
  };

  // Handle order confirmation actions
  const handleContinueShopping = () => {
    navigate('/homepage');
  };

  const handleViewOrder = () => {
    navigate('/user-account-dashboard', { 
      state: { 
        activeTab: 'orders',
        orderId: orderData?.orderNumber 
      }
    });
  };

  // Redirect if no cart items
  useEffect(() => {
    if (!cartItems || cartItems?.length === 0) {
      navigate('/shopping-cart');
    }
  }, [cartItems, navigate]);

  // Show order confirmation if completed
  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          isAuthenticated={isLoggedIn}
          cartItemCount={0}
          onCartClick={() => navigate('/shopping-cart')}
          onAuthClick={() => navigate(isLoggedIn ? '/user-account-dashboard' : '/login')}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <OrderConfirmation
            orderData={orderData}
            onContinueShopping={handleContinueShopping}
            onViewOrder={handleViewOrder}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={isLoggedIn}
        cartItemCount={cartItems?.length}
        onCartClick={() => navigate('/shopping-cart')}
        onAuthClick={() => navigate(isLoggedIn ? '/user-account-dashboard' : '/login')}
        onSearchSubmit={() => {}}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6" />

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground">
            Complete your purchase securely and safely
          </p>
        </div>

        {/* Guest Checkout Prompt */}
        {!isLoggedIn && showGuestPrompt && (
          <GuestCheckoutPrompt
            onContinueAsGuest={handleContinueAsGuest}
            onCreateAccount={handleCreateAccount}
            isVisible={showGuestPrompt}
          />
        )}

        {/* Main Checkout Content */}
        {(!showGuestPrompt || isLoggedIn) && (
          <>
            {/* Step Indicator */}
            <StepIndicator currentStep={currentStep} steps={steps} />

            {/* Checkout Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
                  {/* Shipping Step */}
                  {currentStep === 1 && (
                    <ShippingForm
                      formData={formData?.shipping}
                      onFormChange={handleFormChange}
                      savedAddresses={isLoggedIn ? savedAddresses : []}
                      isLoggedIn={isLoggedIn}
                      errors={errors}
                    />
                  )}

                  {/* Payment Step */}
                  {currentStep === 2 && (
                    <PaymentForm
                      formData={formData?.payment}
                      onFormChange={handleFormChange}
                      savedPaymentMethods={isLoggedIn ? savedPaymentMethods : []}
                      isLoggedIn={isLoggedIn}
                      errors={errors}
                    />
                  )}

                  {/* Review Step */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-foreground">Review Your Order</h2>
                      
                      {/* Shipping Summary */}
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-foreground">Shipping Address</h3>
                          <button
                            onClick={() => setCurrentStep(1)}
                            className="text-primary hover:underline text-sm"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>{formData?.shipping?.firstName} {formData?.shipping?.lastName}</p>
                          <p>{formData?.shipping?.address}</p>
                          {formData?.shipping?.apartment && <p>{formData?.shipping?.apartment}</p>}
                          <p>{formData?.shipping?.city}, {formData?.shipping?.state} {formData?.shipping?.zipCode}</p>
                        </div>
                      </div>

                      {/* Payment Summary */}
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-foreground">Payment Method</h3>
                          <button
                            onClick={() => setCurrentStep(2)}
                            className="text-primary hover:underline text-sm"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Icon name="CreditCard" size={16} />
                          <span>
                            {formData?.payment?.paymentMethod === 'stripe' 
                              ? `**** **** **** ${formData?.payment?.cardNumber?.slice(-4) || '****'}`
                              : formData?.payment?.paymentMethod === 'razorpay' ? 'Razorpay Payment' : 'PayPal'
                            }
                          </span>
                        </div>
                      </div>

                      {/* Terms and Conditions */}
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-muted-foreground">
                            <p className="mb-2">
                              By placing this order, you agree to our{' '}
                              <button className="text-primary hover:underline">Terms of Service</button>
                              {' '}and{' '}
                              <button className="text-primary hover:underline">Privacy Policy</button>.
                            </p>
                            <p>
                              Your payment information is secure and encrypted. We never store your full card details.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={currentStep === 1 ? () => navigate('/shopping-cart') : handlePreviousStep}
                      iconName={currentStep === 1 ? 'ArrowLeft' : 'ChevronLeft'}
                      iconPosition="left"
                    >
                      {currentStep === 1 ? 'Back to Cart' : 'Previous'}
                    </Button>

                    {currentStep < 3 ? (
                      <Button
                        variant="default"
                        onClick={handleNextStep}
                        iconName="ChevronRight"
                        iconPosition="right"
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        onClick={handlePlaceOrder}
                        loading={isProcessing}
                        iconName="CreditCard"
                        iconPosition="left"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : `Place Order • $${total?.toFixed(2)}`}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <OrderSummary
                    items={cartItems}
                    subtotal={subtotal}
                    shipping={deliveryPrice}
                    tax={tax}
                    total={total}
                    promoCode={promoCode}
                    onPromoCodeChange={setPromoCode}
                    onApplyPromo={handleApplyPromo}
                    promoDiscount={promoDiscount}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default CheckoutPage;