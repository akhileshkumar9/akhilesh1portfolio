import React from 'react';

import Icon from '../../../components/AppIcon';

const SocialLoginButton = ({ provider, onClick, disabled = false, loading = false }) => {
  const getProviderConfig = (provider) => {
    const configs = {
      google: {
        name: 'Google',
        icon: 'Chrome',
        bgColor: 'bg-white hover:bg-gray-50',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-300'
      },
      facebook: {
        name: 'Facebook',
        icon: 'Facebook',
        bgColor: 'bg-blue-600 hover:bg-blue-700',
        textColor: 'text-white',
        borderColor: 'border-blue-600'
      },
      apple: {
        name: 'Apple',
        icon: 'Apple',
        bgColor: 'bg-black hover:bg-gray-800',
        textColor: 'text-white',
        borderColor: 'border-black'
      }
    };
    return configs?.[provider] || configs?.google;
  };

  const config = getProviderConfig(provider);

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg border transition-smooth focus-ring disabled:opacity-50 disabled:cursor-not-allowed ${config?.bgColor} ${config?.textColor} ${config?.borderColor}`}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <Icon name={config?.icon} size={20} />
      )}
      <span className="font-medium">
        {loading ? 'Signing in...' : `Continue with ${config?.name}`}
      </span>
    </button>
  );
};

export default SocialLoginButton;