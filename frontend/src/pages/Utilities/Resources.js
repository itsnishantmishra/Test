import React, { useState, useEffect } from 'react';
import { Sparkles, Zap } from 'lucide-react';

const FuturisticTallyForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse delay-2000"></div>
      </div>

      {/* Mouse follower glow */}
      <div 
        className="fixed w-80 h-80 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 30%, transparent 70%)',
          transform: `translate(${mousePosition.x - 160}px, ${mousePosition.y - 160}px)`,
          transition: 'transform 0.05s ease-out'
        }}
      ></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-20 w-full max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-black border border-purple-500/50 rounded-full p-3">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-4 tracking-tight">
            Sledge BUILDER
          </h1>
          
          <div className="flex items-center justify-center space-x-4 text-gray-400 text-lg">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-purple-500"></div>
            <span>Share Your Vision</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-500"></div>
          </div>
        </div>

        {/* Form Container */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative group">
            {/* Glowing border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            
            {/* Form */}
            <div className="relative bg-gray-900/90 backdrop-blur-xl border border-purple-500/30 rounded-3xl overflow-hidden">
              {/* Top accent */}
              <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"></div>
              
              {/* Form embed */}
              <div className="p-1">
                <iframe
                  src="https://tally.so/embed/w40bNb?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                  width="100%"
                  height="300"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  title="Project Ideas Form"
                  className="rounded-3xl"
                  style={{
                    background: 'transparent',
                    border: 'none'
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className={`text-center mt-8 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 text-purple-400/60 text-sm">
            <Zap className="w-4 h-4" />
            <span>Powered by Innovation</span>
          </div>
        </div>
         <div className="flex items-center justify-center space-x-4 text-gray-400 text-lg mt-2">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-purple-500"></div>
            <span>https://github.com/itsnishantmishra/sledgeBUILDER-generated.git</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-500"></div>
          </div>
        </div>
      </div>

    
  );
};

export default FuturisticTallyForm;







