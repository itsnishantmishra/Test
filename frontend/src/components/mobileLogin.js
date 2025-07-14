import React, { useState, useEffect } from 'react';
import { User, Building2, Users, Mail, Lock, Phone, MapPin, FileText, Eye, EyeOff, ArrowLeft, X, LogIn, UserPlus, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from './AuthContext';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function FuturisticLogin() {
  const [userType, setUserType] = useState(null);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [location, setLocation] = useState("");
  const [showInitialButtons, setShowInitialButtons] = useState(true); // Manages initial view vs forms
  const [showSignup, setShowSignup] = useState(false); // Manages login vs signup forms

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
    } else {
      console.warn("Geolocation is not supported by your browser");
    }
  }, []);

  const userTypes = [
    { id: 'retailers', label: 'Retailers', icon: Building2, color: 'from-blue-500 to-cyan-500', description: 'Access your Retailer account.' },
    { id: 'distributors', label: 'Distributors', icon: Users, color: 'from-purple-500 to-pink-500', description: 'Access your Distributor account.' },
    { id: 'partners', label: 'Partners', icon: User, color: 'from-green-500 to-emerald-500', description: 'Access your Partner account.' }
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
    e.preventDefault(); // Prevent form submission if used in a form
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const endpoint = userType === 'retailers' ? '/retailers/login' : '/distributors/login';
      const response = await API.post(endpoint, { email: loginData.email, password: loginData.password });
      setMessage({ type: 'success', text: 'Login successful' });
      console.log('Login response:', response.data);
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
    e.preventDefault(); // Prevent form submission if used in a form

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
        setShowSignup(false); // Switch to login form after successful registration
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
      setShowInitialButtons(true); // Go back to initial user type selection
    }
    setMessage({ type: '', text: '' }); // Clear any messages
  };

  const handleClose = () => {
    setUserType(null);
    setShowSignup(false);
    setShowInitialButtons(true);
    setMessage({ type: '', text: '' });
    window.location.href = '/'; // Navigate away from the login page
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))] pointer-events-none"></div>
      
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl animate-glow"></div>

        <motion.div 
          className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
          whileHover={{ scale: 1.02 }}
         transition={{ delay: 0.2, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}


        >
          {/* Header with back/close buttons */}
          <div className="flex justify-between items-center mb-8">
            <AnimatePresence>
              {(userType || !showInitialButtons) && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={handleBack}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </motion.button>
              )}
            </AnimatePresence>
            <div className="flex-1"></div>
            <motion.button
              onClick={handleClose}
              className="p-2 rounded-full bg-white/10 hover:bg-red-500/20 transition-all duration-300 group"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5 text-white group-hover:text-red-400 transition-colors" />
            </motion.button>
          </div>

          {/* User Type Selection */}
          <AnimatePresence>
            {!userType && showInitialButtons && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0, duration: 0.2, ease: [0.33, 0.2, 0.33, 2] }}

                className="text-center space-y-8"
              >
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, duration: 0.6, ease: [0.33, 0.1, 0.33, 1] }}

                >
                  <motion.h1 
                    className="text-3xl font-bold text-white flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-8 h-8 text-blue-400" />
                    </motion.div>
                    Welcome
                  </motion.h1>
                  <motion.p 
                    className="text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                   transition={{ delay: 0.2, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}

                  >
                    Choose your account type to continue
                  </motion.p>
                </motion.div>

                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                 transition={{ delay: 0.2, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}

                >
                  {userTypes.map(({ id, label, icon: Icon, color }, index) => (
                    <motion.button
                      key={id}
                      onClick={() => {setUserType(id); setShowInitialButtons(false);}}
                      className={`w-full p-6 rounded-2xl bg-gradient-to-r ${color} bg-opacity-20 border border-white/20 hover:border-white/40 transition-all duration-500 group relative overflow-hidden`}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Animated background */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                      
                      <div className="relative flex items-center gap-4">
                        <motion.div 
                          className={`p-3 rounded-xl bg-gradient-to-r ${color} bg-opacity-30`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <div className="text-left">
                          <h3 className="text-xl font-semibold text-white">{label}</h3>
                          <p className="text-gray-300 text-sm">Access your {label.toLowerCase()} dashboard</p>
                        </div>
                      </div>
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login/Signup Forms */}
          <AnimatePresence>
            {userType && !showInitialButtons && (
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <motion.div 
                  className="text-center space-y-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ }}
                >
                  <motion.h2 
                    className="text-2xl font-bold text-white flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className={`p-2 rounded-xl bg-gradient-to-r ${selectedUserType?.color} bg-opacity-30`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {selectedUserType && <selectedUserType.icon className="w-6 h-6 text-white" />}
                    </motion.div>
                    {selectedUserType?.label}
                  </motion.h2>
                  <motion.p 
                    className="text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0 }}
                  >
                    {getSubtitle()}
                  </motion.p>
                </motion.div>

                {/* Message */}
                <AnimatePresence>
                  {message.text && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className={`p-4 rounded-xl border ${
                        message.type === 'error' 
                          ? 'bg-red-500/20 border-red-500/50 text-red-300' 
                          : 'bg-green-500/20 border-green-500/50 text-green-300'
                      }`}
                    >
                      {message.text}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Login Form */}
                {!showSignup && (
                  <div className="space-y-4">
                    <div className="relative group">
                      <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={loginData.email}
                        onChange={(e) => handleInputChange('login', 'email', e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                      />
                    </div>

                    <div className="relative group">
                      <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={loginData.password}
                        onChange={(e) => handleInputChange('login', 'password', e.target.value)}
                        className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-4 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    <button
                      onClick={handleLogin}
                      disabled={loading || !isLoginFormValid()}
                      className={`w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r ${selectedUserType?.color} hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Signing in...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <LogIn className="w-5 h-5" />
                          Sign In
                        </div>
                      )}
                    </button>

                    <div className="text-center">
                      <p className="text-gray-400">
                        Don't have an account?{' '}
                        <button
                          onClick={() => setShowSignup(true)}
                          className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                        >
                          Create one
                        </button>
                      </p>
                    </div>
                  </div>
                )}

                {/* Signup Form */}
                {showSignup && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar"
                  >
                    {userType === 'retailers' ? (
                      <motion.input
                        type="text"
                        placeholder="Business Name"
                        value={registerData.businessName}
                        onChange={(e) => handleInputChange('register', 'businessName', e.target.value)}
                        className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300 focus:scale-105"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      />
                    ) : (
                      <motion.input
                        type="text"
                        placeholder="Company Name"
                        value={registerData.CompanyName}
                        onChange={(e) => handleInputChange('register', 'CompanyName', e.target.value)}
                        className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300 focus:scale-105"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      />
                    )}

                    <motion.input
                      type="text"
                      placeholder="Owner Name"
                      value={registerData.ownerName}
                      onChange={(e) => handleInputChange('register', 'ownerName', e.target.value)}
                      className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300 focus:scale-105"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    />

                    <div className="relative group">
                      <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={registerData.email}
                        onChange={(e) => handleInputChange('register', 'email', e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                      />
                    </div>

                    <div className="relative group">
                      <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      <input
                        type="password"
                        placeholder="Password"
                        value={registerData.password}
                        onChange={(e) => handleInputChange('register', 'password', e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                      />
                    </div>

                    <div className="relative group">
                      <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={registerData.phone}
                        onChange={(e) => handleInputChange('register', 'phone', e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="GST Number (Optional)"
                      value={registerData.gstNumber}
                      onChange={(e) => handleInputChange('register', 'gstNumber', e.target.value)}
                      className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                    />

                    <select
                      value={registerData.businessType}
                      onChange={(e) => handleInputChange('register', 'businessType', e.target.value)}
                      className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                    >
                      <option value="" className="bg-gray-800">Select Business Type</option>
                      {businessTypes.map((type, i) => (
                        <option key={i} value={type} className="bg-gray-800">{type}</option>
                      ))}
                    </select>

                    <div className="relative group">
                      <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      <input
                        type="text"
                        placeholder="Pincode"
                        value={registerData.pincode}
                        onChange={(e) => handleInputChange('register', 'pincode', e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                      />
                    </div>

                    <button
                      onClick={handleRegister}
                      disabled={loading || !isRegisterFormValid()}
                      className={`w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r ${selectedUserType?.color} hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Creating account...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <UserPlus className="w-5 h-5" />
                          Create Account
                        </div>
                      )}
                    </button>

                    <div className="text-center">
                      <p className="text-gray-400">
                        Already have an account?{' '}
                        <button
                          onClick={() => setShowSignup(false)}
                          className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                        >
                          Sign in
                        </button>
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}