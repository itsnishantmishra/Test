import { motion, useAnimation, useInView } from "framer-motion";
import { BarChart, CreditCard, Package, ShoppingCart, TrendingUp, Users, Moon, Sun, ArrowRight, CheckCircle, Mail, Star, Phone, MapPin } from "lucide-react";
import { useRef, useEffect, useState } from "react";

// Mock images for demonstration
const kiranaShop = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80";
const Earth = "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
const Money = "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

// Split Text Component
const SplitText = ({ text, className, delay = 80, onLetterAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: `all 0.4s ease-out ${index * delay}ms`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

// Explore Section Component
const ExploreSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const sections = [
    {
      title: "Home Solutions",
      subtitle: "Smart Living",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Business Tools",
      subtitle: "Growth Focused",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Analytics",
      subtitle: "Data Driven",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: "from-orange-500 to-red-600"
    },
    {
      title: "Innovation",
      subtitle: "Future Ready",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: "from-purple-500 to-pink-600"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={ref}
      className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Explore Our Solutions
        </h2>
        
        {/* Mobile: Single card with partial next card visible */}
        <div className="md:hidden overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * 85}%)` }}
          >
            {sections.map((section, index) => (
              <div
                key={index}
                className="w-[85%] flex-shrink-0 mr-4"
              >
                <div className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg h-80">
                  <div className="relative h-48">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${section.color} opacity-80`} />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                      <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                      <p className="text-sm opacity-90">{section.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Discover innovative solutions that drive your business forward with cutting-edge technology.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile navigation dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-80">
                <div className="relative h-48">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${section.color} opacity-80`} />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                    <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                    <p className="text-sm opacity-90">{section.subtitle}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Discover innovative solutions that drive your business forward.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const features = [
  {
    title: "Inventory Management",
    desc: "Stay updated with real-time stock levels.",
    img: "https://via.placeholder.com/600x300"
  },
  {
    title: "Billing Solutions",
    desc: "Generate invoices and manage transactions effortlessly.",
    img: "https://via.placeholder.com/600x300"
  },
  {
    title: "Business Credit Management",
    desc: "Offer and track credit transactions securely.",
    img: "https://via.placeholder.com/600x300"
  },
  {
    title: "Supply Chain Management",
    desc: "Optimize and streamline supply chain operations.",
    img: "https://via.placeholder.com/600x300"
  },
  {
    title: "Growth & Analytics",
    desc: "Gain insights to scale your business effectively.",
    img: "https://via.placeholder.com/600x300"
  },
  {
    title: "Curated Business Support",
    desc: "Get expert advice and tailored support.",
    img: "https://via.placeholder.com/600x300"
  }
];

function useScrollReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export default function LandingPage() {
  const heroRef = useRef(null);
  const [heroWidth, setHeroWidth] = useState(100);
  const [heroRadius, setHeroRadius] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sledge Software Solutions section
  const sledgeRef = useRef(null);
  const [sledgeScale, setSledgeScale] = useState(1);
  const [sledgeTranslate, setSledgeTranslate] = useState(0);
  const [bgReveal, setBgReveal] = useState(0);
  const [isSledgeVisible, setIsSledgeVisible] = useState(false);

  // Why Sledge Ref Section
  const whySledgeRef = useRef(null);
  const [whySledgeWidth, setWhySledgeWidth] = useState(100);
  const [whySledgeRadius, setWhySledgeRadius] = useState(0);
  const [isWhySledgeVisible, setIsWhySledgeVisible] = useState(false);

  // Why exist section
  const ExistRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Pricing section
  const pricingRef = useRef(null);
  const [isPricingVisible, setIsPricingVisible] = useState(false);

  // Newsletter section
  const newsletterRef = useRef(null);
  const [isNewsletterVisible, setIsNewsletterVisible] = useState(false);

  // Dark mode toggle function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ExistRef.current) {
      observer.observe(ExistRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Pricing section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPricingVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (pricingRef.current) {
      observer.observe(pricingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Newsletter section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNewsletterVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (newsletterRef.current) {
      observer.observe(newsletterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;
    
    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          // --- HERO SECTION ANIMATION ---
          if (heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const start = 0;
            const end = -windowHeight * 1.2;
            let progress = 0;
            if (rect.top < start) {
              progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
            }
            const width = Math.round((100 - 15 * progress) * 100) / 100;
            const radius = Math.round(progress * 48 * 100) / 100;
            heroRef.current.style.width = `${width}vw`;
            heroRef.current.style.borderRadius = `${radius}px`;
          }

          // --- WHY SLEDGE SECTION ANIMATION --- 
          if (whySledgeRef.current) {
            const rect = whySledgeRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
              setIsWhySledgeVisible(true);
            }
            
            if (rect.top <= windowHeight && rect.bottom >= 0) {
              const start = 0;
              const end = -windowHeight * 1.2;
              let progress = 0;
              if (rect.top < start) {
                progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
              }
              const width = Math.round((100 - 15 * progress) * 100) / 100;
              const radius = Math.round(progress * 48 * 100) / 100;
              whySledgeRef.current.style.width = `${width}vw`;
              whySledgeRef.current.style.borderRadius = `${radius}px`;
            }
          }

          // --- SLEDGE SECTION ANIMATION ---
          if (sledgeRef.current) {
            const rect = sledgeRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
              setIsSledgeVisible(true);
            }
            
            if (rect.top <= windowHeight && rect.bottom >= 0) {
              const start = windowHeight * 0.3;
              const end = -windowHeight * 0.2;
              let progress = 0;
              if (rect.top < start) {
                progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
              }
              setSledgeScale(1 - 0.3 * progress);
              setSledgeTranslate(-350 * progress);
              setBgReveal(progress);
            }
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 md:top-6 md:right-6 z-50 p-2 md:p-3 rounded-full transition-all duration-300 shadow-lg ${
          isDarkMode 
            ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400 border border-gray-700' 
            : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
        }`}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <Sun size={18} className="md:w-5 md:h-5" /> : <Moon size={18} className="md:w-5 md:h-5" />}
      </button>

      {/* Hero Section with animated width and border radius */}
      <section
        ref={heroRef}
        className="relative flex flex-col justify-center overflow-hidden p-0 m-0 mx-auto"
        style={{
          width: `${heroWidth}vw`,
          height: "100vh",
          borderRadius: `${heroRadius}px`,
          background: isDarkMode ? "#1f2937" : "#fff",
          boxShadow: heroRadius !== 0 ? (isDarkMode ? "0 8px 32px 0 rgba(0,0,0,0.4)" : "0 8px 32px 0 rgba(36,41,54,0.13)") : undefined,
          transform: "translateZ(0)",
          willChange: "width, border-radius",
        }}
      >
        {/* Fullscreen Video - only covers the hero section */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          style={{ 
            minHeight: "100vh", 
            minWidth: "100vw", 
            borderRadius: `${heroRadius}px`,
            transform: "translateZ(0)",
            willChange: "border-radius",
            filter: isDarkMode ? "brightness(0.7) contrast(1.1)" : "none"
          }}
        >
          <source src="https://www.onelineage.com/sites/default/files/2023-05/main_page_032323_web.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Subtle dark gradient overlay from left */}
        <div
          className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
          style={{
            background: isDarkMode 
              ? "linear-gradient(to right, rgba(10,20,35,0.85) 40%, rgba(10,20,35,0.4) 70%, rgba(10,20,35,0.1) 100%)"
              : "linear-gradient(to right, rgba(20,30,48,0.7) 40%, rgba(20,30,48,0.2) 70%, rgba(20,30,48,0) 100%)",
            minHeight: "100vh",
            minWidth: "100vw",
            borderRadius: `${heroRadius}px`,
            transform: "translateZ(0)",
            willChange: "border-radius",
          }}
        />
        
        {/* Content aligned to left and above the video */}
        <div 
          className="max-w-4xl relative z-20 flex flex-col items-start px-4 md:px-7 lg:px-12 ml-4 md:ml-8 lg:ml-16"
          style={{
            transform: "translateZ(0)",
          }}
        >
          <SplitText
            text="Bridging Retailers"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl py-2 font-bold leading-tight mb-2 md:mb-6 tracking-tight text-white text-left"
            delay={80}
            duration={0.4}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
          <SplitText
            text="& Distributors"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 tracking-tight text-white text-left"
            delay={80}
            duration={0.4}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
          <button
            className="mt-4 md:mt-8 px-6 md:px-10 py-2 md:py-3 border border-white text-white rounded-full bg-white bg-opacity-0 backdrop-sm font-medium transition hover:bg-opacity-20 text-sm md:text-base"
            style={{
              fontWeight: 400,
              boxShadow: "0 2px 16px 0 rgba(0,0,0,0.10)"
            }}
          >
            Learn more
          </button>
        </div>
      </section>
      
      {/* Why Do We Exist Section */}
      <section
        ref={ExistRef}
        className={`flex justify-between items-center py-8 md:py-14 px-4 md:pl-2 md:pr-2 w-full transition-all duration-1000 ease-out transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        } ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
        style={{
          transitionDelay: isInView ? '200ms' : '0ms'
        }}
      >
        <div className={`w-full rounded-2xl flex flex-col items-start overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6 tracking-tight text-left pl-4 md:pl-16 pt-6 md:pt-12">
            <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-teal-400 bg-clip-text text-transparent">
              Why Do We Exist
            </span>
          </h2>
          <div className={`text-base md:text-xl text-left pl-4 md:pl-16 mb-4 md:mb-8 w-full pr-4 md:pr-16 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We exist to empower retailers and distributors with modern, efficient, and elegant software solutions that bridge the gap in the supply chain, enabling growth and clarity for every business.
          </div>
        </div>
      </section>

      {/* Sledge Software Solutions Section */}    
      <section
        ref={sledgeRef}
        className={`text-center px-4 md:px-6 py-16 md:py-28 lg:py-40 max-w-5xl mx-auto relative overflow-hidden transition-all duration-1000 ease-out transform ${
          isSledgeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
        style={{ 
          minHeight: "60vh",
          transitionDelay: isSledgeVisible ? '300ms' : '0ms'
        }}
      >
        {/* Background reveal: white to image, revealed from bottom */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`} />
          <img
            src={kiranaShop}
            alt="Background"
            className="absolute left-0 bottom-0 w-full object-cover transition-all duration-500"
            style={{
              height: `${bgReveal * 100}%`,
              opacity: bgReveal,
              filter: `blur(${10 - 10 * bgReveal}px) ${isDarkMode ? 'brightness(0.8) contrast(1.1)' : ''}`,
              transition: "height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s, filter 0.4s"
            }}
          />
        </div>
        <div
          className="relative z-10 transition-all duration-300"
          style={{
            transform: `scale(${sledgeScale}) translateY(${sledgeTranslate}px)`,
            transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)"
          }}
        >
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6 tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Sledge 
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 tracking-tight text-blue-400">
            Software Solutions
          </h1>
          <p className={`text-base md:text-xl mb-6 md:mb-10 max-w-2xl mx-auto px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            A premium UI crafted with modern design for clarity, elegance, and modern appeal. Designed for forward-thinkers.
          </p>
          <button className={`px-6 md:px-8 py-2 md:py-3 text-base md:text-lg rounded-full transition-all ${
            isDarkMode 
              ? 'bg-white text-gray-900 hover:bg-gray-100' 
              : 'bg-black text-white hover:bg-gray-900'
          }`}>
            Explore Now
          </button>
        </div>
      </section>

      {/* --- Fullscreen Scrollable Rounded Rectangles Section --- */}
      <div>
        <ExploreSection />
      </div>
      
      {/* Modal Overlay */}
      {selectedFeature !== null && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedFeature(null)}
        >
          <div
            className={`relative rounded-2xl p-4 md:p-6 w-full max-w-4xl h-[90vh] md:h-[95vh] overflow-auto ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedFeature(null)}
              className={`absolute top-2 right-3 md:top-3 md:right-4 text-xl md:text-2xl hover:text-red-500 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              &times;
            </button>

            {/* Image */}
            <img
              src={kiranaShop}
              alt={features[selectedFeature].title}
              className="w-full h-48 md:h-64 object-cover rounded-lg mb-4"
              style={{
                filter: isDarkMode ? 'brightness(0.9)' : 'none'
              }}
            />

            {/* Title & Description */}
            <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-900'}`}>
              {features[selectedFeature].title}
            </h2>
            <p className={`text-base md:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              {features[selectedFeature].desc}
            </p>
          </div>
        </div>
      )}

      {/* Why Choose Sledge Section */}
      <section
        ref={whySledgeRef}
        className={`w-full relative flex flex-col justify-center overflow-hidden mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:pt-8 transition-all duration-1000 ease-out ${
          isWhySledgeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        } ${isDarkMode ? 'bg-gray-800' : 'bg-black'}`}
        style={{
          width: "100vw",
          minHeight: "100vh",
          borderRadius: "0px",
          boxShadow: whySledgeRadius !== 0 ? (isDarkMode ? "0 8px 32px 0 rgba(0,0,0,0.6)" : "0 8px 32px 0 rgba(36,41,54,0.13)") : undefined,
          transform: "translateZ(0)",
          willChange: "width, border-radius",
          transitionDelay: isWhySledgeVisible ? '400ms' : '0ms'
        }}
      >
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 md:mb-8 text-white">
            Why Choose 
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Sledge</span>
          </h2>
          <p className="text-lg md:text-xl text-center mb-12 md:mb-16 text-gray-300 max-w-3xl mx-auto">
            Built for the modern retailer and distributor, our solutions combine cutting-edge technology with intuitive design.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group cursor-pointer transform transition-all duration-700 ${
                  isWhySledgeVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
                onClick={() => setSelectedFeature(index)}
              >
                <div className="bg-gray-800 hover:bg-gray-700 rounded-2xl p-6 md:p-8 h-full transition-all duration-300 border border-gray-700 hover:border-gray-600 group-hover:shadow-2xl group-hover:shadow-purple-500/10">
                  <div className="flex items-center mb-4">
                    {index === 0 && <Package className="w-8 h-8 text-blue-400 mr-3" />}
                    {index === 1 && <CreditCard className="w-8 h-8 text-green-400 mr-3" />}
                    {index === 2 && <Users className="w-8 h-8 text-purple-400 mr-3" />}
                    {index === 3 && <TrendingUp className="w-8 h-8 text-orange-400 mr-3" />}
                    {index === 4 && <BarChart className="w-8 h-8 text-pink-400 mr-3" />}
                    {index === 5 && <ShoppingCart className="w-8 h-8 text-teal-400 mr-3" />}
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    {feature.desc}
                  </p>
                  <div className="mt-4 flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button className="px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-lg md:text-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        ref={pricingRef}
        className={`py-16 md:py-24 px-4 md:px-8 transition-all duration-1000 ease-out transform ${
          isPricingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        } ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
        style={{
          transitionDelay: isPricingVisible ? '200ms' : '0ms'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl md:text-6xl font-bold text-center mb-4 md:mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Simple, Transparent
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"> Pricing</span>
          </h2>
          <p className={`text-lg md:text-xl text-center mb-12 md:mb-16 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Choose the plan that fits your business needs. All plans include our core features with premium support.
          </p>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Starter Plan */}
            <div className={`rounded-2xl p-6 md:p-8 border-2 transition-all duration-300 hover:shadow-xl ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Starter</h3>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₹999</span>
                <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Up to 100 products', 'Basic inventory tracking', 'Simple billing', 'Email support'].map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                isDarkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                Get Started
              </button>
            </div>

            {/* Professional Plan - Featured */}
            <div className={`rounded-2xl p-6 md:p-8 border-2 border-blue-500 relative transition-all duration-300 hover:shadow-2xl ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Professional</h3>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₹2,499</span>
                <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Unlimited products', 'Advanced analytics', 'Credit management', 'Priority support', 'Custom reports'].map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className={`rounded-2xl p-6 md:p-8 border-2 transition-all duration-300 hover:shadow-xl ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Enterprise</h3>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Everything in Professional', 'Custom integrations', 'Dedicated support', 'On-premise deployment', 'SLA guarantee'].map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                isDarkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-16 md:py-24 px-4 md:px-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl md:text-6xl font-bold text-center mb-12 md:mb-16 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            What Our Customers Say
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                role: 'Shop Owner',
                content: 'Sledge has transformed how I manage my store. The inventory tracking is seamless and the billing system is so intuitive.',
                rating: 5
              },
              {
                name: 'Priya Sharma',
                role: 'Distributor',
                content: 'The analytics dashboard gives me insights I never had before. My business has grown 40% since using Sledge.',
                rating: 5
              },
              {
                name: 'Amit Patel',
                role: 'Retailer',
                content: 'Customer support is outstanding. They helped me set up everything and were always there when I needed help.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className={`rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl ${
                isDarkMode ? 'bg-gray-700' : 'bg-white'
              }`}>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {testimonial.name}
                  </h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section
        ref={newsletterRef}
        className={`py-16 md:py-24 px-4 md:px-8 transition-all duration-1000 ease-out transform ${
          isNewsletterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        } ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
        style={{
          transitionDelay: isNewsletterVisible ? '300ms' : '0ms'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Stay Updated
          </h2>
          <p className={`text-lg md:text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Get the latest updates, tips, and insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-6 py-3 rounded-lg border text-lg ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 md:py-16 px-4 md:px-8 border-t ${
        isDarkMode 
          ? 'bg-gray-900 border-gray-800 text-gray-300' 
          : 'bg-gray-50 border-gray-200 text-gray-600'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Sledge
              </h3>
              <p className="mb-4">
                Empowering retailers and distributors with modern software solutions.
              </p>
              <div className="flex space-x-4">
                <Mail className="w-5 h-5" />
                <Phone className="w-5 h-5" />
                <MapPin className="w-5 h-5" />
              </div>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Product
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Integration</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Company
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-500 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Support
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className={`pt-8 border-t text-center ${
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <p>© 2024 Sledge Software Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}