import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SecurityFeatures = ({ showRateLimit = false, showCaptcha = false, onCaptchaVerify }) => {
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaChallenge, setCaptchaChallenge] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [rateLimitTime, setRateLimitTime] = useState(0);

  // Generate simple math captcha
  useEffect(() => {
    if (showCaptcha) {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const operators = ['+', '-'];
      const operator = operators?.[Math.floor(Math.random() * operators?.length)];
      
      setCaptchaChallenge(`${num1} ${operator} ${num2}`);
      setCaptchaAnswer(operator === '+' ? num1 + num2 : num1 - num2);
    }
  }, [showCaptcha]);

  // Rate limit countdown
  useEffect(() => {
    if (showRateLimit && rateLimitTime > 0) {
      const timer = setInterval(() => {
        setRateLimitTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showRateLimit, rateLimitTime]);

  // Initialize rate limit time when shown
  useEffect(() => {
    if (showRateLimit) {
      setRateLimitTime(30); // 30 seconds cooldown
    }
  }, [showRateLimit]);

  const handleCaptchaChange = (e) => {
    const value = e?.target?.value;
    setCaptchaValue(value);
    
    if (onCaptchaVerify) {
      onCaptchaVerify(parseInt(value) === captchaAnswer);
    }
  };

  const refreshCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-'];
    const operator = operators?.[Math.floor(Math.random() * operators?.length)];
    
    setCaptchaChallenge(`${num1} ${operator} ${num2}`);
    setCaptchaAnswer(operator === '+' ? num1 + num2 : num1 - num2);
    setCaptchaValue('');
    
    if (onCaptchaVerify) {
      onCaptchaVerify(false);
    }
  };

  if (!showRateLimit && !showCaptcha) {
    return null;
  }

  return (
    <div className="space-y-4">
      {showRateLimit && (
        <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={20} className="text-warning flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-warning">
                Too many login attempts
              </p>
              <p className="text-xs text-warning/80 mt-1">
                Please wait {rateLimitTime} seconds before trying again
              </p>
            </div>
          </div>
        </div>
      )}

      {showCaptcha && (
        <div className="p-4 bg-muted/50 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-foreground">
              Security Verification
            </label>
            <button
              type="button"
              onClick={refreshCaptcha}
              className="text-xs text-primary hover:text-primary/80 font-medium transition-smooth focus-ring rounded px-2 py-1"
            >
              Refresh
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex-1 flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">What is</span>
              <div className="px-3 py-2 bg-background border border-border rounded font-mono text-sm font-medium">
                {captchaChallenge}
              </div>
              <span className="text-sm text-muted-foreground">?</span>
            </div>
            
            <input
              type="number"
              value={captchaValue}
              onChange={handleCaptchaChange}
              placeholder="Answer"
              className="w-20 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-smooth"
            />
          </div>
          
          {captchaValue && parseInt(captchaValue) === captchaAnswer && (
            <div className="flex items-center space-x-2 mt-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-xs text-success font-medium">Verified</span>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Lock" size={14} />
          <span>SSL Encrypted</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} />
          <span>Secure Login</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Eye" size={14} />
          <span>Privacy Protected</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;