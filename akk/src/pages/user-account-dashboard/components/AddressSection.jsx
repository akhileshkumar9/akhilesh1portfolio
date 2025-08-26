import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AddressSection = ({ addresses, onAddAddress, onUpdateAddress, onDeleteAddress, onSetDefault }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: 'shipping',
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    isDefault: false
  });
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setFormData({
      type: 'shipping',
      firstName: '',
      lastName: '',
      company: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: '',
      isDefault: false
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData?.address1?.trim()) newErrors.address1 = 'Address is required';
    if (!formData?.city?.trim()) newErrors.city = 'City is required';
    if (!formData?.state?.trim()) newErrors.state = 'State is required';
    if (!formData?.zipCode?.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData?.country?.trim()) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      if (editingId) {
        onUpdateAddress(editingId, formData);
        setEditingId(null);
      } else {
        onAddAddress(formData);
        setIsAddingNew(false);
      }
      resetForm();
    }
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address?.id);
    setIsAddingNew(false);
  };

  const handleCancel = () => {
    resetForm();
    setIsAddingNew(false);
    setEditingId(null);
  };

  const handleAddNew = () => {
    resetForm();
    setIsAddingNew(true);
    setEditingId(null);
  };

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Addresses</h2>
        <Button
          variant="default"
          size="sm"
          onClick={handleAddNew}
          iconName="Plus"
          iconPosition="left"
          disabled={isAddingNew || editingId}
        >
          Add Address
        </Button>
      </div>
      {/* Address Form */}
      {(isAddingNew || editingId) && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-muted/50">
          <h3 className="font-medium text-foreground mb-4">
            {editingId ? 'Edit Address' : 'Add New Address'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Address Type
              </label>
              <select
                name="type"
                value={formData?.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-smooth"
              >
                <option value="shipping">Shipping Address</option>
                <option value="billing">Billing Address</option>
              </select>
            </div>

            <Input
              label="First Name"
              type="text"
              name="firstName"
              value={formData?.firstName}
              onChange={handleInputChange}
              error={errors?.firstName}
              required
            />

            <Input
              label="Last Name"
              type="text"
              name="lastName"
              value={formData?.lastName}
              onChange={handleInputChange}
              error={errors?.lastName}
              required
            />

            <div className="md:col-span-2">
              <Input
                label="Company (Optional)"
                type="text"
                name="company"
                value={formData?.company}
                onChange={handleInputChange}
              />
            </div>

            <div className="md:col-span-2">
              <Input
                label="Address Line 1"
                type="text"
                name="address1"
                value={formData?.address1}
                onChange={handleInputChange}
                error={errors?.address1}
                required
              />
            </div>

            <div className="md:col-span-2">
              <Input
                label="Address Line 2 (Optional)"
                type="text"
                name="address2"
                value={formData?.address2}
                onChange={handleInputChange}
              />
            </div>

            <Input
              label="City"
              type="text"
              name="city"
              value={formData?.city}
              onChange={handleInputChange}
              error={errors?.city}
              required
            />

            <Input
              label="State"
              type="text"
              name="state"
              value={formData?.state}
              onChange={handleInputChange}
              error={errors?.state}
              required
            />

            <Input
              label="ZIP Code"
              type="text"
              name="zipCode"
              value={formData?.zipCode}
              onChange={handleInputChange}
              error={errors?.zipCode}
              required
            />

            <Input
              label="Country"
              type="text"
              name="country"
              value={formData?.country}
              onChange={handleInputChange}
              error={errors?.country}
              required
            />

            <div className="md:col-span-2">
              <Input
                label="Phone Number (Optional)"
                type="tel"
                name="phone"
                value={formData?.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData?.isDefault}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-ring focus:ring-2"
                />
                <span className="text-sm text-foreground">Set as default address</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-2 mt-4">
            <Button variant="default" onClick={handleSave}>
              {editingId ? 'Update Address' : 'Add Address'}
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* Address List */}
      <div className="space-y-4">
        {addresses?.map((address) => (
          <div key={address?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    address?.type === 'shipping' ?'bg-blue-100 text-blue-800' :'bg-green-100 text-green-800'
                  }`}>
                    <Icon 
                      name={address?.type === 'shipping' ? 'Truck' : 'CreditCard'} 
                      size={12} 
                      className="mr-1" 
                    />
                    {address?.type === 'shipping' ? 'Shipping' : 'Billing'}
                  </span>
                  {address?.isDefault && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      <Icon name="Star" size={12} className="mr-1" />
                      Default
                    </span>
                  )}
                </div>
                
                <div className="text-sm text-foreground">
                  <div className="font-medium">
                    {address?.firstName} {address?.lastName}
                  </div>
                  {address?.company && (
                    <div className="text-muted-foreground">{address?.company}</div>
                  )}
                  <div className="text-muted-foreground">
                    {address?.address1}
                    {address?.address2 && <br />}
                    {address?.address2}
                  </div>
                  <div className="text-muted-foreground">
                    {address?.city}, {address?.state} {address?.zipCode}
                  </div>
                  <div className="text-muted-foreground">{address?.country}</div>
                  {address?.phone && (
                    <div className="text-muted-foreground">{address?.phone}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(address)}
                  iconName="Edit"
                  iconPosition="left"
                >
                  Edit
                </Button>
                {!address?.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSetDefault(address?.id)}
                    iconName="Star"
                    iconPosition="left"
                  >
                    Set Default
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteAddress(address?.id)}
                  iconName="Trash2"
                  iconPosition="left"
                  className="text-destructive hover:text-destructive"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {addresses?.length === 0 && !isAddingNew && (
        <div className="text-center py-8">
          <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No addresses saved</p>
          <Button variant="outline" onClick={handleAddNew}>
            Add Your First Address
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddressSection;