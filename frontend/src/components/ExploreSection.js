import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const ExploreSection = () => { // Removed isDarkMode from props to manage it internally
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [selectedCard, setSelectedCard] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false); // Corrected useState declaration for isDarkMode

  const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
  };

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView]);

  // Handle scroll progress and current card tracking
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollLeft = container.scrollLeft;

        // Calculate current card based on scroll position
        const cardWidth = isMobile ? window.innerWidth * 0.75 : window.innerWidth * 0.22;
        const spacing = isMobile ? 16 : 32;
        const currentIndex = Math.round(scrollLeft / (cardWidth + spacing));
        setCurrentCardIndex(Math.min(Math.max(currentIndex, 0), cards.length - 1));
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const cards = [
    {
      img: "https://www.apple.com/v/iphone/home/cb/images/overview/consider/apple_intelligence__gbh77cvflkia_large.jpg",
      title: "Shop",
      description: "Discover our curated collection of premium products. Browse through categories, find the perfect items, and enjoy a seamless shopping experience with personalized recommendations."
    },
    {
      img: "https://www.apple.com/v/iphone/home/cb/images/overview/consider/camera__exi2qfijti0y_large.jpg",
      title: "Inventory",
      description: "Real-time inventory management with smart tracking. Monitor stock levels, receive alerts for low inventory, and optimize your supply chain with our advanced analytics."
    },
    {
      img: "https://www.apple.com/v/iphone/home/cb/images/overview/consider/privacy__ckc0wa30o55y_large_2x.jpg",
      title: "Orders",
      description: "Streamlined order processing and tracking. From placement to delivery, manage every aspect of your orders with our comprehensive order management system."
    },
    {
      img: "https://www.apple.com/v/iphone/home/cb/images/overview/consider/safety__bwp7rsowtjiu_large.jpg",
      title: "Shelf",
      description: "Organize and optimize your product display. Smart shelf management with automated restocking suggestions and visual merchandising tools."
    },
    {
      img: "https://www.apple.com/v/iphone/home/cb/images/overview/consider/apple_intelligence__gbh77cvflkia_large.jpg",
      title: "You",
      description: "Your personalized dashboard and profile. Access your preferences, order history, saved items, and customize your experience to match your unique needs."
    }
  ];

  const containerVariants = {
    hidden: { y: 50 },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.25,
        duration: 0.8,
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, scale: 0.98 },
    visible: {
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 22
      }
    }
  };

  const handleCardClick = (idx) => {
    setSelectedCard(idx);
    setIsExpanded(true);
  };

  const handleCloseExpanded = () => {
    setIsExpanded(false);
    setTimeout(() => setSelectedCard(null), 300);
  };

  const scrollToCard = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = isMobile ? window.innerWidth * 0.75 : window.innerWidth * 0.22;
      const spacing = isMobile ? 16 : 32;
      const scrollPosition = index * (cardWidth + spacing);
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToNext = () => {
    if (currentCardIndex < cards.length - 1) {
      scrollToCard(currentCardIndex + 1);
    }
  };

  const scrollToPrev = () => {
    if (currentCardIndex > 0) {
      scrollToCard(currentCardIndex - 1);
    }
  };

  const isMobile = useIsMobile();

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


  return (
    <>
      <motion.section
        ref={sectionRef}
        className="w-full relative z-30 flex flex-col items-center pt-24"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <h2 className="text-5xl font-eudoxus font-bold tracking-tight mb-8 text-left w-full px-4 md:pl-16">
          Explore Our Platform
        </h2>

        <motion.div
          ref={scrollContainerRef}
          className="w-full h-[70vh] overflow-x-auto flex space-x-4 md:space-x-8 px-4 md:px-8 py-8 ml-24"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            overflowY: "hidden",
          }}
        >
          {cards.map((card, idx) => {
            return (
              <motion.div
                key={idx}
                className="flex-shrink-0 rounded-3xl shadow-lg flex items-center justify-center overflow-hidden relative cursor-pointer"
                onClick={() => handleCardClick(idx)}
                variants={cardVariants}
                style={{
                  width: isMobile ? "75vw" : "22vw",
                  height: isMobile ? "70vh" : "95vh",
                  scrollSnapAlign: "start",
                  zIndex: 1
                }}
              >
                <img
                  src={card.img}
                  className="object-cover w-full h-full rounded-3xl"
                  draggable={false}
                  loading="lazy"
                />

                {/* Overlay text */}
                <div className="absolute top-0 left-0 p-5 z-10 text-white drop-shadow-lg">
                  <div className="font-eudoxus text-3xl font-bold tracking-tight">
                    {card.title}, 
                    <div className="font-eudoxus text-sm font-bold tracking-tight text-blue-400">
                    Click to know more
                  </div>
                  </div>

                  <div className="text-base font-medium text-blue-200">
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Expanded Card Modal */}
        <AnimatePresence>
          {isExpanded && selectedCard !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={handleCloseExpanded}
            >
              {/* Background blur overlay */}
              <motion.div
                className="absolute inset-0 bg-black/30 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />

              {/* Expanded card */}
              <motion.div
                className="relative w-[90vw] max-w-4xl h-[80vh] rounded-3xl overflow-hidden shadow-2xl"
                initial={{
                  scale: 0.8,
                  opacity: 0,
                  y: 50
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  scale: 0.8,
                  opacity: 0,
                  y: 50
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.6
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Background image with blur */}
                <div className="absolute inset-0">
                  <img
                    src={cards[selectedCard].img}
                    alt={cards[selectedCard].title}
                    className="object-cover w-full h-full filter blur-sm scale-105"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  {/* Header */}
                  <div className="text-white">
                    <motion.h3
                      className="font-eudoxus text-5xl font-bold tracking-tight mb-4"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {cards[selectedCard].title}
                    </motion.h3>
                    <motion.p
                      className="text-xl text-blue-200 mb-8"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                    </motion.p>
                  </div>

                  {/* Text box */}
                  <motion.div
                    className="bg-gray-300 backdrop-blur-xl rounded-3xl p-8"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 0.4,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">
                      The {cards[selectedCard].title} Section
                    </h4>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {cards[selectedCard].description}
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-col items-center gap-4 mt-6">
                      <button
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full hover:from-blue-600 hover:to-teal-600 transition-all duration-200 font-medium shadow-lg"
                        onClick={handleCloseExpanded}
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

        {/* Apple Animation */}
                <AnimatePresence>
                  {isInView && (
                    <motion.div
                      className="fixed bottom-6 left-0 right-0 z-40 flex justify-center rounded-full"
                      initial={{ opacity: 0, y: 100, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 100, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        duration: 0.8,
                      }}
                    >
                      <div
                        className="
                          backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-6 py-0 pt-2 
                          shadow-2xl shadow-black/20 transition-all duration-300
                          supports-[backdrop-filter]:bg-white/10
                        "
                        style={{
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        }}
                      >
                        <div className="flex items-center space-x-6">
                          {/* Previous Button */}
                          <motion.button
                            onClick={scrollToPrev}
                            disabled={currentCardIndex === 0}
                            className={`
                              flex items-center space-x-2 px-3 py-1.5 rounded-xl font-medium transition-all duration-300
                              ${
                                currentCardIndex === 0
                                  ? "text-white/40 cursor-not-allowed"
                                  : "text-white bg-white/20 hover:bg-white/30 active:bg-white/40 shadow-md hover:shadow-lg"
                              }
                            `}
                            whileHover={currentCardIndex > 0 ? { scale: 1.05, y: -1 } : {}}
                            whileTap={currentCardIndex > 0 ? { scale: 0.95 } : {}}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                              />
                            </svg>
                            <span className="text-sm font-semibold">Prev</span>
                          </motion.button>

                          {/* Center Info */}
                          <div className="flex flex-col items-center space-y-2">
                            {/* Card indicators */}
                            <div className="flex space-x-2">
                              {cards.map((_, index) => (
                                <motion.button
                                  key={index}
                                  className={`
                                    w-2 h-2 rounded-full transition-all duration-300
                                    ${
                                      index === currentCardIndex
                                        ? "bg-white shadow-lg shadow-white/30"
                                        : "bg-white/40 hover:bg-white/60"
                                    }
                                  `}
                                  onClick={() => scrollToCard(index)}
                                  whileHover={{ scale: 1.3 }}
                                  whileTap={{ scale: 0.8 }}
                                />
                              ))}
                            </div>

                            {/* Current card info */}
                            <div className="text-center">
                              <div className="text-sm font-semibold text-white/90">
                                {cards[currentCardIndex]?.title}
                              </div>
                              <div className="text-xs font-medium text-white/60">
                                {currentCardIndex + 1} of {cards.length}
                              </div>
                            </div>
                          </div>

                          {/* Next Button */}
                          <motion.button
                            onClick={scrollToNext}
                            disabled={currentCardIndex === cards.length - 1}
                            className={`
                              flex items-center space-x-2 px-3 py-1.5 rounded-xl font-medium transition-all duration-300
                              ${
                                currentCardIndex === cards.length - 1
                                  ? "text-white/40 cursor-not-allowed"
                                  : "text-white bg-white/20 hover:bg-white/30 active:bg-white/40 shadow-md hover:shadow-lg"
                              }
                            `}
                            whileHover={
                              currentCardIndex < cards.length - 1 ? { scale: 1.05, y: -1 } : {}
                            }
                            whileTap={currentCardIndex < cards.length - 1 ? { scale: 0.95 } : {}}
                          >
                            <span className="text-sm font-semibold">Next</span>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

    </>
  );
};

export default ExploreSection;