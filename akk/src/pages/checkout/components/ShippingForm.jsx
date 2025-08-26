import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ShippingForm = ({ formData, onFormChange, savedAddresses, isLoggedIn, errors }) => {
  const [useExistingAddress, setUseExistingAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState('');

  const countryOptions = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' }
  ];

  const stateOptions = [
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    { value: 'FL', label: 'Florida' }
  ];

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: '5-7 business days',
      price: 5.99,
      icon: 'Truck'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      description: '2-3 business days',
      price: 12.99,
      icon: 'Zap'
    },
    {
      id: 'overnight',
      name: 'Overnight Delivery',
      description: 'Next business day',
      price: 24.99,
      icon: 'Clock'
    }
  ];

  const handleInputChange = (field, value) => {
    onFormChange('shipping', { ...formData, [field]: value });
  };

  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
    const selectedAddress = savedAddresses?.find(addr => addr?.id === addressId);
    if (selectedAddress) {
      onFormChange('shipping', {
        ...formData,
        firstName: selectedAddress?.firstName,
        lastName: selectedAddress?.lastName,
        email: selectedAddress?.email,
        phone: selectedAddress?.phone,
        address: selectedAddress?.address,
        apartment: selectedAddress?.apartment,
        city: selectedAddress?.city,
        state: selectedAddress?.state,
        zipCode: selectedAddress?.zipCode,
        country: selectedAddress?.country
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Shipping Information</h2>
        <div className="flex items-center text-success text-sm">
          <Icon name="Shield" size={16} className="mr-1" />
          <span>Secure</span>
        </div>
      </div>
      {/* Saved Addresses */}
      {isLoggedIn && savedAddresses?.length > 0 && (
        <div className="bg-muted rounded-lg p-4">
          <Checkbox
            label="Use saved address"
            checked={useExistingAddress}
            onChange={(e) => setUseExistingAddress(e?.target?.checked)}
            className="mb-3"
          />
          
          {useExistingAddress && (
            <div className="space-y-2">
              {savedAddresses?.map((address) => (
                <label
                  key={address?.id}
                  className="flex items-start space-x-3 p-3 bg-background rounded-md border border-border cursor-pointer hover:bg-card transition-smooth"
                >
                  <input
                    type="radio"
                    name="savedAddress"
                    value={address?.id}
                    checked={selectedAddressId === address?.id}
                    onChange={() => handleAddressSelect(address?.id)}
                    className="mt-1 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {address?.firstName} {address?.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address?.address}
                      {address?.apartment && `, ${address?.apartment}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address?.city}, {address?.state} {address?.zipCode}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Address Form */}
      {(!useExistingAddress || !isLoggedIn) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
          />
          <Input
            label="Last Name"
            type="text"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
            className="md:col-span-2"
          />
          <Input
            label="Phone Number"
            type="tel"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            required
            className="md:col-span-2"
          />
          <Input
            label="Street Address"
            type="text"
            value={formData?.address}
            onChange={(e) => handleInputChange('address', e?.target?.value)}
            error={errors?.address}
            required
            className="md:col-span-2"
          />
          <Input
            label="Apartment, suite, etc. (optional)"
            type="text"
            value={formData?.apartment}
            onChange={(e) => handleInputChange('apartment', e?.target?.value)}
            className="md:col-span-2"
          />
          <Input
            label="City"
            type="text"
            value={formData?.city}
            onChange={(e) => handleInputChange('city', e?.target?.value)}
            error={errors?.city}
            required
          />
          <Select
            label="State"
            options={stateOptions}
            value={formData?.state}
            onChange={(value) => handleInputChange('state', value)}
            error={errors?.state}
            required
          />
          <Input
            label="ZIP Code"
            type="text"
            value={formData?.zipCode}
            onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
            error={errors?.zipCode}
            required
          />
          <Select
            label="Country"
            options={countryOptions}
            value={formData?.country}
            onChange={(value) => handleInputChange('country', value)}
            error={errors?.country}
            required
          />
        </div>
      )}
      {/* Delivery Options */}
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Delivery Options</h3>
        <div className="space-y-3">
          {deliveryOptions?.map((option) => (
            <label
              key={option?.id}
              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-smooth ${
                formData?.deliveryOption === option?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="deliveryOption"
                  value={option?.id}
                  checked={formData?.deliveryOption === option?.id}
                  onChange={() => handleInputChange('deliveryOption', option?.id)}
                  className="text-primary focus:ring-primary"
                />
                <Icon name={option?.icon} size={20} className="text-primary" />
                <div>
                  <p className="font-medium text-foreground">{option?.name}</p>
                  <p className="text-sm text-muted-foreground">{option?.description}</p>
                </div>
              </div>
              <span className="font-semibold text-foreground">${option?.price}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Special Instructions */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Special Instructions (Optional)
        </label>
        <textarea
          value={formData?.specialInstructions}
          onChange={(e) => handleInputChange('specialInstructions', e?.target?.value)}
          placeholder="Any special delivery instructions..."
          rows={3}
          className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-smooth resize-none"
        />
      </div>
      {/* Save Address Option */}
      {isLoggedIn && (
        <Checkbox
          label="Save this address for future orders"
          checked={formData?.saveAddress}
          onChange={(e) => handleInputChange('saveAddress', e?.target?.checked)}
        />
      )}
    </div>
  );
};

export default ShippingForm;