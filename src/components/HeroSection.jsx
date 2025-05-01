import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const particlesRef = useRef(null);
  
  const productImages = [
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  ];

  // Create custom particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const particleCount = window.innerWidth < 768 ? 30 : 60;
    const colors = ['#b7813d', '#3a9b94', '#7a5628'];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full';
      
      // Adjust particle size based on screen size
      const size = window.innerWidth < 768 ? 
        (Math.random() * 2 + 2) : 
        (Math.random() * 3 + 3);
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 5 + 5;
      const delay = Math.random() * 3;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.opacity = '0.5';
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      
      particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
      
      container.appendChild(particle);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [productImages.length]);

  const featuredImageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 1.2,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    floatReverse: {
      y: [0, 20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative h-screen md:max-h-[900px] overflow-hidden">
      {/* Background video with overlay */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/S9tAT3hqjlcs9cgu3/bag17-274eg4s4qi__aeda6c15e640d59fee1081978651870a__P360.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-cream-50/90 to-cream-100/90"></div>
      </div>

      {/* Custom particle effect */}
      <div 
        ref={particlesRef} 
        className="absolute inset-0 z-1 pointer-events-none"
      />

      {/* Floating decorative elements - Hidden on mobile */}
      <motion.div 
        variants={floatingVariants}
        animate="float"
        className="hidden sm:block absolute top-1/4 left-1/6 w-12 h-12 md:w-20 md:h-20 bg-teal-500/10 rounded-full filter blur-sm"
      />
      <motion.div 
        variants={floatingVariants}
        animate="floatReverse"
        className="hidden sm:block absolute top-1/3 right-1/5 w-16 h-16 md:w-28 md:h-28 bg-amber-500/10 rounded-full filter blur-sm"
      />
      <motion.div 
        variants={floatingVariants}
        animate="float"
        className="hidden sm:block absolute bottom-1/4 right-1/4 w-14 h-14 md:w-24 md:h-24 bg-teal-500/10 rounded-full filter blur-sm"
      />

      {/* Mobile image slider - Only shown on mobile at the top */}
      <div className="lg:hidden absolute top-20 left-0 right-0 flex justify-center z-10">
        <div className="relative w-3/4 h-48 sm:h-56">
          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-${currentImageIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 rounded-lg overflow-hidden shadow-lg"
            >
              <img 
                src={productImages[currentImageIndex]} 
                alt="Featured decor"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream-50/10 to-cream-50/30"></div>
              
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Main content - Positioned at bottom on mobile */}
      <div className="container mx-auto px-4 sm:px-6 h-full flex items-end lg:items-center pb-8 lg:pb-0 relative z-10">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="hero-content w-full lg:w-1/2 text-center lg:text-left"
          >
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 text-amber-900 tracking-tight">
              <span className="block">Where Art Meets</span>
              <span className="font-medium italic text-amber-800">Serenity</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-amber-800/80 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Discover handcrafted decor that blends traditional artistry with modern elegance. 
              Each piece tells a story of craftsmanship and timeless beauty.
            </motion.p>
            
            <motion.button 
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(192, 132, 84, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 sm:px-8 sm:py-3 bg-amber-700 hover:bg-amber-800 text-cream-50 rounded-full font-medium shadow-lg shadow-amber-700/10 text-sm sm:text-base"
            >
              Explore the Collection
            </motion.button>
          </motion.div>

          {/* 3D Image Gallery - Hidden on mobile */}
          <div className="hidden lg:block w-full lg:w-1/2 relative mt-12 lg:mt-0">
            <div className="relative h-[300px] md:h-[400px] lg:pr-8" style={{ perspective: '1000px' }}>
              {/* Arch shape container */}
              <motion.div 
                initial={{ opacity: 0, rotate: 5 }}
                animate={{ opacity: 1, rotate: 6 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute -inset-4 rounded-tl-full rounded-tr-full border-2 border-amber-500/20 transform"
              />
              
              {/* Image stack with 3D effect */}
              <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 100, rotateY: 20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      rotateY: -5,
                      transformOrigin: "left center"
                    }}
                    exit={{ opacity: 0, x: -100, rotateY: -20 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-lg overflow-hidden shadow-xl"
                    style={{
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <img 
                      src={productImages[currentImageIndex]} 
                      alt="Featured decor"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cream-50/10 to-cream-50/60"></div>
                    
                    {/* Floating label */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="absolute bottom-6 left-6 bg-cream-50/90 px-4 py-2 rounded-full shadow-sm"
                    >
                      <span className="text-amber-800 font-medium">Featured Collection</span>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Next image peeking from the side */}
                <motion.div 
                  className="absolute left-[-15%] top-1/2 transform -translate-y-1/2 w-3/4 opacity-70"
                  animate={{
                    x: [0, -10, 0],
                    transition: { duration: 3, repeat: Infinity }
                  }}
                >
                  <img 
                    src={productImages[(currentImageIndex + 1) % productImages.length]} 
                    alt="Next product"
                    className="w-full h-[225px] md:h-[300px] object-cover rounded-lg shadow-lg"
                    style={{
                      transform: 'rotateY(25deg) rotateZ(-2deg)',
                      clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)'
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-25px) translateX(15px);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;