import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/navBarLogo1.png";
import { Layers, Menu, X } from "lucide-react";

export default function Navbar({ onLoginClick }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [shake, setShake] = useState(false);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const closeTimeout = useRef(null);

  // The toggleDropdown function is no longer needed for desktop hover functionality
  // but is kept for the mobile click functionality.
  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null); // Close any open dropdowns when toggling mobile menu
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Show/hide logic
          if (currentY < lastScrollY || currentY < 10) {
            setShowNavbar(true);
          } else {
            setShowNavbar(false);
            closeDropdowns(); // Close dropdowns when scrolling down
          }
          setLastScrollY(currentY);
          // At top logic
          const atTop = currentY < 10;
          if (atTop !== isAtTop) {
            setIsAtTop(atTop);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [lastScrollY, isAtTop]);

  // Dynamic background and blur for navbar
  const navBg = (isAtTop && !openDropdown && !isMobileMenuOpen)
    ? "transparent"
    : "rgb(15 23 42 / 0.95)"; // Solid dark slate color with 95% opacity on scroll

  
  const navBlur = (isAtTop && !openDropdown && !isMobileMenuOpen)
    ? "blur(0px)"
    : "blur(12px)";
  // Animation classes
  const baseNavClass =
    "fixed top-0 left-0 w-full z-50 p-4 transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)]";
  const vanishClass = !showNavbar
    ? "opacity-0 -translate-y-16 pointer-events-none"
    : "opacity-100 translate-y-0 pointer-events-auto";
  const shakeClass = shake
    ? "animate-navbar-shake"
    : "";
  
    const handleMouseEnter = () => {
    clearTimeout(closeTimeout.current);
    setOpenDropdown("vision");
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150); // slight delay prevents flicker
  };
      
  return (
    <>
      <style>
        {`
        @keyframes navbar-shake {
          0% { transform: translateY(0); }
          20% { transform: translateY(-2px) rotate(-1deg);}
          40% { transform: translateY(2px) rotate(1deg);}
          60% { transform: translateY(-1px) rotate(-1deg);}
          80% { transform: translateY(1px) rotate(1deg);}
          100% { transform: translateY(0); }
        }
        .animate-navbar-shake {
          animation: navbar-shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        `}
      </style>
      <nav
        ref={navbarRef}
        className={`${baseNavClass} ${vanishClass} ${shakeClass}`}
        style={{
          paddingLeft: "calc(1.5rem + 2.5vw)",
          paddingRight: "calc(1.5rem + 2.5vw)",
          background: navBg,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          boxShadow: (isAtTop && !openDropdown && !isMobileMenuOpen)
            ? "none"
            : "0 4px 32px 0 rgba(15,23,42,0.13)",
          borderBottom: "none",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
          transition: "background 0.7s cubic-bezier(.4,0,.2,1), backdrop-filter 0.7s cubic-bezier(.4,0,.2,1), box-shadow 0.7s cubic-bezier(.4,0,.2,1), border-radius 0.7s cubic-bezier(.4,0,.2,1), padding 0.7s cubic-bezier(.4,0,.2,1), opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)"
        }}
      >
        <div className="w-full flex items-center justify-between px-[17px]">
          {/* Desktop: Dropdowns left, login center, logo right */}
          <div className="hidden lg:flex flex-1 items-center space-x-6">
            {/* Vision Dropdown on Hover */}
            <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button
                className={`text-white text-lg font-bold transition font-inter ${
                  openDropdown === "vision" ? "-translate-y-1 text-blue-400" : "hover:text-blue-400"
                }`}
                style={{
                  fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'",
                  fontWeight: 700,
                  background: "none",
                  boxShadow: "none",
                  color: "#fff"
                }}
              >
                Vision
              </button>
              {openDropdown === "vision" && (
                <div className="absolute left-0 flex pt-8 flex-col shadow-lg rounded-md py-2 z-60 min-w-48"
                 style={{
                  background: "rgb(15 23 42 / 0.65)", // semi-transparent for blur to show
                }}
                >
                  <Link
                    to="/vision/goals"
                    className="px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap font-light"
                    style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                    onClick={closeDropdowns}
                  >
                    Our Goals
                  </Link>
                  <Link
                    to="/vision/founders"
                    className="px-4 py-2 text-white hover:bg-gray-700  whitespace-nowrap font-light"
                    style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                    onClick={closeDropdowns}
                  >
                    Founders
                  </Link>
                  <Link
                    to="/vision/investors"
                    className="px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap font-light"
                    style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                    onClick={closeDropdowns}
                  >
                    Investors
                  </Link>
                </div>
              )}
            </div>

            {/* Support Dropdown on Hover */}
            <div className="relative" onMouseEnter={() => setOpenDropdown("support")} onMouseLeave={() => setOpenDropdown(null)}>
              <button
                className={`text-white text-lg font-bold transition font-inter ${
                  openDropdown === "support" ? "-translate-y-1 text-blue-400" : "hover:text-blue-400"
                }`}
                style={{
                  fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'",
                  fontWeight: 700,
                  background: "none",
                  boxShadow: "none",
                  color: "#fff"
                }}
              >
                Support
              </button>
              {openDropdown === "support" && (
                <div className="absolute left-0 flex flex-col pt-8 shadow-lg rounded-md py-2 z-60 min-w-48"
                  style={{
                   background: "rgb(15 23 42 / 0.65)",
                    boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)"
                  }}
                >
                  <Link
                    to="/support/tracking"
                    className="px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap font-light"
                    style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                    onClick={closeDropdowns}
                  >
                    Tracking
                  </Link>
                  <Link
                    to="/support/grievances"
                    className="px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap font-light"
                    style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                    onClick={closeDropdowns}
                  >
                    Grievances
                  </Link>
                  <Link
                    to="/support/contact-us"
                    className="px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap font-light"
                    style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                    onClick={closeDropdowns}
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </div>

            {/* Services Dropdown on Hover */}
            <div className="relative" onMouseEnter={() => setOpenDropdown("services")} onMouseLeave={() => setOpenDropdown(null)}>
              <button
                className={`text-white text-lg font-bold transition font-inter ${
                  openDropdown === "services" ? "-translate-y-1 text-blue-400" : "hover:text-blue-400"
                }`}
                style={{
                  fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'",
                  fontWeight: 700,
                  background: "none",
                  boxShadow: "none",
                  color: "#fff"
                }}
              >
                Services
              </button>
              {openDropdown === "services" && (
                <div className="absolute left-0 flex flex-col shadow-lg rounded-md py-2 z-60 min-w-64"
                  style={{
                    background: "rgb(15 23 42 / 0.65)",
                    boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)"
                  }}
                >
                  <Link
                    to="/services/inventory-management"
                    className="px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap font-light"
                    style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                    onClick={closeDropdowns}
                  >
                    Inventory Management
                  </Link>
                  <Link
                    to="/services/billing-credit-management"
                    className="px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap font-light"
                    style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                    onClick={closeDropdowns}
                  >
                    Billing and Credit Management
                  </Link>
                  <Link
                    to="/services/customer-automation"
                    className="px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap font-light"
                    style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                    onClick={closeDropdowns}
                  >
                    Customer Automation
                  </Link>
                  <Link
                    to="/services/supply-chain-optimizations"
                    className="px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap font-light"
                    style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                    onClick={closeDropdowns}
                  >
                    Supply Chain Optimizations
                  </Link>
                  <Link
                    to="/services/ai-driven-analytics"
                    className="px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap font-light"
                    style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                    onClick={closeDropdowns}
                  >
                    AI Driven Analytics
                  </Link>
                </div>
              )}
            </div>

            {/* Partners Dropdown on Hover */}
            <div className="relative" onMouseEnter={() => setOpenDropdown("partners")} onMouseLeave={() => setOpenDropdown(null)}>
              <button
                className={`text-white text-lg font-bold transition font-inter ${
                  openDropdown === "partners" ? "-translate-y-1 text-blue-400" : "hover:text-blue-400"
                }`}
                style={{
                  fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'",
                  fontWeight: 700,
                  background: "none",
                  boxShadow: "none",
                  color: "#fff"
                }}
              >
                Partners
              </button>
              {openDropdown === "partners" && (
                <div className="absolute left-0 flex flex-col shadow-lg rounded-md py-2 z-60 min-w-48"
                  style={{
                   background: "rgb(15 23 42 / 0.65)",
                    boxShadow: "none"
                  }}
                >
                  <Link
                    to="/partners/retailers"
                    className="px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap font-light"
                    style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                    onClick={closeDropdowns}
                  >
                    Retailers
                  </Link>
                  <Link
                    to="/partners/distributors"
                    className="px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap font-light"
                    style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                    onClick={closeDropdowns}
                  >
                    Distributors
                  </Link>
                  <Link
                    to="/partners/delivery-partners"
                    className="px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap font-light"
                    style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                    onClick={closeDropdowns}
                  >
                    Delivery Partners
                  </Link>
                </div>
              )}
            </div>
            
            {/* Login Button */}
            <button
              onClick={() => navigate("/login")}
              className="px-10 py-3 border border-white text-white rounded-full bg-transparent bg-opacity-0 backdrop-blur-sm font-bold transition hover:bg-opacity-20"
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'",
                fontWeight: 700,
                boxShadow: "0 2px 16px 0 rgba(0,0,0,0.10)"
              }}
            >
              Login
            </button>
          </div>

          {/* Desktop: Logo right */}
          <div className="hidden lg:flex flex-shrink-0 ml-auto">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Mobile: Logo left, login + menu right */}
          <div className="flex w-full items-center justify-between lg:hidden">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Logo" className="h-12 w-auto" />
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={onLoginClick}
                className="px-6 py-3 border border-white text-white rounded-full bg-transparent bg-opacity-0 font-medium transition hover:bg-opacity-20"
                style={{
                  fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'",
                  fontWeight: 700,
                  boxShadow: "0 2px 16px 0 rgba(0,0,0,0.10)"
                }}
              >
                Login
              </button>
              <button
                onClick={toggleMobileMenu}
                className="bg-transparent text-white p-2 rounded-3xl shadow-lg hover:bg-gray-500"
              >
                {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden mt-4 border-gray-200 z-60 transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
            style={{
              background:
                "rgb(15 23 42 / 0.45)",
              transition: "background 0.2s cubic-bezier(.4,0,.2,1)"
            }}
          >
            <div className="py-2 space-y-1">
              {/* Example for Vision Mobile */}
              <div>
                <button
                  onClick={() => toggleDropdown("vision")}
                  className="w-full text-left px-4 py-3 text-white font-bold transition"
                  style={{
                    background: openDropdown === "vision" ? "rgba(20,30,48,0.85)" : "rgba(20,30,48,0.35)",
                    fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'",
                    fontWeight: 700
                  }}
                >
                  Vision
                </button>
                {openDropdown === "vision" && (
                  <div style={{ background: "transparent" }} className="pl-8 rounded-b-md">
                    <Link
                      to="/vision/goals"
                      className="block px-4 py-2 text-white hover:bg-gay-700 font-light rounded"
                      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                      onClick={closeMobileMenu}
                    >
                      Our Goals
                    </Link>
                    <Link
                      to="/vision/founders"
                      className="block px-4 py-2 text-white hover:bg-gay-700  font-light rounded"
                      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                      onClick={closeMobileMenu}
                    >
                      Founders
                    </Link>
                    <Link
                      to="/vision/investors"
                      className="block px-4 py-2 text-white hover:bg-gay-700  font-light rounded"
                      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                      onClick={closeMobileMenu}
                    >
                      Investors
                    </Link>
                  </div>
                )}
              </div>

              {/* Support Mobile */}
              <div>
                <button
                  onClick={() => toggleDropdown("support")}
                  className="w-full text-left px-4 py-3 text-white font-bold transition"
                  style={{
                    background: openDropdown === "support" ? "rgba(20,30,48,0.85)" : "rgba(20,30,48,0.35)",
                    fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'",
                    fontWeight: 700
                  }}
                >
                  Support
                </button>
                {openDropdown === "support" && (
                  <div style={{ background: "transparent" }} className="pl-8 rounded-b-md">
                    <Link
                      to="/support/tracking"
                      className="block px-4 py-2 text-white hover:bg-gay-700  font-light rounded"
                      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                      onClick={closeMobileMenu}
                    >
                      Tracking
                    </Link>
                    <Link
                      to="/support/grievances"
                      className="block px-4 py-2 text-white hover:bg-gay-700  font-light rounded"
                      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                      onClick={closeMobileMenu}
                    >
                      Grievances
                    </Link>
                    <Link
                      to="/support/contact-us"
                      className="block px-4 py-2 text-white hover:bg-gay-700  font-light rounded"
                      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                      onClick={closeMobileMenu}
                    >
                      Contact Us
                    </Link>
                  </div>
                )}
              </div>

              {/* Services Mobile */}
              <div>
                <button
                  onClick={() => toggleDropdown("services")}
                  className="w-full text-left px-4 py-3 text-white font-bold transition"
                  style={{
                    background: openDropdown === "services" ? "rgba(20,30,48,0.85)" : "rgba(20,30,48,0.35)",
                    fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'",
                    fontWeight: 700
                  }}
                >
                  Services
                </button>
                {openDropdown === "services" && (
                  <div style={{ background: "transparent" }} className="pl-8 rounded-b-md">
                    <Link
                      to="/services/inventory-management"
                      className="block px-4 py-2 text-white hover:bg-gay-700  font-light rounded"
                      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                      onClick={closeMobileMenu}
                    >
                      Inventory Management
                    </Link>
                    <Link
                      to="/services/billing-credit-management"
                      className="block px-4 py-2 text-white hover:bg-gay-700  font-light rounded"
                      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                      onClick={closeMobileMenu}
                    >
                      Billing and Credit Management
                    </Link>
                    <Link
                      to="/services/customer-automation"
                      className="block px-4 py-2 text-white hover:bg-gay-700  font-light rounded"
                      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                      onClick={closeMobileMenu}
                    >
                      Customer Automation
                    </Link>
                    <Link
                      to="/services/supply-chain-optimizations"
                      className="block px-4 py-2 text-white hover:bg-gay-700  font-light rounded"
                      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                      onClick={closeMobileMenu}
                    >
                      Supply Chain Optimizations
                    </Link>
                    <Link
                      to="/services/ai-driven-analytics"
                      className="block px-4 py-2 text-white hover:bg-gay-700  font-light rounded"
                      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                      onClick={closeMobileMenu}
                    >
                      AI Driven Analytics
                    </Link>
                  </div>
                )}
              </div>

              {/* Partners Mobile */}
              <div>
                <button
                  onClick={() => toggleDropdown("partners")}
                  className="w-full text-left px-4 py-3 text-white font-bold transition"
                  style={{
                    background: openDropdown === "partners" ? "rgba(20,30,48,0.85)" : "rgba(20,30,48,0.35)",
                    fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'",
                    fontWeight: 700
                  }}
                >
                  Partners
                </button>
                {openDropdown === "partners" && (
                  <div style={{ background: "trasparent" }} className="pl-8 rounded-b-md">
                    <Link
                      to="/partners/retailers"
                      className="block px-4 py-2 text-white hover:bg-gay-700  font-light rounded"
                      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                      onClick={closeMobileMenu}
                    >
                      Retailers
                    </Link>
                    <Link
                      to="/partners/distributors"
                      className="block px-4 py-2 text-white hover:bg-gay-700  font-light rounded"
                      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                      onClick={closeMobileMenu}
                    >
                      Distributors
                    </Link>
                    <Link
                      to="/partners/delivery-partners"
                      className="block px-4 py-2 text-white hover:bg-gay-700  font-light rounded"
                      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'", fontWeight: 300 }}
                      onClick={closeMobileMenu}
                    >
                      Delivery Partners
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}