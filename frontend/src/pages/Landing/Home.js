import { motion, useAnimation, useInView, useTransform, useScroll } from "framer-motion";
import { BarChart, CreditCard, Package, ShoppingCart, TrendingUp, Users, Moon, Sun, ArrowRight, Star, CheckCircle, X, Sparkles } from "lucide-react";
import Footer from "../../components/Footer";
import kiranaShop from "../../assets/945.png";
import SplitText from "../Utilities/SplitText";
import Earth from "../../assets/HomeEarth.png";
import Home1 from "../../assets/Home1.png";
import Home2 from "../../assets/Home2.png";
import Home3 from "../../assets/Home3.png";
import Home4 from "../../assets/Home4.png";
import Money from "../../assets/HomeMoney.png";
import ExploreSection from "../../components/ExploreSection";
import BG2 from "../../assets/Background2.png";
import CardSwap, { Card } from '../Utilities/CardSwap/cardSwap'

import { useRef, useEffect, useState,} from "react";


const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};


const testimonials = [
  {
    name: 'Jane Doe',
    role: 'Product Designer',
    quote: 'This product has completely transformed the way we work. Simple, elegant, and powerful.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
  },
  {
    name: 'John Smith',
    role: 'Software Engineer',
    quote: 'Fast, intuitive and polished — couldn’t ask for more.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4,
  },
  {
    name: 'Alicia Keys',
    role: 'Business Analyst',
    quote: 'Saved us hours of manual work. The simplicity is genius.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'CTO, TechLabs',
    quote: 'Reliable, elegant and extremely efficient. Highly recommended!',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 5,
  },
];


  

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

const Modalfeatures = [
  {
    title: "Inventory Management",
    desc: "Managing stock shouldn’t be a guessing game. Our Inventory Management system gives you real-time updates on what’s in stock, what’s running low, and what’s moving fast—so you can make smart, data-driven decisions. From barcode tracking to automated low-stock alerts, you’ll never have to worry about overordering or missing a sale. Whether you’re running a warehouse, retail store, or supply hub, the interface is intuitive and scalable to fit your operations. Say goodbye to outdated spreadsheets and hello to seamless stock control. Your business deserves a smarter, smoother way to manage inventory—this is it.",
    img: "https://support.apple.com/content/dam/edam/applecare/images/en_US/psp/psp_heroes/hero-banner-support-home.image.small_2x.jpg"
  },
  {
    title: "Billing Solutions",
    desc: "Billing should be fast, reliable, and professional—and that’s exactly what we deliver. With our comprehensive billing tools, you can generate invoices, send them instantly to customers, track payments, and set up recurring billing without a hitch. The system integrates seamlessly with your sales and customer data, giving you a full view of your financials in one place. Accept multiple payment modes and get notified when payments are delayed. Every invoice you send reflects your brand with customizable layouts and logos. Whether it’s a one-time transaction or a monthly subscription, billing has never been this easy or elegant.",
    img: "https://support.apple.com/content/dam/edam/applecare/images/en_US/psp/psp_heroes/hero-banner-support-home.image.small_2x.jpg"
  },
  {
    title: "Business Credit Management",
    desc: "Extend credit with confidence using our advanced business credit management system. Easily set credit limits for customers, monitor outstanding balances, and automate friendly payment reminders. Designed with transparency and accountability in mind, our tools help you maintain strong business relationships while protecting your bottom line. Detailed credit reports and real-time repayment tracking help you spot risks early and take action quickly. Whether you’re managing dozens of customers or just starting to offer credit, the system scales with your growth. Build trust, increase sales, and manage debt effectively—all from one centralized dashboard that puts you in control.",
    img: "https://support.apple.com/content/dam/edam/applecare/images/en_US/psp_heros/psp-hero-banner-watch.image.small_2x.jpg"
  },
  {
    title: "Supply Chain Management",
    desc: "Your supply chain is the backbone of your business—and we make sure it runs smoothly. Our supply chain management tools offer full visibility across procurement, warehousing, shipping, and delivery. Monitor supplier performance, reduce lead times, and forecast inventory needs with intelligent suggestions. You can track each order in real-time and resolve bottlenecks before they impact your customers. With built-in collaboration features, everyone from vendors to logistics managers stays in sync. Whether you’re handling simple deliveries or complex networks, this platform brings order and clarity to the chaos of supply. Get control, stay ahead, and keep everything moving efficiently.",
    img: "https://images.unsplash.com/photo-1605902711912-cfb43c4437e3?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Growth & Analytics",
    desc: "Data is only useful if it drives action. Our analytics dashboard turns complex numbers into clear, beautiful insights that help you grow faster. Track customer behavior, product performance, revenue trends, and operational KPIs—all in real time. Our tools help you identify what’s working, fix what isn’t, and uncover opportunities you didn’t even know existed. Use filters, visualizations, and comparison tools to go deep into your metrics. Whether you're preparing a pitch, tracking a campaign, or optimizing a workflow, our analytics help you move forward with confidence. It's not just about numbers—it's about smarter decisions and sustainable success.",
    img: "https://support.apple.com/content/dam/edam/applecare/images/en_US/psp_heros/psp-hero-banner-watch.image.small_2x.jpg"
  },
  {
    title: "Curated Business Support",
    desc: "Behind every successful business is a great support system. We go beyond software by offering personalized guidance, industry connections, and human expertise tailored to your unique needs. Whether you're seeking funding, improving operations, or expanding into new markets, our network of advisors and curated tools helps you get there faster. You can book strategy sessions, access expert content, or simply chat with a specialist who understands your space. Business is a journey—and you shouldn’t walk it alone. With our support, you gain a team that grows with you, every step of the way.",
    img: "https://support.apple.com/content/dam/edam/applecare/images/en_US/psp/psp_heroes/hero-banner-support-home.image.small_2x.jpg"
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
          observer.disconnect(); // Only once
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
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const ref = useRef(null);
  const controls = useAnimation();
  const IsInView = useInView(ref, { amount: 0.5, once: false });
  const timeoutRef = useRef(null);
  // Newsletter Section
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  
  // Sledge Software Solutions section
  const sledgeRef = useRef(null);
  const [sledgeScale, setSledgeScale] = useState(1);
  const [sledgeTranslate, setSledgeTranslate] = useState(0);
  const [bgReveal, setBgReveal] = useState(0);
  const [isSledgeVisible, setIsSledgeVisible] = useState(false);
  const sledgeImageRef = useRef(null);

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

  const flipVariants = {
    initial: {
    opacity: 0,
    y: 40, // start from below
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20, // fade and go upward
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    };

    // Newsletter Working Logic
    
      useEffect(() => {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setIsNewsletterVisible(true);
              }
            },
            { threshold: 0.1 }
          );

          if (newsletterRef.current) {
            observer.observe(newsletterRef.current);
          }

          return () => observer.disconnect();
        }, []);

      useEffect(() => {
          const handleMouseMove = (e) => {
            if (newsletterRef.current) {
              const rect = newsletterRef.current.getBoundingClientRect();
              setMousePosition({ 
                x: e.clientX - rect.left, 
                y: e.clientY - rect.top 
              });
            }
          };

        const section = newsletterRef.current;
            if (section) {
              section.addEventListener('mousemove', handleMouseMove);
              return () => section.removeEventListener('mousemove', handleMouseMove);
            }
  }, []);

        const handleSubmit = async (e) => {
          e.preventDefault();
          if (!formData.name || !formData.email) return;
          
          setIsSubmitting(true);
          
          // Simulate API call - replace with your actual API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          setIsSubmitting(false);
          setShowThankYou(true);
          setFormData({ name: '', email: '' });
        };

        const handleInputChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const closeThankYou = () => {
          setShowThankYou(false);
        };
  
    

 // Apple Bg Image
useEffect(() => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (IsInView) {
    clearTimeout(timeoutRef.current);
    controls.start({
      scale: 1.3,
      transition: { duration: 1.2, ease: "easeOut" },
    });
  } else {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        controls.start({
          scale: 1,
          transition: { duration: 0.5, ease: "easeInOut" },
        });
      }, 300000); // adjust delay as needed
    }
  }

  return () => clearTimeout(timeoutRef.current);
}, [IsInView, controls]);





  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    };
    // Dark Theme
    useEffect(() => {
      // Detect initial system theme
      const darkThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(darkThemeQuery.matches);

      // Listen for system theme changes
      const handleThemeChange = (e) => {
        setIsDarkMode(e.matches);
      };

      darkThemeQuery.addEventListener('change', handleThemeChange);

      // Cleanup listener when component unmounts
      return () => darkThemeQuery.removeEventListener('change', handleThemeChange);
    }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 } // Reduced threshold for earlier trigger
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

  // Function for smooth scrolling
 const handleSmoothScroll = (id, duration = 700) => {
  const element = document.getElementById(id);
  if (!element) return;

  const targetY = element.getBoundingClientRect().top + window.pageYOffset;
  const startY = window.pageYOffset;
  const diff = targetY - startY;
  let start;

  function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    // Ease in-out
    const percent = Math.min(time / duration, 1);
    const ease = percent < 0.5
      ? 2 * percent * percent
      : -1 + (4 - 2 * percent) * percent;
    window.scrollTo(0, startY + diff * ease);
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
};


  // Main Animations

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

        // --- WHY SLEDGE SECTION ANIMATION --- (FIXED)
        if (whySledgeRef.current) {
          const rect = whySledgeRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Check if section is in view for visibility
          if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
            setIsWhySledgeVisible(true);
          }
          
          // Only calculate scroll animation if section is visible
          if (rect.top <= windowHeight && rect.bottom >= 0) {
            const start = 0;
            const end = -windowHeight * 1.2;
            let progress = 0;
            if (rect.top < start) {
              progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
            }
            const width = Math.round((100 - 15 * progress) * 100) / 100;
            const radius = Math.round(progress * 48 * 100) / 100; // Fixed: multiply by 100 for proper rounding
            whySledgeRef.current.style.width = `${width}vw`;
            whySledgeRef.current.style.borderRadius = `${radius}px`;
          }
        }

        // --- SLEDGE SECTION ANIMATION ---
        if (sledgeRef.current) {
          const rect = sledgeRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Check if section is in view for visibility
          if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
            setIsSledgeVisible(true);
          }
          
          // Only calculate animation if section is in viewport
          if (rect.top <= windowHeight && rect.bottom >= 0) {
            const start = windowHeight * 1;
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

//Scroll Parallax
    let {scrollYProgress} = useScroll();
    let scrolly = useTransform(scrollYProgress, [0,1], ["0%","100%"]);


  
  return (
   <div className={`min-h-screen font-eudoxus transition-colors duration-300 overflow-x-hidden -mb-16 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <div>


      {/* Hero Section with animated width and border radius */}
      <motion.section
          ref={heroRef}
          className="relative flex flex-col justify-center overflow-hidden p-0 m-0 mx-auto"
          initial="initial"
          animate="enter"
           exit="exit"
          variants={flipVariants}
          style={{
            width: `${heroWidth}vw`,
            height: "100vh",
            borderRadius: `${heroRadius}px`,
             transformStyle: "preserve-3d",
            perspective: 1000,
            
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
            transform: "translateZ(0)", // Force hardware acceleration
            willChange: "border-radius", // Optimize for changes
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
            transform: "translateZ(0)", // Force hardware acceleration
            willChange: "border-radius", // Optimize for changes
          }}
        />
        {/* Content aligned to left and above the video */}
        <div 
          className="max-w-4xl relative z-20 flex flex-col items-start px-4 md:px-7 lg:px-12 ml-4 md:ml-16 lg:ml-8" // Reverted max-w-full, mx-auto, text-center
          style={{
            transform: "translateZ(0)", // Force hardware acceleration to prevent wobbling
          }}
        >
          <SplitText
            text="Bridging Retailers"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl py-2 font-bold leading-tight mb-3 md:mb-6 tracking-tight text-white text-left md:text-left" // Added md:text-left
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 tracking-tight text-white text-left md:text-left" // Added md:text-left
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
            onClick={() => handleSmoothScroll('why-sledge-section')} // Smooth scroll to Why Choose Sledge
            className="mt-4 md:mt-8 px-6 md:px-10 py-2 md:py-3 border border-white text-white rounded-full bg-white bg-opacity-0 backdrop-sm font-medium transition hover:bg-opacity-20 text-sm md:text-base"
            style={{
              font:"Eudoxus Sans",
              fontWeight: 400,
              boxShadow: "0 2px 16px 0 rgba(0,0,0,0.10)"
            }}
          >
            Learn more
          </button>
        </div>
      </motion.section>     



      {/* Why Do We Exist Section */}
      <section
        ref={ExistRef}
        className={`flex flex-col md:flex-row justify-between items-center py-8 md:py-14 px-4 md:px-16 w-full transition-all duration-1000 ease-out transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        } ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
        style={{
          transitionDelay: isInView ? '200ms' : '0ms' // Added delay for later appearance
        }}
      >
        <div className={`w-full flex flex-col items-center md:items-start overflow-hidden md:ml-2 ml-0${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}> {/* Reverted items-center for mobile */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6 tracking-tight text-left md:text-left md:pr-20 pt-6 md:pt-12"> {/* Reverted text-center for mobile */}
            <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-teal-400 bg-clip-text text-transparent font-eudoxus">
              Why Do We Exist
            </span>
          </h2>
          <div className={`text-sm md:text-xl text-center md:text-left pl-0 md:mt-4 font-eudoxus w-full ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}> {/* Reverted text-center for mobile */}
            To empower retailers and distributors with modern, efficient, and elegant software solutions 
          </div>
          <div className={`text-sm md:mt-2 md:text-xl text-center md:text-left pl-0 mb-4 md:mb-8 font-eudoxus w-full ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}> {/* Reverted text-center for mobile */}
             in the supply chain, enabling growth and clarity for every business.
          </div>
        </div>
      </section>


      </div>


      {/* Sledge Software Solutions Section */}
      <section
        ref={sledgeRef}
        className={`text-center px-4 md:mb-8 py-16 md:py-28 lg:py-60 rounded-3xl w-full max-w-xl md:max-w-7xl mx-auto relative overflow-hidden transition-all duration-1000 ease-out transform ${
          isSledgeVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-20'
        }`}
        style={{
          transitionDelay: isSledgeVisible ? '300ms' : '0ms',
          minHeight: '70vh'
        }}
      >
        {/* Apple Background Image - Enhanced with gradient overlay */}
<motion.div
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 rounded-3xl"
      initial={{ scale: 1 }}
      animate={controls}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      style={{
        backgroundImage: `url(${BG2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 1,
        filter: isDarkMode ? 'brightness(0.5) contrast(1.2)' : "brightness(0.6) contrast(1.4)",
        transformOrigin: "center",
      }}
    />


        
        {/* Enhanced gradient overlay for better text readability */}
        <div className="absolute inset-0 z-1 " />
        
        {/* Background reveal logic - Desktop only animation */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-2 overflow-hidden">
          {/* Static background for mobile */}
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} opacity-0`} />
          
          {/* Animated background image - Desktop only */}
          <img
            src={kiranaShop}
            alt="Background"
            className={`absolute left-0 bottom-0 w-full object-cover transition-all duration-500 ${
              window.innerWidth >= 768 ? 'md:mt-16' : ''
            }`}
            style={{
              // Mobile: Static centered image
              ...(window.innerWidth < 768 ? {
                height: '70%',
                opacity: 1,
                filter: `blur(0px) ${isDarkMode ? 'brightness(0.6) contrast(1.1)' : ''}`,
                top: '65%',
                transform: 'translateY(-50%)',
                objectPosition: 'center'
              } : {
                // Desktop: Animated reveal
                height: `${bgReveal * 90}%`,
                opacity: 1,
                filter: `blur(${10 - 10 * bgReveal}px) ${isDarkMode ? 'brightness(0.6) contrast(1.1)' : ''}`,
                transition: "height 0.2s cubic-bezier(0.32, 1, 0.36, 1), opacity 1s ease-out, filter 1s ease-out"
              })
            }}
          />
        </div>
        
        {/* Content Container with enhanced styling */}
        <div
          className="relative z-10 transition-all duration-300 "
          style={{
            // Apply scaling and translation only on desktop
            ...(window.innerWidth >= 768 ? {
              transform: `scale(${sledgeScale}) translateY(${sledgeTranslate}px)`,
              transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 1s ease-out"
            } : {
              transform: 'none',
              transition: "opacity 1s ease-out"
            })
          }}
        >
          {/* Enhanced title with better typography */}
          <div className="mb-16 md:mb-16 md:-mt-16 -mt-[170px] ">
            <h1 className="text-6xl mt-[120px] md:mt-0 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight md:mb-4 tracking-tight text-white drop-shadow-2xl">
              Sledge
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-2 md:mb-6 tracking-tight bg-gradient-to-r from-blue-200 via-blue-600 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
              Software Solutions
            </h1>
          </div>
          
          {/* Enhanced description with better spacing */}
          <div className="mb-8 md:mb-12 ">
            <p className="text-base md:text-xl lg:text-2xl text-bold  mb-4 max-w-3xl mx-auto px-4 text-gray-100 drop-shadow-lg font-medium leading-tight -mt-8">
              Simplified B2B Solutions grassrooted at the end of the Supply Chain
            </p>
            <p className="text-sm md:text-lg lg:text-xl max-w-2xl mx-auto px-4 text-gray-300 drop-shadow-lg font-light">
              Reducing your complexities, Easing your Operations.
            </p>
          </div>
          
          {/* Enhanced CTA button with premium styling */}
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center md:items-center">
            <button
              onClick={() => handleSmoothScroll('explore-section')}
              className="group relative inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 text-base md:text-lg lg:text-xl font-semibold rounded-full transition-all duration-300 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-300 text-gray-100 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Explore Now
                <svg className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </button>
          </div>
        </div>
        
        {/* Decorative elements for premium feel */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Subtle grain texture overlay for premium feel */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }} />
      </section>



      {/* --- Fullscreen Scrollable Rounded Rectangles Section --- */}
      <div id="explore-section"> {/* Added ID for smooth scrolling */}
          <ExploreSection />
      </div>
        
        

{/* Why Choose Sledge Section */}
<section
  ref={whySledgeRef}
  id="why-sledge-section"
  className={`w-full relative flex flex-col justify-center overflow-hidden mx-auto pt-8 md:pt-16 px-4 md:px-16 transition-all duration-1000 ease-out ${
    isWhySledgeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
  } ${isDarkMode ? 'bg-gray-900' : 'bg-black'}`}
  style={{
    width: "100vw",
    height: "auto",
    minHeight: "100vh",
    borderRadius: "0px",
    boxShadow: heroRadius !== "0px" ? (isDarkMode ? "0 8px 32px 0 rgba(0,0,0,0.6)" : "0 8px 32px 0 rgba(36,41,54,0.13)") : undefined,
    transform: "translateZ(0)",
    willChange: "width, border-radius",
    background: isDarkMode 
      ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f172a 100%)'
      : 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #000000 100%)'
  }}
>
  {/* Animated background particles */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-2 h-2 bg-purple-500 rounded-full animate-pulse opacity-60"></div>
    <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-40"></div>
    <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse opacity-50"></div>
    <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-violet-500 rounded-full animate-ping opacity-30"></div>
  </div>

  <div
    className="w-full h-full relative z-10 pb-8"
    style={{
      transform: isWhySledgeVisible ? 'none' : 'translateY(20px)',
      transition: 'transform 1000ms ease-out',
      transitionDelay: isWhySledgeVisible ? '400ms' : '0ms',
    }}
  >
    {/* Header */}
    <div className="text-left mb-8 md:mb-16 ">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-500 to-teal-400 mb-4">
        Why Choose Sledge
      </h2>
      <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-right">
        Experience the future of B2B with cutting-edge features designed for modern businesses
      </p>
    </div>

    {/* Mobile: Enhanced vertical scroll with cards */}
    <div className="block md:hidden">
      <div className="max-h-[70vh] overflow-y-auto px-2 space-y-4 pb-8 scrollbar-hide">
        {features.map((feature, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedFeature(idx)}
            className="group relative cursor-pointer"
            style={{
              transform: isWhySledgeVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isWhySledgeVisible ? 1 : 0,
              transition: `all 800ms ease-out`,
              transitionDelay: isWhySledgeVisible ? `${500 + idx * 100}ms` : '0ms',
            }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-teal-500/20 border border-white/10">
                  {idx === 0 && <Package className="w-6 h-6 text-blue-400" />}
                  {idx === 1 && <CreditCard className="w-6 h-6 text-green-400" />}
                  {idx === 2 && <Users className="w-6 h-6 text-purple-400" />}
                  {idx === 3 && <TrendingUp className="w-6 h-6 text-orange-400" />}
                  {idx === 4 && <BarChart className="w-6 h-6 text-pink-400" />}
                  {idx === 5 && <ShoppingCart className="w-6 h-6 text-teal-400" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-teal-400 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    {feature.desc}
                  </p>
                  <div className="flex items-center text-purple-400 group-hover:text-teal-400 transition-colors">
                    <span className="text-xs font-medium">Explore feature</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Desktop: Enhanced grid layout */}
    <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className="group relative cursor-pointer h-[280px]"
          style={{
            transform: isWhySledgeVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isWhySledgeVisible ? 1 : 0,
                  transition: `all 800ms ease-out`,
                  transitionDelay: isWhySledgeVisible ? `${500 + idx * 100}ms` : '0ms',
                }}
              >
                <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Glowing orb effect */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500/30 to-teal-500/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-center mb-6">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-teal-500/20 border border-white/10 mr-4 group-hover:scale-110 transition-transform duration-300">
                        {idx === 0 && <Package className="w-8 h-8 text-blue-400" />}
                        {idx === 1 && <CreditCard className="w-8 h-8 text-green-400" />}
                        {idx === 2 && <Users className="w-8 h-8 text-purple-400" />}
                        {idx === 3 && <TrendingUp className="w-8 h-8 text-orange-400" />}
                        {idx === 4 && <BarChart className="w-8 h-8 text-pink-400" />}
                        {idx === 5 && <ShoppingCart className="w-8 h-8 text-teal-400" />}
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-teal-400 transition-all duration-300">
                        {feature.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-300 text-lg leading-relaxed mb-6 flex-grow">
                      {feature.desc}
                    </p>
                    
                    <button
                      type="button"
                      className="flex items-center text-purple-400 group-hover:text-teal-400 transition-colors focus:outline-none group/button"
                      onClick={() => setSelectedFeature(idx)}
                    >
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



        {/* Modal Overlay */}
        {selectedFeature !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-auto"
            onClick={() => setSelectedFeature(null)}
          >
            <div
              className={`mx-auto relative rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-hidden ${
                isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
              } backdrop-blur-xl border border-white/20 shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with close button */}
              <div className="relative p-4 sm:p-6 pb-0">
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-300 group z-10"
                >
                  <svg 
                    className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-red-400 transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable content */}
              <div className="max-h-[90vh] overflow-y-auto px-4 sm:px-6 pb-6">
                {/* Image with gradient overlay */}
                <div className="relative mb-6 sm:mb-8 rounded-2xl overflow-hidden group">
                  <img
                    src={Modalfeatures[selectedFeature].img}
                    alt={Modalfeatures[selectedFeature].title}
                    className="w-full h-48 sm:h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{
                      filter: isDarkMode ? 'brightness(0.85) contrast(1.1)' : 'brightness(0.95)'
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Feature indicator */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <span className="text-white text-xs font-medium">Feature #{selectedFeature + 1}</span>
                  </div>
                </div>

                {/* Title */}
                <div className="mb-6 sm:mb-8">
                  <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-500 to-teal-400`}>
                    {Modalfeatures[selectedFeature].title}
                  </h2>
                  <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full"></div>
                </div>

                {/* Description with enhanced styling */}
                <div className={`relative rounded-2xl p-6 sm:p-8 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50/80'} backdrop-blur-sm border border-white/10`}>
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-4 left-4 w-2 h-2 bg-purple-500 rounded-full animate-pulse opacity-60"></div>
                    <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse opacity-40"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <p className={`text-base sm:text-lg md:text-xl leading-relaxed sm:leading-relaxed ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      {Modalfeatures[selectedFeature].desc}
                    </p>
                  </div>
                  
                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full"></div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                  <button
                    className={`flex-1 px-6 py-3 rounded-xl font-medium border transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                      isDarkMode 
                        ? 'border-white/20 text-white hover:bg-white/10' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedFeature(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}



        {/* AI Section */}
        <section
          ref={pricingRef}
          className={`w-full py-12 md:py-20 px-4 md:px-8 lg:px-12 transition-all duration-1000 ease-out transform ${
            isPricingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          } ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
          style={{
            transitionDelay: isPricingVisible ? '500ms' : '0ms'
          }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Mobile Layout - Stack vertically */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
              
              {/* Left Text Section */}
              <div className="w-full lg:w-5/12 text-center lg:text-left order-2 lg:order-1">
                <div className="max-w-md mx-auto lg:mx-0">
                  {/* Badge */}
                  <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    AI-Powered
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-500 leading-tight">
                    Still Managing
                    <span className="text-blue-600 block">Manually?</span>
                  </h2>
                  
                  {/* Subtitle */}
                  <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                    Innovation meets AI to automate your business processes and drive growth
                  </p>
                  
                  
                  
                  {/* Stats */}
                  <div className="hidden lg:flex items-center gap-8 mt-12">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">95%</div>
                      <div className="text-sm text-gray-500">Automation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">3x</div>
                      <div className="text-sm text-gray-500">Faster</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">24/7</div>
                      <div className="text-sm text-gray-500">Active</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right CardSwap Section */}
              <div className="w-full lg:w-7/12 order-1 lg:order-2 ml-0 md:ml-60 pl-0 md:pl-32 bg-transparent">
                <div className="relative">
                  {/* Mobile: Smaller card container */}
                  <div 
                    className="relative mx-auto lg:mx-0 mb-64 md:mb-0 md:-mt-0 -mt-16"
                    style={{ 
                      height: '400px', 
                      maxWidth: '320px',
                      '@media (min-width: 1024px)': {
                        height: '600px',
                        maxWidth: 'none'
                      }
                    }}
                  >
                    <CardSwap
                      cardDistance={40} // Reduced for mobile
                      verticalDistance={50} // Reduced for mobile
                      delay={2500}
                      pauseOnHover={false}
                    >
                      {/* Card 1 */}
                      <Card>
                        <div className={`rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                          isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
                        }`}>
                          <div className="p-4 sm:p-6 lg:p-8">
                            <div className="flex items-center mb-3">
                              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                              </div>
                              <h3 className="text-lg sm:text-xl font-semibold text-gray-500">
                                Automated Orders
                              </h3>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 mb-4">
                              AI-powered order processing to streamline your workflow
                            </p>
                          </div>
                          <img
                            src="https://www.apple.com/v/watch/br/images/overview/consider/feature_health__b2yo83wkzoaa_small_2x.jpg"
                            alt="Automated Orders"
                            className="w-full h-80 sm:h-64 lg:h-64 object-cover"
                          />
                        </div>
                      </Card>

                      {/* Card 2 */}
                      <Card>
                        <div className={`rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                          isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
                        }`}>
                          <div className="p-4 sm:p-6 lg:p-8">
                            <div className="flex items-center mb-3">
                              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                              </div>
                              <h3 className="text-lg sm:text-xl font-semibold text-gray-500">
                                Smart Insights
                              </h3>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 mb-4">
                              Advanced analytics to help you make data-driven decisions
                            </p>
                          </div>
                          <img
                            src="https://www.apple.com/v/watch/br/images/overview/consider/feature_fitness__b5owsglf0ieu_small_2x.jpg"
                            alt="Smart Insights"
                            className="w-full h-80 sm:h-64 lg:h-64 object-cover"
                          />
                        </div>
                      </Card>

                      {/* Card 3 */}
                      <Card>
                        <div className={`rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                          isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
                        }`}>
                          <div className="p-4 sm:p-6 lg:p-8">
                            <div className="flex items-center mb-3">
                              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                              </div>
                              <h3 className="text-lg sm:text-xl font-semibold text-gray-500">
                                Lead Generation
                              </h3>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 mb-4">
                              Automatic lead capture and qualification system
                            </p>
                          </div>
                          <img
                            src="https://www.apple.com/v/watch/br/images/overview/consider/feature_connectivity__cwtqydvy2laq_small.jpg"
                            alt="Lead Generation"
                            className="w-full h-80 sm:h-64 lg:h-64 object-cover"
                          />
                        </div>
                      </Card>

                      {/* Card 4 */}
                      <Card>
                        <div className={`rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                          isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
                        }`}>
                          <div className="p-4 sm:p-6 lg:p-8">
                            <div className="flex items-center mb-3">
                              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                              </div>
                              <h3 className="text-lg sm:text-xl font-semibold text-gray-500">
                                Smart Inventory
                              </h3>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 mb-4">
                              AI-powered inventory management and forecasting
                            </p>
                          </div>
                          <img
                            src="https://www.apple.com/v/watch/br/images/overview/consider/feature_health__b2yo83wkzoaa_small_2x.jpg"
                            alt="Smart Inventory"
                            className="w-full h-80 sm:h-64 lg:h-64 object-cover"
                          />
                        </div>
                      </Card>
                    </CardSwap>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile stats - shown only on mobile */}
            <div className="flex lg:hidden justify-center items-center gap-8 mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">95%</div>
                <div className="text-xs text-gray-500">Automation</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">3x</div>
                <div className="text-xs text-gray-500">Faster</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">24/7</div>
                <div className="text-xs text-gray-500">Active</div>
              </div>
            </div>
          </div>
        </section>



        {/* Pricing Section */}
        <section className={`px-4 md:mt-8 mt-4 md:pt-40 pt-20 md:ml-0 ml-0 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-12 md:mt-0 mt-8">
            
            {/* Left Section - Pricing Card */}
            <div className="w-full lg:w-1/2 md:w-1/2 lg:pt-16 md:pt-16 pt-0">
              <div className={`rounded-3xl shadow-xl p-6 md:p-10 hover:shadow-2xl transition duration-300 ${
                isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-200 border border-gray-200'
              }`}>
                
                {/* Price */}
                <div className="flex justify-center items-end gap-2 mb-4">
                  <span className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}>
                    ₹99
                  </span>
                  <span className={`text-sm md:text-base mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    /month
                  </span>
                </div>
                
                {/* Features */}
                <ul className={`text-sm md:text-base space-y-3 md:space-y-4 mb-6 md:mb-10 text-center px-2 md:pr-8 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <li>• Unlimited access to all features</li>
                  <li>• AI-powered automation tools</li>
                  <li>• 24/7 support & updates</li>
                  <li>• Instant onboarding</li>
                </ul>
                
                {/* CTA Button */}
                <div className="flex justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-lg px-6 md:px-4 py-3 rounded-full transition duration-300 shadow-md hover:shadow-lg w-full md:w-1/3 max-w-xs">
                    Get Started Now
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Section - Text */}
            <div className="w-full lg:w-1/2 text-center lg:text-left md:text-left pt-4 md:pt-40 lg:pt-16 px-2 md:px-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight">
                Low on Margins,
              </h2>
              <p className="text-xl md:text-2xl mb-4 md:mb-6">
                We care too..
              </p>
              <p className={`text-sm md:text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Whether you're scaling your business or just starting out, got you covered.
              </p>
            </div>
          </div>
        </section>




    {/* Highlight Section */}
    <section className={`w-full py-8 md:py-16 md:pt-40 pt-20 px-4 md:pl-8 md:-ml-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-[95%] md:max-w-[90%] mx-auto md:h-[80vh] min-h-[70vh] flex flex-col md:flex-row lg:flex-row gap-4 md:gap-8">
        
        {/* Left Subsection */}
        <div className={`w-full lg:w-1/2 relative rounded-2xl md:rounded-3xl overflow-hidden flex items-start justify-center p-4 md:p-6 lg:p-10 min-h-[300px] md:min-h-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          {/* Text content (top 40%) */}
          <div className="z-10 w-full text-center mt-2 md:mt-8">
            <h3 className={`text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight leading-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Built for Modern World
            </h3>
            <p className={`mt-2 text-sm md:text-base mb-2 px-2 md:px-0 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Experience design and efficiency like never before.
            </p>
          </div>
          
          {/* Background image at bottom 60% */}
          <div
            className="absolute bottom-0 left-0 w-full h-[60%] md:h-[70%] z-0"
            style={{
              backgroundImage: `url('https://www.apple.com/v/watch/br/images/overview/essentials/banner_bands__cd5m1690azaq_medium.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
        </div>
        
        {/* Right Subsection */}
        <div
          className="w-full lg:w-1/2 relative rounded-2xl md:rounded-3xl overflow-hidden flex items-center justify-center p-4 md:p-6 lg:p-10 min-h-[300px] md:min-h-0"
          style={{
            backgroundImage: `url('https://www.apple.com/v/watch/br/images/overview/essentials/banner_airpods__dc2h7dg71l0m_large.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: isDarkMode ? '#1f2937' : '#e5e7eb' // Tailwind: gray-800 / gray-200
          }}
        >
          {/* Overlay for better text readability on mobile */}
          <div className="absolute inset-0 bg-black bg-opacity-20 md:bg-opacity-0 z-0"></div>
          
          <div className="bg-white bg-opacity-80 md:bg-transparent rounded-xl px-4 md:px-6 py-3 md:py-2 text-center mb-8 md:mb-16 z-10 backdrop-blur-sm md:backdrop-blur-none">
            <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight ${
              isDarkMode ? 'text-gray-900' : 'text-gray-900'
            }`}>
              Security at Peak
            </h3>
            <p className={`mt-2 md:mt-3 mb-4 md:mb-16 text-sm md:text-base lg:text-lg ${
              isDarkMode ? 'text-gray-700' : 'text-gray-700'
            }`}>
              AI powered Security mechanism
            </p>
          </div>
        </div>
      </div>
    </section>


      {/* Testimonials */}
      <section className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} px-4 py-20`}>
        <div className="max-w-6xl mx-auto">
          
          {/* Section Heading */}
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-16 text-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            What People Say
          </h2>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className={`rounded-3xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 text-gray-200'
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                {/* Avatar and Name */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className={`text-sm font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {t.name}
                    </div>
                    <div className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {t.role}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <p className={`text-sm leading-relaxed italic mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  “{t.quote}”
                </p>

                {/* Star Rating */}
                <div className="flex items-center">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.487 6.91l6.562-.955L10 0l2.951 5.955 6.562.955-4.757 4.635 1.122 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      
        {/* Subscribe to Newsletter Section */}
        <section 
          ref={newsletterRef}
          className={`relative min-h-screen py-20 overflow-hidden ${
            isDarkMode ? 'bg-black' : 'bg-white'
          }`}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Dynamic Gradient Orbs */}
            <div 
              className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"
              style={{
                top: '20%',
                left: '10%',
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            />
            <div 
              className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"
              style={{
                top: '60%',
                right: '15%',
                animationDelay: '1s',
                transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            />
            <div 
              className="absolute w-64 h-64 bg-gradient-to-r from-violet-500/25 to-indigo-500/25 rounded-full blur-3xl animate-pulse"
              style={{
                top: '40%',
                left: '50%',
                animationDelay: '2s',
                transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            />
            
            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${isDarkMode ? 'bg-white/20' : 'bg-black/10'} animate-pulse`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 1}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>

          {/* Newsletter Content */}
          <div
            className={`relative z-10 w-full flex flex-col items-center justify-center text-center px-4 md:px-8 transition-all duration-1000 ease-out transform ${
              isNewsletterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
            }`}
            style={{
              transitionDelay: isNewsletterVisible ? '200ms' : '0ms'
            }}
          >
            <div className="max-w-6xl mx-auto space-y-12">
              {/* Hero Text */}
              <div className="space-y-8">
                <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Newsletter
                  </span>
                </div>
                
                <h2 className={`text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight transition-all duration-700 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <span className="block">Subscribe to </span>
                  <span className="block bg-gradient-to-r from-blue-600 via-blue-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                    Sledge
                  </span>
                  <span className="block text-xl md:text-3xl lg:text-4xl font-light mt-4 opacity-70">
                    Stay ahead of tomorrow
                  </span>
                </h2>
                
                <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Exclusive insights, breakthrough innovations, and the future of business.
                  <span className="block mt-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-medium">
                    Delivered with precision.
                  </span>
                </p>
              </div>

              {/* Tally Form Container */}
              <div className={`relative max-w-3xl mx-auto p-8 md:p-12 rounded-3xl backdrop-blur-2xl transition-all duration-500 hover:scale-105 overflow-hidden${
                isDarkMode 
                  ? 'bg-white/5 border border-white/10 shadow-2xl shadow-purple-500/10' 
                  : 'bg-black/5 border border-black/10 shadow-2xl shadow-black/10'
              }`}>
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Tally Form Embed */}
                <div className="relative z-10">
                  <div className="overflow-hidden rounded-2xl">
                    <iframe
                      src="https://tally.so/embed/3yAaYx?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                      width="100%"
                      height="600"
                      frameBorder="0"
                      marginHeight="0"
                      marginWidth="0"
                      title="Newsletter Subscription"
                      className="w-full min-h-[400px] transition-all duration-300"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '1rem',
                        overflow:"hidden"
                      }}
                    ></iframe>
                  </div>
                  
                  {/* Custom Overlay for Enhanced Design */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Subtle gradient overlay */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-5 ${
                      isDarkMode ? 'from-purple-400/20 to-blue-400/20' : 'from-purple-500/10 to-blue-500/10'
                    }`}></div>
                    
                    {/* Corner accent elements */}
                    <div className="absolute top-4 left-4 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 animate-pulse"></div>
                    <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-40 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full opacity-35 animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-4 right-4 w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1.5s'}}></div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>

              {/* Trust Indicators */}
              <div className={`flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Unsubscribe anytime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Premium content</span>
                </div>
              </div>
              
              {/* Enhanced CTA Section */}
              <div className="space-y-6">
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'
                }`}>
                  <ArrowRight className="w-4 h-4" />
                  <span>Join 10,000+ innovators already subscribed</span>
                </div>
                
                <p className={`text-sm max-w-2xl mx-auto leading-relaxed ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  By subscribing, you agree to receive our newsletter and promotional emails. 
                  You can unsubscribe at any time. We respect your privacy and never share your data.
                </p>
              </div>
            </div>
          </div>
        </section>
          </div>

  );
}