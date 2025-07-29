import React, { useState, useEffect } from 'react';
import { User, Building2, Users, Mail, Lock, Phone, MapPin, FileText, Eye, EyeOff, ArrowLeft, X, LogIn, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from './AuthContext'; // Assuming this path is correct
import API from '../api'; // Assuming this path is correct
import { useNavigate } from 'react-router-dom'; // Assuming this path is correct
import { GoogleLogin } from '@react-oauth/google';
import GoogleAuthButton from "../components/googleLogin";
import {
  Store,
  Truck,
  Factory,
  Sparkles,
  Shield
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState(null); // Will be 'login' or 'register'
  const [userType, setUserType] = useState(null); // Will be 'retailers', 'distributors', or 'partners'
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [location, setLocation] = useState("");
  const [showInitialButtons, setShowInitialButtons] = useState(true); // Controls the initial selection screen vs forms/welcome

  const mainContainerVariants = {
    initial: { opacity: 0, scale: 0.9, rotateY: 10, y: 50 },
    enter: { opacity: 1, scale: 1, rotateY: 0, y: 0, transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, scale: 0.8, rotateY: -10, y: -50, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
  };

  const handleGoBackToInitial = () => {
    setShowInitialButtons(true);
    setActiveTab(null);
    setUserType(null);
    setMessage({ type: '', text: '' });
    // Reset form data when going back to initial screen
    setLoginData({ email: '', password: '' });
    setRegisterData({
      businessName: '', CompanyName: '', ownerName: '', email: '',
      password: '', phone: '', gstNumber: '', businessType: '',
      pincode: '', location: ''
    });
  };

  const handleGoBackToUserTypeSelection = () => {
    setUserType(null);
    setActiveTab(null); // Reset activeTab when going back to user type selection
    setMessage({ type: '', text: '' });
    // Reset form data when going back to user type selection
    setLoginData({ email: '', password: '' });
    setRegisterData({
      businessName: '', CompanyName: '', ownerName: '', email: '',
      password: '', phone: '', gstNumber: '', businessType: '',
      pincode: '', location: ''
    });
  };

  const handleCloseLogin = () => {
    // This is typically handled by routing in a real app, e.g., navigate('/');
    console.log("Close login modal/component - Redirecting to home.");
    navigate('/');
  };

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

  // Updated userTypes with gradient properties for styling consistency
  const userTypes = [
    { id: 'retailers', label: 'Retailer', icon: Store, description: 'Access wholesale pricing and manage orders.', gradient: 'from-blue-500 to-indigo-600' },
    { id: 'distributors', label: 'Distributor', icon: Truck, description: 'Manage your network and track sales.', gradient: 'from-green-500 to-teal-600' },
    { id: 'partners', label: 'Partner', icon: Shield, description: 'Collaborate and grow your business.', gradient: 'from-purple-500 to-pink-600' }
  ];


  const businessTypes = ['Retail Store', 'Wholesale', 'E-commerce', 'Manufacturing', 'Distribution', 'Service Provider', 'Other'];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Adjusted endpoint logic as per your provided backend paths
      let endpoint;
      if (userType === 'retailers') {
        endpoint = '/retailers/login';
      } else if (userType === 'distributors' || userType === 'partners') { // Assuming distributors and partners use the same login endpoint or need specific handling
        endpoint = '/distributors/login'; // Or specific /partners/login if applicable
      } else {
        throw new Error("Invalid user type for login.");
      }

      const response = await API.post(endpoint, {
        email: loginData.email,
        password: loginData.password
      });

      setMessage({ type: 'success', text: 'Login successful' });
      console.log('Login response:', response.data);

      if (authLogin) {
        authLogin({ user: response.data, userType: userType }); // Pass userType to context
      }

      // Navigate based on userType
      if (userType === 'retailers') {
        navigate('/layout'); // Assuming '/layout' is for retailers
      } else if (userType === 'distributors') {
        navigate('/distributor'); // Assuming '/distributor' is for distributors
      } else if (userType === 'partners') {
        navigate('/partner'); // Assuming '/partner' is for partners
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid credentials. Please try again.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
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
      } else if (userType === 'distributors' || userType === 'partners') {
        endpoint = '/distributors/register'; // Assuming distributors and partners register via the same endpoint
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
      } else {
        throw new Error("Invalid user type for registration.");
      }

      await API.post(endpoint, payload);
      setMessage({ type: 'success', text: 'Account created successfully! Please sign in.' });

      // Clear register form data
      setRegisterData({
        businessName: '', CompanyName: '', ownerName: '', email: '',
        password: '', phone: '', gstNumber: '', businessType: '',
        pincode: '', location: ''
      });

      // Switch to login tab after successful registration
      setTimeout(() => {
        setActiveTab('login');
        setMessage({ type: '', text: '' }); // Clear success message after delay
      }, 2000); // Give user time to read success message

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

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
    // Conditionally add business name field based on userType
    if (userType === 'retailers' && registerData.businessName.trim() === '') {
      return false;
    }
    if ((userType === 'distributors' || userType === 'partners') && registerData.CompanyName.trim() === '') {
      return false;
    }
    return requiredFields.every(field => registerData[field].trim() !== '');
  };

  // Crucial change here:
  // When a user type is selected, we also set the activeTab to 'login' by default.
  const handleUserTypeSelection = (id) => {
    setUserType(id);
    setActiveTab('login'); // <--- Set to login when a user type is selected
    setShowInitialButtons(false); // Hide the initial buttons
    setMessage({ type: '', text: '' }); // Clear any previous messages
  };

  const selectedUserTypeLabel = userTypes.find(type => type.id === userType)?.label;

  const getSubtitle = () => {
    if (userType && activeTab === 'login') {
      return `Sign in to your ${selectedUserTypeLabel} account.`;
    }
    if (userType && activeTab === 'register') {
      return `Create your new ${selectedUserTypeLabel} account.`;
    }
    if (!userType) { // This condition determines if we are on the initial selection screen
      return 'Seamlessly connect and grow.';
    }
    return ''; // Default empty if none of the above
  };

  return (
    <motion.div
      className="fixed w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white flex items-center justify-center font-inter p-4 sm:p-8 overflow-auto"
      initial="initial"
      animate="enter"
      exit="exit"
      variants={mainContainerVariants}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%), url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M100 0L0 100V0h100zM0 0l100 100H0V0z\' fill=\'%230F172A\' fill-opacity=\'0.4\'/%3E%3C/svg%3E")',
        backgroundSize: '20px 20px',
        animation: 'grid-pan 60s linear infinite'
      }}></div>
      <style>{`@keyframes grid-pan { from { background-position: 0 0; } to { background-position: -1000px -1000px; } }`}</style>

      {/* Main content container */}
      <div className="relative h-full w-full max-w-full mx-auto bg-slate-800/30 backdrop-blur-3xl shadow-[0_0_60px_rgba(59,130,246,0.25)] border border-blue-700/50 flex flex-col lg:flex-row overflow-auto rounded-3xl transform-gpu transition-all duration-1000 ease-in-out">

        {/* Back button */}
        <AnimatePresence>
          {userType && (
            <motion.button
              key="back-button"
              onClick={handleGoBackToUserTypeSelection}
              className="absolute top-6 left-6 z-50 p-3 rounded-full bg-blue-900/50 border border-blue-700/70 text-blue-300 hover:bg-blue-800/70 hover:text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Close button */}
        <motion.button
          key="close-button"
          onClick={handleCloseLogin}
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-slate-800/50 border border-slate-600/70 text-slate-300 hover:bg-slate-700/70 hover:text-white transition-all duration-300 shadow-lg hover:shadow-slate-500/30"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-5 h-5" />
        </motion.button>

        {/* Left Panel: Content dependent on userType and activeTab */}
        <motion.div
          className={`flex-1 flex flex-col items-center justify-center h-full p-4 sm:p-8 relative z-10 w-full lg:w-1/2`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="w-full max-w-lg mx-auto">

            {/* Header */}
            <div className="text-center mb-10 mt-10 w-full">
              <motion.h1
                className="text-5xl sm:text-7xl font-extrabold leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 drop-shadow-lg"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Welcome
              </motion.h1>
              <motion.p
                className="text-lg sm:text-xl text-gray-300 mt-4 min-h-[56px]"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {getSubtitle()}
              </motion.p>
            </div>

            {/* Message Display */}
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`mb-6 p-4 text-sm rounded-xl border backdrop-blur-sm ${
                  message.type === 'success'
                    ? 'bg-green-600/30 text-green-200 border-green-500/50'
                    : 'bg-red-600/30 text-red-200 border-red-500/50'
                }`}
              >
                {message.text}
              </motion.div>
            )}

            {/* User Type Selection - Shown when userType is null */}
            <AnimatePresence mode='wait'>
              {!userType && (
                <motion.div
                  key="user-type-selection"
                  className="space-y-4 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                >
                  {userTypes.map((type, index) => (
                    <motion.div
                      key={type.id}
                      className="relative bg-gradient-to-r from-slate-700/50 to-slate-800/50 p-6 rounded-2xl border border-slate-600/50 cursor-pointer hover:border-blue-500/50 transition-all duration-300 group overflow-auto backdrop-blur-sm"
                      onClick={() => handleUserTypeSelection(type.id)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${type.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                      <div className="relative z-10 flex items-center space-x-4">
                        <div className={`w-16 h-16 bg-gradient-to-r ${type.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                          <type.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                            {type.label}
                          </h3>
                          <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors">
                            {type.description}
                          </p>
                        </div>
                        <Sparkles className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Login Form - Shown when userType is selected and activeTab is 'login' */}
              {userType && activeTab === 'login' && (
                <motion.div
                  key="login-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-6 w-full"
                >
                <div id="google-section"> {/* Added ID for smooth scrolling */}
                  <GoogleAuthButton />
              </div>
                  {/* ... Login form content (your existing code) ... */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => handleInputChange('login', 'email', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 shadow-inner"
                      placeholder="Email address"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) => handleInputChange('login', 'password', e.target.value)}
                      className="w-full pl-12 pr-12 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 shadow-inner"
                      placeholder="Password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading || !isLoginFormValid()}
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-sky-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-blue-500/40 transform-gpu"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(59,130,246,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Authenticating...
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </motion.button>

                  {/* Create Account Button */}
                  <div className="text-center">
                    <p className="text-gray-400 mb-3">Don't have an account?</p>
                    <motion.button
                      onClick={() => setActiveTab('register')}
                      className="w-full bg-gradient-to-r from-slate-700 to-slate-800 text-white py-3 rounded-xl font-medium border border-slate-600/50 hover:border-blue-500/50 hover:from-slate-600 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Create New Account
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Register Form - Shown when userType is selected and activeTab is 'register' */}
              {userType && activeTab === 'register' && (
                <motion.div
                  key="register-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-5 w-full"
                >
                  {/* ... Register form content (your existing code) ... */}
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={userType === 'retailers' ? registerData.businessName : registerData.CompanyName}
                      onChange={(e) => handleInputChange('register', userType === 'retailers' ? 'businessName' : 'CompanyName', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 shadow-inner"
                      placeholder={`${userType === 'retailers' ? 'Business' : 'Company'} name`}
                      required
                    />
                  </div>

                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={registerData.ownerName}
                      onChange={(e) => handleInputChange('register', 'ownerName', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 shadow-inner"
                      placeholder="Owner name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={registerData.email}
                        onChange={(e) => handleInputChange('register', 'email', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 shadow-inner"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={registerData.phone}
                        onChange={(e) => handleInputChange('register', 'phone', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 shadow-inner"
                        placeholder="Phone"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerData.password}
                      onChange={(e) => handleInputChange('register', 'password', e.target.value)}
                      className="w-full pl-12 pr-12 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 shadow-inner"
                      placeholder="Password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={registerData.gstNumber}
                        onChange={(e) => handleInputChange('register', 'gstNumber', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 shadow-inner"
                        placeholder="GST number (Optional)"
                      />
                    </div>
                    <div className="relative">
                      <select
                        value={registerData.businessType}
                        onChange={(e) => handleInputChange('register', 'businessType', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 shadow-inner appearance-none pr-10"
                      >
                        <option value="" className="bg-gray-800 text-gray-400">Business type (Optional)</option>
                        {businessTypes.map((type) => (
                          <option key={type} value={type} className="bg-gray-800 text-white">{type}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={registerData.pincode}
                        onChange={(e) => handleInputChange('register', 'pincode', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 shadow-inner"
                        placeholder="Pincode (Optional)"
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={registerData.location}
                        onChange={(e) => handleInputChange('register', 'location', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 shadow-inner"
                        placeholder="Location (Optional)"
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading || !isRegisterFormValid()}
                    onClick={handleRegister}
                    className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-sky-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-blue-500/40 transform-gpu"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(59,130,246,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Creating account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </motion.button>

                  {/* Back to Login Button */}
                  <div className="text-center">
                    <p className="text-gray-400 mb-3">Already have an account?</p>
                    <motion.button
                      onClick={() => setActiveTab('login')}
                      className="w-full bg-gradient-to-r from-slate-700 to-slate-800 text-white py-3 rounded-xl font-medium border border-slate-600/50 hover:border-blue-500/50 hover:from-slate-600 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back to Sign In
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Welcome Message - This section is now ALWAYS visible on large screens */}
 <div className="min-h-screen w-[90vh] relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-center bg-contain "

        style={{
          backgroundImage: `url('https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-50-TAA-202310?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=VXV6Z09DaTFST3FqTnRkTjNkSENPM1ZnVFR5VGxOMG5WYlh6ZVpnWVpmOVNTeEZoVVBncVRqTkNMNS9uNklFcGdNL0tvRHFBWjFabEJvUTIxa3lDRWI2aER5OTZhZjhhVzlPaThxMkc0QVE')`
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        
        {/* Gradient overlay for extra depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-sky-900/40"></div>
      </div>

      {/* Welcome Message - Centered */}
      
        <div className="relative z-10 flex justify-center items-center min-h-screen w-full p-4 sm:p-8">
          <div 
            className="welcome-card text-white max-w-lg w-full p-8 sm:p-12 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-md bg-white/5"
            style={{
              animation: 'fadeInUp 0.8s ease-out 0.3s both'
            }}
          >
            {/* Icon Container */}
            <div 
              className="w-28 h-28 bg-gradient-to-br from-sky-400/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/30 shadow-lg"
              style={{
                animation: 'scaleIn 0.6s ease-out 0.5s both'
              }}
            >
              <Building2 className="w-14 h-14 text-sky-300 drop-shadow-lg" />
            </div>

            {/* Title */}
            <h2 
              className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-300 to-sky-400 text-center"
              style={{
                animation: 'fadeInUp 0.8s ease-out 0.6s both'
              }}
            >
              Say Hi to your Business Portal
            </h2>

            {/* Description */}
            <p 
              className="text-gray-200 leading-relaxed text-lg sm:text-xl text-center max-w-sm mx-auto"
              style={{
                animation: 'fadeInUp 0.8s ease-out 0.8s both'
              }}
            >
              Connect with retailers, distributors, and partners. Manage your business operations efficiently.
            </p>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-sky-400/10 to-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-sky-500/10 rounded-full blur-xl"></div>
          </div>
        </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .welcome-card {
          position: relative;
          overflow: hidden;
        }

        .welcome-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
      </div>
    </motion.div>
  );
}