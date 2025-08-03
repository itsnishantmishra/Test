import React, { useState, useRef, useEffect } from 'react';
import { Package, CreditCard, Users, LifeBuoy, TrendingUp, BarChart, ShoppingCart, ArrowRight, X, Sparkles } from 'lucide-react';

const FuturisticFeatures = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredOrb, setHoveredOrb] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [showModal, setShowModal] = useState(false);
  const sectionRef = useRef(null);
  

  const features = [
    {
      title: "Inventory Management",
      desc: "Stay updated with real-time stock levels.",
      img: "https://via.placeholder.com/600x300",
      icon: Package,
      color: "#60A5FA",
      position: { desktop: { x: 15, y: 20 }, mobile: { x: 20, y: 15 } }
    },
    {
      title: "Billing Solutions",
      desc: "Generate invoices and manage transactions effortlessly.",
      img: "https://via.placeholder.com/600x300",
      icon: CreditCard,
      color: "#34D399",
      position: { desktop: { x: 75, y: 15 }, mobile: { x: 80, y: 25 } }
    },
    {
      title: "Business Credit Management",
      desc: "Offer and track credit transactions securely.",
      img: "https://via.placeholder.com/600x300",
      icon: Users,
      color: "#A78BFA",
      position: { desktop: { x: 25, y: 60 }, mobile: { x: 15, y: 50 } }
    },
    {
      title: "Supply Chain Management",
      desc: "Optimize and streamline supply chain operations.",
      img: "https://via.placeholder.com/600x300",
      icon: TrendingUp,
      color: "#FB7185",
      position: { desktop: { x: 70, y: 70 }, mobile: { x: 75, y: 60 } }
    },
    {
      title: "Growth & Analytics",
      desc: "Gain insights to scale your business effectively.",
      img: "https://via.placeholder.com/600x300",
      icon: BarChart,
      color: "#FBBF24",
      position: { desktop: { x: 85, y: 45 }, mobile: { x: 85, y: 40 } }
    },
    {
      title: "Curated Business Support",
      desc: "Get expert advice and tailored support.",
      img: "https://via.placeholder.com/600x300",
      icon: LifeBuoy,
      color: "#F472B6",
      position: { desktop: { x: 45, y: 85 }, mobile: { x: 50, y: 75 } }
    }
  ];

  const Modalfeatures = [
    {
      title: "Inventory Management",
      desc: "Managing stock shouldn't be a guessing game. Our Inventory Management system gives you real-time updates on what's in stock, what's running low, and what's moving fast—so you can make smart, data-driven decisions. From barcode tracking to automated low-stock alerts, you'll never have to worry about overordering or missing a sale. Whether you're running a warehouse, retail store, or supply hub, the interface is intuitive and scalable to fit your operations. Say goodbye to outdated spreadsheets and hello to seamless stock control. Your business deserves a smarter, smoother way to manage inventory—this is it.",
      img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1400&q=80"
    },
    {
      title: "Billing Solutions",
      desc: "Billing should be fast, reliable, and professional—and that's exactly what we deliver. With our comprehensive billing tools, you can generate invoices, send them instantly to customers, track payments, and set up recurring billing without a hitch. The system integrates seamlessly with your sales and customer data, giving you a full view of your financials in one place. Accept multiple payment modes and get notified when payments are delayed. Every invoice you send reflects your brand with customizable layouts and logos. Whether it's a one-time transaction or a monthly subscription, billing has never been this easy or elegant.",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80"
    },
    {
      title: "Business Credit Management",
      desc: "Extend credit with confidence using our advanced business credit management system. Easily set credit limits for customers, monitor outstanding balances, and automate friendly payment reminders. Designed with transparency and accountability in mind, our tools help you maintain strong business relationships while protecting your bottom line. Detailed credit reports and real-time repayment tracking help you spot risks early and take action quickly. Whether you're managing dozens of customers or just starting to offer credit, the system scales with your growth. Build trust, increase sales, and manage debt effectively—all from one centralized dashboard that puts you in control.",
      img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80"
    },
    {
      title: "Supply Chain Management",
      desc: "Your supply chain is the backbone of your business—and we make sure it runs smoothly. Our supply chain management tools offer full visibility across procurement, warehousing, shipping, and delivery. Monitor supplier performance, reduce lead times, and forecast inventory needs with intelligent suggestions. You can track each order in real-time and resolve bottlenecks before they impact your customers. With built-in collaboration features, everyone from vendors to logistics managers stays in sync. Whether you're handling simple deliveries or complex networks, this platform brings order and clarity to the chaos of supply. Get control, stay ahead, and keep everything moving efficiently.",
      img: "https://images.unsplash.com/photo-1605902711912-cfb43c4437e3?auto=format&fit=crop&w=1400&q=80"
    },
    {
      title: "Growth & Analytics",
      desc: "Data is only useful if it drives action. Our analytics dashboard turns complex numbers into clear, beautiful insights that help you grow faster. Track customer behavior, product performance, revenue trends, and operational KPIs—all in real time. Our tools help you identify what's working, fix what isn't, and uncover opportunities you didn't even know existed. Use filters, visualizations, and comparison tools to go deep into your metrics. Whether you're preparing a pitch, tracking a campaign, or optimizing a workflow, our analytics help you move forward with confidence. It's not just about numbers—it's about smarter decisions and sustainable success.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80"
    },
    {
      title: "Curated Business Support",
      desc: "Behind every successful business is a great support system. We go beyond software by offering personalized guidance, industry connections, and human expertise tailored to your unique needs. Whether you're seeking funding, improving operations, or expanding into new markets, our network of advisors and curated tools helps you get there faster. You can book strategy sessions, access expert content, or simply chat with a specialist who understands your space. Business is a journey—and you shouldn't walk it alone. With our support, you gain a team that grows with you, every step of the way.",
      img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

const handleLearnMoreClick = (index, event) => {
  event.stopPropagation();

  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
  const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;

  setZoomOrigin({ x, y });
  setIsZooming(true);

  // First, wait for zoom animation (~300ms), then show modal
  setTimeout(() => {
    setSelectedFeature(index);
    setShowModal(true);
  }, 300);

  // Then end the zoom effect after it's been shown (~500ms more)
  setTimeout(() => {
    setIsZooming(false);
  }, 800);
};


  const handleOrbClick = (index, event) => {
    // For mobile, directly open modal
    if (window.innerWidth < 768) {
      handleLearnMoreClick(index, event);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setSelectedFeature(null);
    }, 300);
  };

  const ConnectionLines = ({ isMobile }) => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
      <defs>
        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#06D6A0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      
      {features.map((feature, i) => {
        const nextFeature = features[(i + 1) % features.length];
        const pos = isMobile ? feature.position.mobile : feature.position.desktop;
        const nextPos = isMobile ? nextFeature.position.mobile : nextFeature.position.desktop;
        
        return (
          <line
            key={i}
            x1={`${pos.x}%`}
            y1={`${pos.y}%`}
            x2={`${nextPos.x}%`}
            y2={`${nextPos.y}%`}
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            className="animate-pulse"
            style={{
              animation: `drawLine 3s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        );
      })}
    </svg>
  );

  const FloatingOrb = ({ feature, index, isMobile }) => {
    const IconComponent = feature.icon;
    const position = isMobile ? feature.position.mobile : feature.position.desktop;
    const isHovered = hoveredOrb === index;

    return (
      <div
        className="absolute group cursor-pointer"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDelay: isVisible ? `${index * 200}ms` : '0ms',
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.3,
        }}
        onMouseEnter={() => setHoveredOrb(index)}
        onMouseLeave={() => setHoveredOrb(null)}
        onClick={(e) => handleOrbClick(index, e)}
      >
        {/* Ripple effect */}
        <div 
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{
            backgroundColor: feature.color,
            animation: isHovered ? 'ripple 2s infinite' : 'none',
            transform: 'scale(3)',
          }}
        />
        
        {/* Orbital rings */}
        <div 
          className="absolute inset-0 rounded-full border-2 opacity-30 animate-spin"
          style={{
            borderColor: feature.color,
            width: isHovered ? '120px' : '80px',
            height: isHovered ? '120px' : '80px',
            transform: 'translate(-50%, -50%)',
            animation: `spin ${10 + index}s linear infinite`,
            transition: 'all 0.5s ease'
          }}
        />
        
        {/* Main orb */}
        <div 
          className={`
            relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center
            backdrop-blur-xl border-2 transition-all duration-500
            ${isHovered ? 'scale-125 shadow-2xl' : 'scale-100'}
          `}
          style={{
            backgroundColor: `${feature.color}20`,
            borderColor: feature.color,
            boxShadow: isHovered ? `0 0 40px ${feature.color}60` : `0 0 20px ${feature.color}30`,
          }}
        >
          <IconComponent 
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 transition-all duration-300"
            style={{ color: feature.color }}
          />
        </div>
        
        {/* Feature info popup - Desktop only */}
        <div 
          className={`
            absolute left-full ml-4 top-1/2 -translate-y-1/2 w-64 p-4 rounded-2xl
            backdrop-blur-xl border transition-all duration-300 z-20
            hidden md:block
            ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
          `}
          style={{
            backgroundColor: `${feature.color}10`,
            borderColor: `${feature.color}40`,
            boxShadow: `0 8px 32px ${feature.color}20`,
          }}
        >
          <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">{feature.desc}</p>
          <div 
            className="flex items-center text-sm hover:scale-1 transition-transform pointer-events-auto"
            style={{ color: feature.color }}
            onClick={(e) => handleLearnMoreClick(index, e)}
          >
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Mobile feature label */}
        <div 
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg backdrop-blur-sm border text-xs text-center whitespace-nowrap md:hidden"
          style={{
            backgroundColor: `${feature.color}20`,
            borderColor: `${feature.color}40`,
            color: feature.color
          }}
        >
          {feature.title}
        </div>
      </div>
    );
  };

  const CentralHub = () => (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <div 
        className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(6, 214, 160, 0.2) 50%, rgba(96, 165, 250, 0.3) 100%)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 0 60px rgba(139, 92, 246, 0.4)',
          transform: isVisible ? 'scale(1)' : 'scale(0)',
          transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDelay: '800ms'
        }}
      >
        <div className="text-center">
          <div className="text-xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-2">
            SLEDGE
          </div>
          <div className="text-xs md:text-sm text-gray-300 opacity-80">
            Ecosystem
          </div>
        </div>
        
        {/* Rotating rings around central hub */}
        <div className="absolute inset-0 rounded-full border border-white/20 animate-spin" style={{ animation: 'spin 20s linear infinite' }} />
        <div className="absolute inset-2 rounded-full border border-purple-400/30 animate-spin" style={{ animation: 'spin 15s linear infinite reverse' }} />
      </div>
    </div>
  );

  const BackgroundEffects = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dynamic mesh background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />
        <div 
          className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent"
          style={{
            background: `radial-gradient(circle at ${mousePos.x * 0.1}% ${mousePos.y * 0.1}%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
          }}
        />
      </div>
      
      {/* Floating energy particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full opacity-40"
          style={{
            backgroundColor: features[i % features.length].color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );

  const ZoomEffect = () => {
    if (!isZooming) return null;
    
    return (
      <div 
        className="fixed inset-0 z-40 pointer-events-none"
        style={{
          background: `radial-gradient(circle 100px at ${zoomOrigin.x}% ${zoomOrigin.y}%, transparent 0%, rgba(0,0,0,0.9) 70%)`,
          animation: 'zoomTransition 0s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
        }}
      />
    );
  };

  const Modal = () => {
    if (selectedFeature === null || !showModal) return null;
    
    const feature = features[selectedFeature];
    const modalFeature = Modalfeatures[selectedFeature];
    const IconComponent = feature.icon;

    return (
      <div
        className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 opacity-100"
        style={{ backgroundColor: `${feature.color}20` }}
        onClick={closeModal}
      >
        <div
          className="relative rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden backdrop-blur-xl border shadow-2xl transition-all duration-500 scale-100 translate-y-0"
          style={{
            backgroundColor: `${feature.color}10`,
            borderColor: `${feature.color}40`,
            boxShadow: `0 20px 60px ${feature.color}30`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-12 h-12 rounded-full backdrop-blur-sm border flex items-center justify-center hover:scale-110 transition-all duration-300 group z-20"
            style={{
              backgroundColor: `${feature.color}20`,
              borderColor: `${feature.color}40`,
            }}
          >
            <X className="w-6 h-6 text-white group-hover:text-red-400 transition-colors" />
          </button>

          {/* Scrollable content */}
          <div className="max-h-[100vh] overflow-hidden ">
            {/* Image section */}
            <div className="relative mb-6 overflow-hidden">
              <img
                src={modalFeature.img}
                alt={modalFeature.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              
              {/* Gradient overlay */}
              <div 
                className="absolute inset-0 opacity-60"
                style={{
                  background: `linear-gradient(135deg, ${feature.color}40 0%, transparent 50%, ${feature.color}20 20%)`
                }}
              />
              

              {/* Icon */}
              <div className="absolute bottom-4 right-4">
                <div 
                  className="p-3 rounded-full backdrop-blur-sm border"
                  style={{
                    backgroundColor: `${feature.color}30`,
                    borderColor: `${feature.color}60`,
                  }}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="px-6 pb-6">
              {/* Title */}
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  {modalFeature.title}
                </h2>
                <div 
                  className="w-16 h-1 rounded-full"
                  style={{ backgroundColor: feature.color }}
                />
              </div>

              {/* Description */}
              <div 
                className="rounded-2xl p-6 md:p-8 backdrop-blur-sm border mb-6"
                style={{
                  backgroundColor: `${feature.color}05`,
                  borderColor: `${feature.color}20`,
                }}
              >
                <p className="text-lg md:text-xl leading-relaxed text-gray-200">
                  {modalFeature.desc}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="flex-1 px-6 py-3 rounded-xl font-medium border transition-all duration-300 hover:scale-105 text-white backdrop-blur-sm"
                  style={{
                    borderColor: `${feature.color}40`,
                    backgroundColor: `${feature.color}10`,
                  }}
                  onClick={closeModal}
                >
                  Close
                </button>
                
                <button
                  className="flex-1 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: feature.color,
                    boxShadow: `0 8px 25px ${feature.color}40`,
                  }}
                >
                  Explore {modalFeature.title}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
      >
        <BackgroundEffects />
        
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          {/* Header */}
          <div 
            className="text-center mb-16"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Why Choose
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-violet-500 to-cyan-400 bg-clip-text text-transparent">
                Sledge
              </span>
            </h2>
            <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Experience the future of B2B with our interconnected ecosystem of features
            </p>
          </div>

          {/* Constellation Layout */}
          <div className="relative h-[600px] md:h-[800px]">
            {/* Connection lines */}
            <div className="hidden md:block">
              <ConnectionLines isMobile={false} />
            </div>
            <div className="block md:hidden">
              <ConnectionLines isMobile={true} />
            </div>
            
            {/* Central hub */}
            <CentralHub />
            
            {/* Feature orbs */}
            <div className="hidden md:block">
              {features.map((feature, index) => (
                <FloatingOrb key={index} feature={feature} index={index} isMobile={false} />
              ))}
            </div>
            
            <div className="block md:hidden">
              {features.map((feature, index) => (
                <FloatingOrb key={index} feature={feature} index={index} isMobile={true} />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <ZoomEffect />
      <Modal />
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(2deg); }
          66% { transform: translateY(10px) rotate(-2deg); }
        }
        
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(4); opacity: 0; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes drawLine {
          0% { stroke-dasharray: 0 1000; }
          50% { stroke-dasharray: 1000 1000; }
          100% { stroke-dasharray: 0 1000; }
        }
        
        @keyframes zoomTransition {
          0% { 
            transform: scale(1);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% { 
            transform: scale(15);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default FuturisticFeatures;