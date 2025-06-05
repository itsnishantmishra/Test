import { motion } from "framer-motion";
import { BarChart, CreditCard, Package, ShoppingCart, TrendingUp, Users } from "lucide-react";
import Footer from "../components/Footer"; // <-- Import your existing Footer
import kiranaShop from "../assets/Kirana_Shop.webp"; // <-- Add this import at the top

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
        <div className="max-w-4xl relative z-20 flex flex-col items-start px-6 md:px-12 ml-0 md:ml-8">
          <h1
            className="text-5xl md:text-7xl font-light text-white md:tracking-tight text-left"
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'",
              letterSpacing: "0.01em",
              textShadow: "0 4px 24px rgba(0,0,0,0.25)",
              lineHeight: 1.2 // <-- Add this line for 1.5x line spacing
            }}
          >
            Bridging Retailers<br />
            & Distributors
          </h1>
          <p
            className="mt-4 md:mt-6 text-base md:text-2xl text-gray-100 font-light text-left"
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'",
              textShadow: "0 2px 8px rgba(0,0,0,0.18)",
              letterSpacing: "0.01em"
            }}
          >
            Empowering retailers with seamless inventory,<br />
            billing, and business growth solutions.
          </p>
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

      {/* --- Section Between Video and Image --- */}
      <section
        className="w-full flex items-center justify-start py-12 bg-gradient-to-r from-blue-50 via-white to-blue-50"
        style={{
          minHeight: "120px"
        }}
      >
        <div className="relative w-full">
          <div
            className="max-w-4xl px-6 md:px-12 ml-0 md:ml-8"
            style={{
              // Matches the hero section's left start and width
              display: "flex",
              alignItems: "center",
              minHeight: "100%",
            }}
          >
            <h2
              className="text-2xl md:text-3xl font-semibold text-grey text-left"
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'",
                letterSpacing: "0.01em",
                lineHeight: 1.4,
                width: "100%",
              }}
            >
              Sledje Software Solutions is a leading pioneer in easing major setbacks of retailers and distributor connections
            </h2>
          </div>
        </div>
      </section>

      {/* --- New Image Section with Translucent Box --- */}
      <section
        className="relative w-full min-h-screen flex items-center justify-start overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Background Image */}
        <img
          src={kiranaShop}
          alt="Kirana Shop"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          style={{ minHeight: "100vh", minWidth: "100vw", filter: "brightness(0.85) blur(0.5px)" }}
        />

        {/* Soft overlay for better text readability */}
        <div
          className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, rgba(255,255,255,0.12) 0%, rgba(48,54,68,0.10) 100%)"
          }}
        />

        {/* Translucent Box with Text */}
        <div
          className="relative z-20 flex flex-col justify-center"
          style={{
            width: "100%",
            minHeight: "100vh",
            paddingLeft: "1rem"
          }}
        >
          <div
            className="ml-0 md:ml-8 max-w-xl md:max-w-2xl px-8 py-10 rounded-2xl shadow-2xl"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px 0 rgba(36,41,54,0.13)",
              border: "1.5px solid rgba(255,255,255,0.22)"
            }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'",
                letterSpacing: "0.01em"
              }}
            >
              Welcome to the Next Step
            </h2>
            <p
              className="text-lg md:text-xl text-gray-700 font-light"
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', Arial, 'sans-serif'",
                lineHeight: 1.5
              }}
            >
              Discover how our platform empowers your business with seamless integration, real-time insights, and a supportive ecosystem. 
              <br /><br />
              Join us as we redefine the future of retail and distribution, making growth accessible and effortless for everyone.
            </p>
          </div>
        </div>
      </section>
      {/* --- End New Section --- */}

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
