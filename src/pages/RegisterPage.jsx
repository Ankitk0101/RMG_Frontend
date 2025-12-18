import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, sendOtp, verifyOtp, login } = useAuth();
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [otpData, setOtpData] = useState({
    otp: ['', '', '', '', '', ''],
    hashOTP: '',
    serverOtp: '' // For development/debugging
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Timer for OTP resend
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResendOtp(true);
    }
  }, [step, timer]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOtpChange = (index, value) => {
    if (value.match(/^[0-9]?$/)) {
      const newOtp = [...otpData.otp];
      newOtp[index] = value;
      setOtpData(prev => ({ ...prev, otp: newOtp }));

      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpData.otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check if email contains @inspironlabs.com
    const isInspironEmail = formData.email.includes('@inspironlabs.com');
    
    if (!isInspironEmail) {
      setError('Registration is only available for @inspironlabs.com email addresses');
      setLoading(false);
      return;
    }

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long');
      setLoading(false);
      return;
    }

    // Send OTP
    const otpResult = await sendOtp(formData.email);
    
    if (otpResult.success) {
      // Store hashOTP for later verification
      setOtpData(prev => ({
        ...prev,
        hashOTP: otpResult.hashOTP,
        serverOtp: otpResult.otp || '' // For debugging/development
      }));
      setStep(2);
      
      // Log OTP for development (remove in production)
      if (otpResult.otp) {
        console.log('Development OTP:', otpResult.otp);
      }
    } else {
      setError(otpResult.message || 'Failed to send OTP');
    }
    
    setLoading(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const userOtp = otpData.otp.join('');
    
    if (userOtp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      setLoading(false);
      return;
    }

    // Verify OTP first
    const verifyResult = await verifyOtp(formData.email, userOtp, otpData.hashOTP);
    
    if (verifyResult.success) {
      setOtpVerified(true);
      
      // Complete registration after OTP verification
      const registerResult = await register(formData, otpData.hashOTP, userOtp);
      
      if (registerResult.success) {
        // Auto login after successful registration
        const loginResult = await login(formData.email, formData.password);
        
        if (loginResult.success) {
          navigate('/');
        } else {
          setError('Registration successful but auto-login failed. Please login manually.');
          navigate('/login');
        }
      } else {
        setError(registerResult.message || 'Registration failed');
      }
    } else {
      setError(verifyResult.message || 'Invalid OTP');
    }
    
    setLoading(false);
  };

  const handleResendOtp = async () => {
    setError('');
    setLoading(true);

    const result = await sendOtp(formData.email);
    
    if (result.success) {
      setTimer(60);
      setCanResendOtp(false);
      setOtpData(prev => ({
        otp: ['', '', '', '', '', ''],
        hashOTP: result.hashOTP,
        serverOtp: result.otp || ''
      }));
      
      // Log new OTP for development (remove in production)
      if (result.otp) {
        console.log('New Development OTP:', result.otp);
      }
    } else {
      setError(result.message || 'Failed to resend OTP');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="p-8">
          {step === 1 ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600">Join us today</p>
                <p className="text-xs text-blue-600 mt-2">
                  Only @inspironlabs.com email addresses allowed
                </p>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username *
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Choose a username (min 3 chars)"
                      required
                      minLength={3}
                      maxLength={20}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="user@inspironlabs.com"
                      required
                    />
                    {formData.email && !formData.email.includes('@inspironlabs.com') && (
                      <p className="text-red-500 text-xs mt-1">
                        Please use your @inspironlabs.com email
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Create a password (min 6 characters)"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-3 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{' '}
                      <button type="button" className="text-blue-600 hover:text-blue-800 font-medium">
                        Terms of Service
                      </button>{' '}
                      and{' '}
                      <button type="button" className="text-blue-600 hover:text-blue-800 font-medium">
                        Privacy Policy
                      </button>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !formData.email.includes('@inspironlabs.com')}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
                  >
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-blue-600 font-medium hover:text-blue-800"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify OTP</h2>
                <p className="text-gray-600">
                  Enter the 6-digit code sent to {formData.email}
                </p>
                
                {/* Development only - show OTP for testing */}
                {process.env.NODE_ENV === 'development' && otpData.serverOtp && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Development Mode:</strong> OTP is {otpData.serverOtp}
                    </p>
                  </div>
                )}
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {otpVerified && (
                <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                  OTP verified successfully! Completing registration...
                </div>
              )}

              <form onSubmit={handleOtpSubmit}>
                <div className="space-y-6">
                  <div className="flex justify-center space-x-2">
                    {otpData.otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        autoFocus={index === 0}
                        disabled={otpVerified || loading}
                      />
                    ))}
                  </div>

                  <div className="text-center">
                    <p className="text-gray-600">
                      Didn't receive the code?{' '}
                      {canResendOtp ? (
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          disabled={loading || otpVerified}
                          className="text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50"
                        >
                          Resend OTP
                        </button>
                      ) : (
                        <span className="text-gray-500">
                          Resend in {timer}s
                        </span>
                      )}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otpVerified}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? 'Processing...' : otpVerified ? 'Verified ✓' : 'Verify & Register'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setOtpData({
                        otp: ['', '', '', '', '', ''],
                        hashOTP: '',
                        serverOtp: ''
                      });
                      setError('');
                      setOtpVerified(false);
                    }}
                    className="w-full text-gray-600 hover:text-gray-800 font-medium py-3 rounded-xl border border-gray-300 hover:border-gray-400 transition-all"
                    disabled={loading}
                  >
                    Back to Registration
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;