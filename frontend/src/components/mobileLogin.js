import React, { useState, useEffect } from 'react';
import { User, Building2, Users, Mail, Lock, Phone, MapPin, Eye, EyeOff, ArrowLeft, X, LogIn, UserPlus, Zap } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from './AuthContext';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function OptimizedFuturisticLogin() {
  const [userType, setUserType] = useState(null);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [location, setLocation] = useState("");
  const [showInitialButtons, setShowInitialButtons] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    businessName: '',
    CompanyName: '',
    ownerName: '',
    email: '',
    password: '',
    phone: '',
    gstNumber: '',
    businessType: '',
    pincode: '',
    location: ''
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocation(`${position.coords.latitude},${position.coords.longitude}`),
        (error) => console.error("Error fetching location:", error)
      );
    }
  }, []);

  const userTypes = [
    { id: 'retailers', label: 'Retailers', icon: Building2, description: 'Access your Retailer account.' },
    { id: 'distributors', label: 'Distributors', icon: Users, description: 'Access your Distributor account.' },
    { id: 'partners', label: 'Partners', icon: User, description: 'Access your Partner account.' }
  ];

  const businessTypes = ['Retail Store', 'Wholesale', 'E-commerce', 'Manufacturing', 'Distribution', 'Service Provider', 'Other'];

  const handleInputChange = (form, field, value) => {
    if (form === 'login') {
      setLoginData(prev => ({ ...prev, [field]: value }));
    } else {
      setRegisterData(prev => ({ ...prev, [field]: value }));
    }
  };

  const isLoginFormValid = () => loginData.email.trim() !== '' && loginData.password.trim() !== '';

  const isRegisterFormValid = () => {
    const requiredFields = ['ownerName', 'email', 'password', 'phone'];
    const businessNameField = userType === 'retailers' ? 'businessName' : 'CompanyName';
    requiredFields.push(businessNameField);
    return requiredFields.every(field => registerData[field] && registerData[field].trim() !== '');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      const endpoint = userType === 'retailers' ? '/retailers/login' : '/distributors/login';
      const response = await API.post(endpoint, { email: loginData.email, password: loginData.password });
      setMessage({ type: 'success', text: 'Login successful' });
      
      if (authLogin) {
        authLogin({ user: response.data });
      }
      navigate(userType === 'retailers' ? '/layout' : '/distributor');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid credentials';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isRegisterFormValid()) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }
    
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      let endpoint, payload;
      if (userType === 'retailers') {
        endpoint = '/retailers/register';
        payload = {
          businessName: registerData.businessName,
          ownerName: registerData.ownerName,
          email: registerData.email,
          password: registerData.password,
          phone: registerData.phone,
          gstNumber: registerData.gstNumber,
          businessType: registerData.businessType,
          pincode: registerData.pincode,
          location: location || registerData.location,
        };
      } else {
        endpoint = '/distributors/register';
        payload = {
          CompanyName: registerData.CompanyName,
          ownerName: registerData.ownerName,
          email: registerData.email,
          password: registerData.password,
          phone: registerData.phone,
          gstNumber: registerData.gstNumber,
          businessType: registerData.businessType,
          pincode: registerData.pincode,
          location: location || registerData.location,
        };
      }
      
      await API.post(endpoint, payload);
      setMessage({ type: 'success', text: 'Account created successfully!' });
      setRegisterData({ businessName: '', CompanyName: '', ownerName: '', email: '', password: '', phone: '', gstNumber: '', businessType: '', pincode: '', location: '' });
      
      setTimeout(() => {
        setShowSignup(false);
        setMessage({ type: '', text: '' });
      }, 1500);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (showSignup) {
      setShowSignup(false);
    } else if (userType) {
      setUserType(null);
      setShowInitialButtons(true);
    }
    setMessage({ type: '', text: '' });
  };

  const handleClose = () => {
    setUserType(null);
    setShowSignup(false);
    setShowInitialButtons(true);
    setMessage({ type: '', text: '' });
    window.location.href = '/';
  };

  const selectedUserType = userTypes.find(type => type.id === userType);

  const getSubtitle = () => {
    if (userType && showSignup) {
      return `Create your new ${selectedUserType?.label} account.`;
    }
    if (userType && !showSignup) {
      return `Sign in to your ${selectedUserType?.label} account.`;
    }
    return 'Seamlessly connect and grow.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Optimized background - reduced complexity */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(147,197,253,0.1),transparent_50%)] pointer-events-none"></div>
      
      {/* Simplified floating elements - only 3 for better performance */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-blue-400/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-blue-300/10 rounded-full blur-md animate-pulse" style={{ animationDelay: '2s' }}></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        {/* Main container with glass effect */}
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5 rounded-3xl"></div>
          
          <div className="relative p-6 md:p-8">
            
            {/* Header with navigation */}
            <div className="flex justify-between items-center mb-6">
              <AnimatePresence>
                {(userType || !showInitialButtons) && (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    onClick={handleBack}
                    className="p-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-200 border border-blue-500/20"
                  >
                    <ArrowLeft className="w-5 h-5 text-blue-300" />
                  </motion.button>
                )}
              </AnimatePresence>
              
              <div className="flex-1"></div>
              
              <button
                onClick={handleClose}
                className="p-2 rounded-full bg-white/5 hover:bg-red-500/10 transition-all duration-200 border border-white/10 hover:border-red-500/20"
              >
                <X className="w-5 h-5 text-white hover:text-red-300 transition-colors" />
              </button>
            </div>

            {/* User Type Selection */}
            <AnimatePresence mode="wait">
              {!userType && showInitialButtons && (
                <motion.div
                  key="user-selection"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center space-y-6"
                >
                  
                  {/* Header */}
                  <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center gap-2">
                      <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                        <Zap className="w-6 h-6 text-blue-300" />
                      </div>
                      Welcome
                    </h1>
                    <p className="text-blue-100/80 text-sm md:text-base">
                      Choose your account type to continue
                    </p>
                  </div>

                  {/* User type buttons */}
                  <div className="space-y-3">
                    {userTypes.map(({ id, label, icon: Icon }, index) => (
                      <motion.button
                        key={id}
                        onClick={() => {setUserType(id); setShowInitialButtons(false);}}
                        className="w-full p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-400/30 transition-all duration-200 group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30 group-hover:bg-blue-500/30 transition-colors">
                            <Icon className="w-5 h-5 text-blue-300" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-lg font-semibold text-white">{label}</h3>
                            <p className="text-blue-100/70 text-sm">Access your {label.toLowerCase()} dashboard</p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login/Signup Forms */}
            <AnimatePresence mode="wait">
              {userType && !showInitialButtons && (
                <motion.div
                  key="forms"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  
                  {/* Form Header */}
                  <div className="text-center space-y-2">
                    <h2 className="text-xl md:text-2xl font-bold text-white flex items-center justify-center gap-2">
                      <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                        {selectedUserType && <selectedUserType.icon className="w-5 h-5 text-blue-300" />}
                      </div>
                      {selectedUserType?.label}
                    </h2>
                    <p className="text-blue-100/80 text-sm">
                      {getSubtitle()}
                    </p>
                  </div>

                  {/* Message */}
                  <AnimatePresence>
                    {message.text && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-3 rounded-xl border text-sm ${
                          message.type === 'error'
                            ? 'bg-red-500/10 border-red-500/30 text-red-300'
                            : 'bg-green-500/10 border-green-500/30 text-green-300'
                        }`}
                      >
                        {message.text}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Login Form */}
                  {!showSignup && (
                    <div className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 w-5 h-5 text-blue-300/60" />
                        <input
                          type="email"
                          placeholder="Email address"
                          value={loginData.email}
                          onChange={(e) => handleInputChange('login', 'email', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-white placeholder-blue-100/50 focus:outline-none focus:border-blue-400/50 focus:bg-blue-500/10 transition-all duration-200"
                        />
                      </div>
                      
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 w-5 h-5 text-blue-300/60" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          value={loginData.password}
                          onChange={(e) => handleInputChange('login', 'password', e.target.value)}
                          className="w-full pl-10 pr-12 py-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-white placeholder-blue-100/50 focus:outline-none focus:border-blue-400/50 focus:bg-blue-500/10 transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3.5 text-blue-300/60 hover:text-blue-300 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>

                      <button
                        onClick={handleLogin}
                        disabled={loading || !isLoginFormValid()}
                        className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-blue-500/50 disabled:to-blue-600/50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Signing in...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <LogIn className="w-5 h-5" />
                            Sign In
                          </div>
                        )}
                      </button>

                      <div className="text-center pt-2">
                        <p className="text-blue-100/70 text-sm">
                          Don't have an account?{' '}
                          <button
                            onClick={() => setShowSignup(true)}
                            className="text-blue-300 hover:text-blue-200 font-medium transition-colors"
                          >
                            Create one
                          </button>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Signup Form */}
                  {showSignup && (
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                      {userType === 'retailers' ? (
                        <input
                          type="text"
                          placeholder="Business Name"
                          value={registerData.businessName}
                          onChange={(e) => handleInputChange('register', 'businessName', e.target.value)}
                          className="w-full px-4 py-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-white placeholder-blue-100/50 focus:outline-none focus:border-blue-400/50 focus:bg-blue-500/10 transition-all duration-200"
                        />
                      ) : (
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={registerData.CompanyName}
                          onChange={(e) => handleInputChange('register', 'CompanyName', e.target.value)}
                          className="w-full px-4 py-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-white placeholder-blue-100/50 focus:outline-none focus:border-blue-400/50 focus:bg-blue-500/10 transition-all duration-200"
                        />
                      )}

                      <input
                        type="text"
                        placeholder="Owner Name"
                        value={registerData.ownerName}
                        onChange={(e) => handleInputChange('register', 'ownerName', e.target.value)}
                        className="w-full px-4 py-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-white placeholder-blue-100/50 focus:outline-none focus:border-blue-400/50 focus:bg-blue-500/10 transition-all duration-200"
                      />

                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 w-5 h-5 text-blue-300/60" />
                        <input
                          type="email"
                          placeholder="Email address"
                          value={registerData.email}
                          onChange={(e) => handleInputChange('register', 'email', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-white placeholder-blue-100/50 focus:outline-none focus:border-blue-400/50 focus:bg-blue-500/10 transition-all duration-200"
                        />
                      </div>

                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 w-5 h-5 text-blue-300/60" />
                        <input
                          type="password"
                          placeholder="Password"
                          value={registerData.password}
                          onChange={(e) => handleInputChange('register', 'password', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-white placeholder-blue-100/50 focus:outline-none focus:border-blue-400/50 focus:bg-blue-500/10 transition-all duration-200"
                        />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 w-5 h-5 text-blue-300/60" />
                        <input
                          type="tel"
                          placeholder="Phone number"
                          value={registerData.phone}
                          onChange={(e) => handleInputChange('register', 'phone', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-white placeholder-blue-100/50 focus:outline-none focus:border-blue-400/50 focus:bg-blue-500/10 transition-all duration-200"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="GST Number (Optional)"
                        value={registerData.gstNumber}
                        onChange={(e) => handleInputChange('register', 'gstNumber', e.target.value)}
                        className="w-full px-4 py-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-white placeholder-blue-100/50 focus:outline-none focus:border-blue-400/50 focus:bg-blue-500/10 transition-all duration-200"
                      />

                      <select
                        value={registerData.businessType}
                        onChange={(e) => handleInputChange('register', 'businessType', e.target.value)}
                        className="w-full px-4 py-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-white focus:outline-none focus:border-blue-400/50 focus:bg-blue-500/10 transition-all duration-200"
                      >
                        <option value="" className="bg-slate-800 text-white">Select Business Type</option>
                        {businessTypes.map((type, i) => (
                          <option key={i} value={type} className="bg-slate-800 text-white">{type}</option>
                        ))}
                      </select>

                      <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-blue-300/60" />
                        <input
                          type="text"
                          placeholder="Pincode"
                          value={registerData.pincode}
                          onChange={(e) => handleInputChange('register', 'pincode', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-white placeholder-blue-100/50 focus:outline-none focus:border-blue-400/50 focus:bg-blue-500/10 transition-all duration-200"
                        />
                      </div>

                      <button
                        onClick={handleRegister}
                        disabled={loading || !isRegisterFormValid()}
                        className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-blue-500/50 disabled:to-blue-600/50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Creating account...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <UserPlus className="w-5 h-5" />
                            Create Account
                          </div>
                        )}
                      </button>

                      <div className="text-center pt-2">
                        <p className="text-blue-100/70 text-sm">
                          Already have an account?{' '}
                          <button
                            onClick={() => setShowSignup(false)}
                            className="text-blue-300 hover:text-blue-200 font-medium transition-colors"
                          >
                            Sign in
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.3) transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(59, 130, 246, 0.1);
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
}