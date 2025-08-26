import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentForm = ({ formData, onFormChange, savedPaymentMethods, isLoggedIn, errors }) => {
  const [useExistingPayment, setUseExistingPayment] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState('');

  const paymentMethods = [
    {
      id: 'stripe',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: 'CreditCard',
      provider: 'Stripe'
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      description: 'UPI, Net Banking, Wallets',
      icon: 'Smartphone',
      provider: 'Razorpay'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: 'Wallet',
      provider: 'PayPal'
    }
  ];

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1)?.padStart(2, '0'),
    label: String(i + 1)?.padStart(2, '0')
  }));

  const currentYear = new Date()?.getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => ({
    value: String(currentYear + i),
    label: String(currentYear + i)
  }));

  const handleInputChange = (field, value) => {
    onFormChange('payment', { ...formData, [field]: value });
  };

  const handlePaymentMethodSelect = (methodId) => {
    handleInputChange('paymentMethod', methodId);
  };

  const handleSavedPaymentSelect = (paymentId) => {
    setSelectedPaymentId(paymentId);
    const selectedPayment = savedPaymentMethods?.find(pm => pm?.id === paymentId);
    if (selectedPayment) {
      onFormChange('payment', {
        ...formData,
        cardNumber: `****-****-****-${selectedPayment?.lastFour}`,
        cardholderName: selectedPayment?.cardholderName,
        expiryMonth: selectedPayment?.expiryMonth,
        expiryYear: selectedPayment?.expiryYear,
        savedPaymentId: paymentId
      });
    }
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e?.target?.value);
    handleInputChange('cardNumber', formatted);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Payment Information</h2>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-sm text-success">Secure Payment</span>
        </div>
      </div>
      {/* Payment Method Selection */}
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Choose Payment Method</h3>
        <div className="space-y-3">
          {paymentMethods?.map((method) => (
            <label
              key={method?.id}
              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-smooth ${
                formData?.paymentMethod === method?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method?.id}
                  checked={formData?.paymentMethod === method?.id}
                  onChange={() => handlePaymentMethodSelect(method?.id)}
                  className="text-primary focus:ring-primary"
                />
                <Icon name={method?.icon} size={20} className="text-primary" />
                <div>
                  <p className="font-medium text-foreground">{method?.name}</p>
                  <p className="text-sm text-muted-foreground">{method?.description}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{method?.provider}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Saved Payment Methods */}
      {isLoggedIn && savedPaymentMethods?.length > 0 && formData?.paymentMethod === 'stripe' && (
        <div className="bg-muted rounded-lg p-4">
          <Checkbox
            label="Use saved payment method"
            checked={useExistingPayment}
            onChange={(e) => setUseExistingPayment(e?.target?.checked)}
            className="mb-3"
          />
          
          {useExistingPayment && (
            <div className="space-y-2">
              {savedPaymentMethods?.map((payment) => (
                <label
                  key={payment?.id}
                  className="flex items-center justify-between p-3 bg-background rounded-md border border-border cursor-pointer hover:bg-card transition-smooth"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="savedPayment"
                      value={payment?.id}
                      checked={selectedPaymentId === payment?.id}
                      onChange={() => handleSavedPaymentSelect(payment?.id)}
                      className="text-primary focus:ring-primary"
                    />
                    <Icon name="CreditCard" size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        **** **** **** {payment?.lastFour}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {payment?.cardholderName} • Expires {payment?.expiryMonth}/{payment?.expiryYear}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground uppercase">{payment?.brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Card Details Form */}
      {formData?.paymentMethod === 'stripe' && (!useExistingPayment || !isLoggedIn) && (
        <div className="space-y-4">
          <Input
            label="Card Number"
            type="text"
            value={formData?.cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            error={errors?.cardNumber}
            required
            maxLength={19}
          />
          
          <Input
            label="Cardholder Name"
            type="text"
            value={formData?.cardholderName}
            onChange={(e) => handleInputChange('cardholderName', e?.target?.value)}
            placeholder="John Doe"
            error={errors?.cardholderName}
            required
          />
          
          <div className="grid grid-cols-3 gap-4">
            <Select
              label="Month"
              options={monthOptions}
              value={formData?.expiryMonth}
              onChange={(value) => handleInputChange('expiryMonth', value)}
              error={errors?.expiryMonth}
              required
            />
            <Select
              label="Year"
              options={yearOptions}
              value={formData?.expiryYear}
              onChange={(value) => handleInputChange('expiryYear', value)}
              error={errors?.expiryYear}
              required
            />
            <Input
              label="CVV"
              type="text"
              value={formData?.cvv}
              onChange={(e) => handleInputChange('cvv', e?.target?.value)}
              placeholder="123"
              error={errors?.cvv}
              required
              maxLength={4}
            />
          </div>
        </div>
      )}
      {/* Razorpay Options */}
      {formData?.paymentMethod === 'razorpay' && (
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Info" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Razorpay Payment Options</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            You will be redirected to Razorpay to complete your payment using UPI, Net Banking, Credit/Debit Cards, or Digital Wallets.
          </p>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <span>UPI</span>
            <span>•</span>
            <span>Net Banking</span>
            <span>•</span>
            <span>Cards</span>
            <span>•</span>
            <span>Wallets</span>
          </div>
        </div>
      )}
      {/* PayPal */}
      {formData?.paymentMethod === 'paypal' && (
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Info" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">PayPal Payment</span>
          </div>
          <p className="text-sm text-muted-foreground">
            You will be redirected to PayPal to complete your payment securely using your PayPal account or guest checkout.
          </p>
        </div>
      )}
      {/* Billing Address */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-foreground">Billing Address</h3>
          <Checkbox
            label="Same as shipping"
            checked={formData?.sameAsShipping}
            onChange={(e) => handleInputChange('sameAsShipping', e?.target?.checked)}
          />
        </div>

        {!formData?.sameAsShipping && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              value={formData?.billingFirstName}
              onChange={(e) => handleInputChange('billingFirstName', e?.target?.value)}
              error={errors?.billingFirstName}
              required
            />
            <Input
              label="Last Name"
              type="text"
              value={formData?.billingLastName}
              onChange={(e) => handleInputChange('billingLastName', e?.target?.value)}
              error={errors?.billingLastName}
              required
            />
            <Input
              label="Street Address"
              type="text"
              value={formData?.billingAddress}
              onChange={(e) => handleInputChange('billingAddress', e?.target?.value)}
              error={errors?.billingAddress}
              required
              className="md:col-span-2"
            />
            <Input
              label="City"
              type="text"
              value={formData?.billingCity}
              onChange={(e) => handleInputChange('billingCity', e?.target?.value)}
              error={errors?.billingCity}
              required
            />
            <Input
              label="ZIP Code"
              type="text"
              value={formData?.billingZipCode}
              onChange={(e) => handleInputChange('billingZipCode', e?.target?.value)}
              error={errors?.billingZipCode}
              required
            />
          </div>
        )}
      </div>
      {/* Save Payment Method */}
      {isLoggedIn && formData?.paymentMethod === 'stripe' && (
        <Checkbox
          label="Save this payment method for future orders"
          checked={formData?.savePaymentMethod}
          onChange={(e) => handleInputChange('savePaymentMethod', e?.target?.checked)}
        />
      )}
      {/* Security Information */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-sm font-semibold text-foreground">Your payment is secure</span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          We use industry-standard encryption to protect your payment information. Your card details are never stored on our servers.
        </p>
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Icon name="Lock" size={12} className="mr-1" />
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center">
            <Icon name="Shield" size={12} className="mr-1" />
            <span>PCI Compliant</span>
          </div>
          <div className="flex items-center">
            <Icon name="Check" size={12} className="mr-1" />
            <span>Verified Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;