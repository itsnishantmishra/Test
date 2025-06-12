import { motion } from "framer-motion";
import { BarChart, CreditCard, Package, ShoppingCart, TrendingUp, Users } from "lucide-react";
import Footer from "../components/Footer"; // <-- Import your existing Footer
import kiranaShop from "../assets/Kirana_Shop.webp"; // <-- Add this import at the top
import SplitText from "./SplitText";
import TruckIntro from "./TruckIntro";
import Home1 from "../assets/Home1.png";
import Home2 from "../assets/Home2.jpg";
import Home3 from "../assets/Home3.jpeg";
import Home4 from "../assets/Home4.jpg";
import Home5 from "../assets/Home5.jpg";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section
        className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden p-0 m-0"
        style={{ height: "100vh" }}
      >
        {/* Fullscreen Video - only covers the hero section */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          style={{ minHeight: "100vh", minWidth: "100vw" }}
        >
          <source src="https://www.onelineage.com/sites/default/files/2023-05/main_page_032323_web.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Subtle dark gradient overlay from left */}
        <div
          className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(20,30,48,0.7) 40%, rgba(20,30,48,0.2) 70%, rgba(20,30,48,0) 100%)",
            minHeight: "100vh",
            minWidth: "100vw"
          }}
        />
        {/* Content aligned to left and above the video */}
        <div className="max-w-4xl relative z-20 flex flex-col items-start px-6 md:px-12 ml-16 md:ml-8">
          <SplitText
            text="Bridging Retailers"
            className="text-5xl py-2 md:text-7xl font-light text-white md:tracking-tight text-left"
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
            className="text-5xl py-2 md:text-7xl font-light text-white md:tracking-tight text-left"
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
            text="Empowering retailers with seamless inventory,"
            className="text-1xl py-2 md:text-3xl font-light text-white md:tracking-tight text-left"
            delay={20}
            duration={0.5}
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
            text="billing, and business growth solutions."
            className="text-1xl py-2 md:text-3xl font-light text-white md:tracking-tight text-left"
            delay={20}
            duration={0.5}
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
            className="mt-8 px-10 py-3 border border-white text-white rounded-md bg-white bg-opacity-0 backdrop-sm font-medium transition hover:bg-opacity-20 text-bold"
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif' 'bold'",
              fontWeight: 400,
              boxShadow: "0 2px 16px 0 rgba(0,0,0,0.10)"
            }}
          >
            Learn more
          </button>
        </div>
      </section>
      {/* --- TruckIntro Animation Section (full width, below video) --- */}
      <section className="w-full bg-white relative z-30" style={{ minHeight: "40px" }}>
        <div className="flex justify-center items-center w-full py-">
          <TruckIntro />
        </div>
      </section>
      
      {/* --- Fullscreen Scrollable Rounded Rectangles Section --- */}
      <section className="w-full relative z-30">
        <div
          className="w-full h-screen overflow-x-auto flex space-x-4 md:space-x-8 px-4 md:px-8 py-8"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {[Home1, Home2, Home3, Home4, Home5].map((img, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 bg-gray-100 rounded-3xl shadow-lg flex items-center justify-center overflow-hidden relative"
              style={{
                width: "33vw",
                minWidth: "33vw",
                maxWidth: "33vw",
                height: "70vh",
                scrollSnapAlign: "start",
                marginRight: idx === 4 ? "-8vw" : "0",
                zIndex: idx === 4 ? 10 : 1,
                boxShadow: idx === 4 ? "0 8px 32px 0 rgba(36,41,54,0.13)" : undefined,
                transition: "box-shadow 0.3s",
              }}
              {...(window.innerWidth >= 768
                ? {
                    style: {
                      ...{
                        width: "22vw",
                        minWidth: "22vw",
                        maxWidth: "22vw",
                        height: "90vh",
                        scrollSnapAlign: "start",
                        marginRight: idx === 4 ? "-16vw" : "0",
                        zIndex: idx === 4 ? 10 : 1,
                        boxShadow: idx === 4 ? "0 8px 32px 0 rgba(36,41,54,0.13)" : undefined,
                        transition: "box-shadow 0.3s",
                      },
                    },
                  }
                : {})}
            >
              <img
                src={img}
                alt={`Home ${idx + 1}`}
                className="object-cover w-full h-full rounded-3xl"
                draggable={false}
              />
              {/* Gradient overlay and sample text */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "100%",
                  height: "40%",
                  background: "linear-gradient(to top, rgba(20,30,48,0.65) 70%, rgba(20,30,48,0.05) 100%)",
                  borderBottomLeftRadius: "1.5rem",
                  borderBottomRightRadius: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  padding: "1.5rem",
                  zIndex: 2,
                }}
              >
                <div style={{
                  
                  color: "#fff",
                  fontWeight: 300,
                  fontSize: "4.25rem",
                  marginBottom: "0.25rem",
                  textShadow: "0 2px 8px rgba(0,0,0,0.25)",
                  fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif' 'bold'"
                }}>
                  Sample Title
                </div>
                <div style={{
                  color: "#e3e6ee",
                  fontWeight: 400,
                  fontSize: "1rem",
                  textShadow: "0 2px 8px rgba(0,0,0,0.18)"
                }}>
                  Sample description for testing.
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Features Section: 6 features, 2 per row, 3 rows, each row 100vh */}
      <section className="relative w-full">
        {[
          [
            { title: "Inventory Management", desc: "Stay updated with real-time stock levels.", icon: Package },
            { title: "Billing Solutions", desc: "Generate invoices and manage transactions effortlessly.", icon: CreditCard }
          ],
          [
            { title: "Business Credit Management", desc: "Offer and track credit transactions securely.", icon: Users },
            { title: "Supply Chain Management", desc: "Optimize and streamline supply chain operations.", icon: ShoppingCart }
          ],
          [
            { title: "Growth & Analytics", desc: "Gain insights to scale your business effectively.", icon: BarChart },
            { title: "Curated Business Support", desc: "Get expert advice and tailored support.", icon: TrendingUp }
          ]
        ].map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-1 md:grid-cols-2 gap-0"
            style={{ minHeight: "100vh" }}
          >
            {row.map((feature, colIndex) => (
              <div
                key={colIndex}
                className="flex flex-col justify-center items-center bg-white border border-gray-100"
                style={{
                  height: "100vh",
                  padding: "0 5vw"
                }}
              >
                <feature.icon className="w-20 h-20 text-blue-800 mb-8" />
                <h3 className="text-3xl font-bold mb-4 text-blue-900">{feature.title}</h3>
                <p className="text-xl text-gray-700 max-w-xl text-center">{feature.desc}</p>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
