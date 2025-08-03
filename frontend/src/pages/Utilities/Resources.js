        //    <section 
        //   ref={newsletterRef}
        //   className={`relative min-h-screen py-20 overflow-hidden ${
        //     isDarkMode ? 'bg-black' : 'bg-white'
        //   }`}
        // >
        //   {/* Animated Background */}
        //   <div className="absolute inset-0 pointer-events-none">
        //     {/* Dynamic Gradient Orbs */}
        //     <div 
        //       className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"
        //       style={{
        //         top: '20%',
        //         left: '10%',
        //         transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        //         transition: 'transform 0.3s ease-out'
        //       }}
        //     />
        //     <div 
        //       className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"
        //       style={{
        //         top: '60%',
        //         right: '15%',
        //         animationDelay: '1s',
        //         transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
        //         transition: 'transform 0.3s ease-out'
        //       }}
        //     />
        //     <div 
        //       className="absolute w-64 h-64 bg-gradient-to-r from-violet-500/25 to-indigo-500/25 rounded-full blur-3xl animate-pulse"
        //       style={{
        //         top: '40%',
        //         left: '50%',
        //         animationDelay: '2s',
        //         transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
        //         transition: 'transform 0.3s ease-out'
        //       }}
        //     />
            
        //     {/* Floating Particles */}
        //     {[...Array(20)].map((_, i) => (
        //       <div
        //         key={i}
        //         className={`absolute w-1 h-1 rounded-full ${isDarkMode ? 'bg-white/20' : 'bg-black/10'} animate-pulse`}
        //         style={{
        //           top: `${Math.random() * 100}%`,
        //           left: `${Math.random() * 100}%`,
        //           animationDelay: `${Math.random() * 1}s`,
        //           animationDuration: `${2 + Math.random() * 3}s`
        //         }}
        //       />
        //     ))}
        //   </div>

        //   {/* Newsletter Content */}
        //   <div
        //     className={`relative z-10 w-full flex flex-col items-center justify-center text-center px-4 md:px-8 transition-all duration-1000 ease-out transform ${
        //       isNewsletterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
        //     }`}
        //     style={{
        //       transitionDelay: isNewsletterVisible ? '200ms' : '0ms'
        //     }}
        //     >
        //     <div className="max-w-6xl mx-auto space-y-12">
        //       {/* Hero Text */}
        //       <div className="space-y-8">
        //         <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10">
        //           <Sparkles className="w-5 h-5 text-purple-400" />
        //           <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        //             Newsletter
        //           </span>
        //         </div>
                
        //         <h2 className={`text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight transition-all duration-700 ${
        //           isDarkMode ? 'text-white' : 'text-gray-900'
        //         }`}>
        //           <span className="block">Subscribe to </span>
        //           <span className="block bg-gradient-to-r from-blue-600 via-blue-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
        //             Sledge
        //           </span>
        //           <span className="block text-xl md:text-3xl lg:text-4xl font-light mt-4 opacity-70">
        //             Stay ahead of tomorrow
        //           </span>
        //         </h2>
                
        //         <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light ${
        //           isDarkMode ? 'text-gray-300' : 'text-gray-700'
        //         }`}>
        //           Exclusive insights, breakthrough innovations, and the future of business.
        //           <span className="block mt-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-medium">
        //             Delivered with precision.
        //           </span>
        //         </p>
        //       </div>

        //       {/* Tally Form Container */}
        //       <div className={`relative max-w-3xl mx-auto p-8 md:p-12 rounded-3xl backdrop-blur-2xl transition-all duration-500 hover:scale-105 overflow-hidden${
        //         isDarkMode 
        //           ? 'bg-white/5 border border-white/10 shadow-2xl shadow-purple-500/10' 
        //           : 'bg-black/5 border border-black/10 shadow-2xl shadow-black/10'
        //       }`}>
        //         {/* Glow Effect */}
        //         <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                
        //         {/* Tally Form Embed */}
        //         <div className="relative z-10">
        //           <div className="overflow-hidden rounded-2xl">
        //             <iframe
        //               src="https://tally.so/embed/3yAaYx?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        //               width="100%"
        //               height="600"
        //               frameBorder="0"
        //               marginHeight="0"
        //               marginWidth="0"
        //               title="Newsletter Subscription"
        //               className="w-full min-h-[400px] transition-all duration-300"
        //               style={{
        //                 background: 'transparent',
        //                 border: 'none',
        //                 borderRadius: '1rem',
        //                 overflow:"hidden"
        //               }}
        //             ></iframe>
        //           </div>
                  
        //           {/* Custom Overlay for Enhanced Design */}
        //           <div className="absolute inset-0 pointer-events-none">
        //             {/* Subtle gradient overlay */}
        //             <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-5 ${
        //               isDarkMode ? 'from-purple-400/20 to-blue-400/20' : 'from-purple-500/10 to-blue-500/10'
        //             }`}></div>
        //              {/* Corner accent elements */}
        //             <div className="absolute top-4 left-4 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 animate-pulse"></div>
        //             <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-40 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        //             <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full opacity-35 animate-pulse" style={{animationDelay: '1s'}}></div>
        //             <div className="absolute bottom-4 right-4 w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        //           </div>
        //         </div>
                
        //         {/* Decorative Elements */}
        //         <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-xl animate-pulse"></div>
        //         <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        //       </div>

        //       {/* Trust Indicators */}
        //       <div className={`flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm ${
        //         isDarkMode ? 'text-gray-400' : 'text-gray-600'
        //       }`}>
        //         <div className="flex items-center space-x-2">
        //           <CheckCircle className="w-5 h-5 text-green-400" />
        //           <span>No spam, ever</span>
        //         </div>
        //         <div className="flex items-center space-x-2">
        //           <CheckCircle className="w-5 h-5 text-green-400" />
        //           <span>Unsubscribe anytime</span>
        //         </div>
        //         <div className="flex items-center space-x-2">
        //           <CheckCircle className="w-5 h-5 text-green-400" />
        //           <span>Premium content</span>
        //         </div>
        //       </div>
        //        {/* Enhanced CTA Section */}
        //       <div className="space-y-6">
        //         <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
        //           isDarkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'
        //         }`}>
        //           <ArrowRight className="w-4 h-4" />
        //           <span>Join 10,000+ innovators already subscribed</span>
        //         </div>
                
        //         <p className={`text-sm max-w-2xl mx-auto leading-relaxed ${
        //           isDarkMode ? 'text-gray-500' : 'text-gray-500'
        //         }`}>
        //           By subscribing, you agree to receive our newsletter and promotional emails. 
        //           You can unsubscribe at any time. We respect your privacy and never share your data.
        //         </p>
        //       </div>
        //     </div>
        //   </div>
        // </section>