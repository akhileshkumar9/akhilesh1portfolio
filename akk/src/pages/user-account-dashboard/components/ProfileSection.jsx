import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ProfileSection = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (formData?.phone && !/^\+?[\d\s\-\(\)]+$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdateProfile(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
      gender: user?.gender || ''
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Profile Information</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              Save
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          value={formData?.firstName}
          onChange={handleInputChange}
          error={errors?.firstName}
          disabled={!isEditing}
          required
        />

        <Input
          label="Last Name"
          type="text"
          name="lastName"
          value={formData?.lastName}
          onChange={handleInputChange}
          error={errors?.lastName}
          disabled={!isEditing}
          required
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          disabled={!isEditing}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData?.phone}
          onChange={handleInputChange}
          error={errors?.phone}
          disabled={!isEditing}
          placeholder="+1 (555) 123-4567"
        />

        <Input
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={formData?.dateOfBirth}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Gender
          </label>
          <select
            name="gender"
            value={formData?.gender}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="font-medium text-foreground mb-4">Account Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <Icon name="Calendar" size={24} className="text-primary mx-auto mb-2" />
            <div className="text-sm font-medium text-foreground">Member Since</div>
            <div className="text-xs text-muted-foreground">
              {new Date(user.memberSince)?.toLocaleDateString()}
            </div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <Icon name="Package" size={24} className="text-primary mx-auto mb-2" />
            <div className="text-sm font-medium text-foreground">Total Orders</div>
            <div className="text-xs text-muted-foreground">{user?.totalOrders}</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <Icon name="Star" size={24} className="text-primary mx-auto mb-2" />
            <div className="text-sm font-medium text-foreground">Loyalty Points</div>
            <div className="text-xs text-muted-foreground">{user?.loyaltyPoints}</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <Icon name="DollarSign" size={24} className="text-primary mx-auto mb-2" />
            <div className="text-sm font-medium text-foreground">Total Spent</div>
            <div className="text-xs text-muted-foreground">${user?.totalSpent}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;