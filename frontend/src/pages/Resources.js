import React from "react";
export default function PremiumLandingPage() {
  return (
    <div className="font-[\'Eudoxus Sans\'] text-gray-900 bg-white">
      {/* Header */}
      <header className="w-full px-8 py-6 flex items-center justify-between shadow-sm sticky top-0 z-50 bg-white">
        <h1 className="text-2xl font-bold tracking-tight">YourBrand</h1>
        <nav className="space-x-6 hidden md:flex">
          <a href="#features" className="hover:text-blue-600 transition">Features</a>
          <a href="#about" className="hover:text-blue-600 transition">About</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
        </nav>
        <button className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-all">Get Started</button>
      </header>

      {/* Hero Section */}
      <section className="text-center px-6 py-28 md:py-40 max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
          Experience Simplicity<br />With Elegance
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          A premium UI crafted with Eudoxus Sans for clarity, elegance, and modern appeal. Designed for forward-thinkers.
        </p>
        <button className="bg-black text-white px-8 py-3 text-lg rounded-full hover:bg-gray-900 transition-all">
          Explore Now
        </button>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold mb-4">Clean Aesthetic</h3>
            <p className="text-gray-600">Spacious design with crisp text using Eudoxus Sans. No distractions.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold mb-4">Responsive Layout</h3>
            <p className="text-gray-600">Adapts beautifully to all screen sizes with optimal readability.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold mb-4">Premium Feel</h3>
            <p className="text-gray-600">Subtle animations, whitespace, and sleek UI elements for a luxury look.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t px-6 py-12 text-center text-sm text-gray-500">
        © 2025 YourBrand. Designed with love using Eudoxus Sans.
      </footer>
    </div>
  );
}



