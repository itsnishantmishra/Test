import { useState, useEffect } from 'react';
import { X, Zap, ExternalLink } from 'lucide-react';

// 🔗 INSERT YOUR N8N FORM URL HERE:
const N8N_FORM_URL = "https://bapachino.app.n8n.cloud/form/de292652-8392-49ae-93af-ba4c0dd2c0d7";

function FuturisticNewsletter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
    setTimeout(() => setIsAnimating(true), 50);
  };

  const closePopup = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  const openFormInNewWindow = () => {
    const width = 650;
    const height = 750;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    
    window.open(
      N8N_FORM_URL,
      'newsletterForm',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,status=no`
    );
    closePopup();
  };

  const openInNewTab = () => {
    window.open(N8N_FORM_URL, '_blank', 'noopener,noreferrer');
    closePopup();
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closePopup();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      {/* Newsletter Section */}
      <section className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center p-4">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-6 py-2 mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-purple-300 text-sm font-medium tracking-wide">EXCLUSIVE ACCESS</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
              Join The
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"> Future</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Get early access to cutting-edge updates, exclusive content, and be part of tomorrow's revolution.
            </p>
          </div>
          
           {/* Popup Window Option */}
                            <button
                onClick={openFormInNewWindow}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-teal-500 text-white p-5 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-purple-500/25 relative overflow-hidden group animate-pulse-slow"
            >
                <div className="absolute  inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>

                <div className="relative flex items-center justify-center gap-3">
                <Zap className="w-5 h-5 animate-flicker" />
                <span className="tracking-wider">Open Form</span>
                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce">⚡</div>
                </div>
            </button>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute bottom-32 right-32 w-3 h-3 bg-cyan-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-pink-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.5s'}}></div>
      </section>

    </>
  );
}

export default FuturisticNewsletter;