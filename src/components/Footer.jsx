import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaWhatsapp, FaArrowUp } from 'react-icons/fa';
import { useState } from 'react';

const ArtisanFooter = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', checkScrollTop);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="relative bg-amber-900 text-cream-50 pt-16 pb-8 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-amber-700/50 filter blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-amber-800/30 filter blur-xl"></div>
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-600/30"
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 8 + 4}s ease-in-out ${Math.random() * 3}s infinite alternate`
          }}
          animate={{
            y: [0, Math.random() > 0.5 ? -20 : 20, 0],
            x: [0, Math.random() > 0.5 ? -15 : 15, 0],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-serif font-medium mb-4">Artisan Creations</h3>
            <p className="text-amber-200/80 mb-4">
              Handcrafted with passion, designed for your space.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/yourpage" className="text-amber-200 hover:text-cream-50 transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-amber-200 hover:text-cream-50 transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-amber-200 hover:text-cream-50 transition-colors">
                <FaWhatsapp className="text-xl" />
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-serif font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-amber-200/80 hover:text-cream-50 transition-colors">Home</a></li>
              <li><a href="#" className="text-amber-200/80 hover:text-cream-50 transition-colors">Collections</a></li>
              <li><a href="#" className="text-amber-200/80 hover:text-cream-50 transition-colors">Custom Orders</a></li>
              <li><a href="#" className="text-amber-200/80 hover:text-cream-50 transition-colors">About Us</a></li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-serif font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-amber-200/80 hover:text-cream-50 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-amber-200/80 hover:text-cream-50 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-amber-200/80 hover:text-cream-50 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="text-amber-200/80 hover:text-cream-50 transition-colors">Returns</a></li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-serif font-medium mb-4">Newsletter</h3>
            <p className="text-amber-200/80 mb-4">
              Subscribe for exclusive offers and artisan stories.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l-lg bg-amber-800/50 text-cream-50 placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-600 w-full"
              />
              <button className="px-4 py-2 bg-amber-700 hover:bg-amber-600 rounded-r-lg transition-colors">
                Join
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Attribution with creative hover effect */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-8 border-t border-amber-800 text-center"
        >
          <div className="relative inline-block group">
            <p className="text-amber-200/80">
              Website crafted with care by{' '}
              <a 
                href="https://www.facebook.com/trilance.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-cream-50 font-medium transition-colors relative"
              >
                <span className="relative z-10">trilance.tech</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            </p>
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-800/50"></div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      {showScroll && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 w-12 h-12 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center shadow-lg z-50 transition-colors"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-cream-50 text-lg" />
        </motion.button>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </footer>
  );
};

export default ArtisanFooter;