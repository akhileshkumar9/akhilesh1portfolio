import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import LoginForm from './components/LoginForm';
import SocialLoginButton from './components/SocialLoginButton';
import GuestCheckoutOption from './components/GuestCheckoutOption';
import SecurityFeatures from './components/SecurityFeatures';
import Icon from '../../components/AppIcon';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);
  const [error, setError] = useState(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showRateLimit, setShowRateLimit] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock credentials for demonstration
  const mockCredentials = {
    admin: { email: 'admin@ecommercehub.com', password: 'admin123' },
    customer: { email: 'customer@example.com', password: 'customer123' },
    guest: { email: 'guest@example.com', password: 'guest123' }
  };

  const from = location?.state?.from?.pathname || '/user-account-dashboard';

  useEffect(() => {
    // Show captcha after 3 failed attempts
    if (loginAttempts >= 3) {
      setShowCaptcha(true);
    }
    // Show rate limit after 5 failed attempts
    if (loginAttempts >= 5) {
      setShowRateLimit(true);
    }
  }, [loginAttempts]);

  const handleLogin = async (formData) => {
    if (showCaptcha && !captchaVerified) {
      setError('Please complete the security verification');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      const isValidCredentials = Object.values(mockCredentials)?.some(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (isValidCredentials) {
        // Simulate successful login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData?.email);
        
        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        // Reset attempts on successful login
        setLoginAttempts(0);
        setShowRateLimit(false);
        setShowCaptcha(false);

        // Redirect to intended page or dashboard
        navigate(from, { replace: true });
      } else {
        setLoginAttempts(prev => prev + 1);
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setSocialLoading(provider);
    setError(null);

    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful social login
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      
      navigate(from, { replace: true });
    } catch (err) {
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setSocialLoading(null);
    }
  };

  const handleGuestCheckout = () => {
    navigate('/checkout', { state: { isGuest: true } });
  };

  const handleCaptchaVerify = (isVerified) => {
    setCaptchaVerified(isVerified);
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Sign In', path: '/login', icon: 'LogIn' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={false} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />
        
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="LogIn" size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue shopping
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-card rounded-lg shadow-moderate p-6 mb-6">
            <LoginForm
              onSubmit={handleLogin}
              loading={loading}
              error={error}
            />
          </div>

          {/* Security Features */}
          <div className="mb-6">
            <SecurityFeatures
              showRateLimit={showRateLimit}
              showCaptcha={showCaptcha}
              onCaptchaVerify={handleCaptchaVerify}
            />
          </div>

          {/* Social Login */}
          <div className="mb-6">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <SocialLoginButton
                provider="google"
                onClick={() => handleSocialLogin('google')}
                loading={socialLoading === 'google'}
                disabled={socialLoading !== null}
              />
              <SocialLoginButton
                provider="facebook"
                onClick={() => handleSocialLogin('facebook')}
                loading={socialLoading === 'facebook'}
                disabled={socialLoading !== null}
              />
            </div>
          </div>

          {/* Guest Checkout Option */}
          <div className="mb-6">
            <GuestCheckoutOption onGuestCheckout={handleGuestCheckout} />
          </div>

          {/* Registration Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="text-primary hover:text-primary/80 font-medium transition-smooth focus-ring rounded px-1"
              >
                Create one now
              </Link>
            </p>
          </div>

          {/* Mock Credentials Info */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-start space-x-2 mb-3">
              <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-primary mb-2">
                  Demo Credentials (for testing)
                </p>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div>
                    <strong>Admin:</strong> admin@ecommercehub.com / admin123
                  </div>
                  <div>
                    <strong>Customer:</strong> customer@example.com / customer123
                  </div>
                  <div>
                    <strong>Guest:</strong> guest@example.com / guest123
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;