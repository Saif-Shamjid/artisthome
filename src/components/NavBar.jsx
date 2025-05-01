import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaSearch, FaUser, FaShoppingBag } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navbarRef = useRef(null);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      ref={navbarRef}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-cream-100 shadow-md' : 'lg:bg-transparent bg-cream-100 '
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-serif font-medium text-amber-800">
            ArtisHome
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-amber-900 hover:text-amber-700 transition">Home</a>
            <a href="#" className="text-amber-900 hover:text-amber-700 transition">Collections</a>
            <a href="#" className="text-amber-900 hover:text-amber-700 transition">About</a>
            <a href="#" className="text-amber-900 hover:text-amber-700 transition">Gallery</a>
            <a href="#" className="text-amber-900 hover:text-amber-700 transition">Contact</a>
            
            <div className="flex items-center space-x-4 ml-4">
              <button className="text-amber-900 hover:text-amber-700 transition">
                <FaSearch size={18} />
              </button>
              <button className="text-amber-900 hover:text-amber-700 transition">
                <FaUser size={18} />
              </button>
              <button className="text-amber-900 hover:text-amber-700 transition relative">
                <FaShoppingBag size={18} />
                <span className="absolute -top-2 -right-2 bg-amber-700 text-cream-50 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-amber-900 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 1, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-8 space-y-4 flex flex-col">
                <a href="#" className="text-amber-900 hover:text-amber-700 transition">Home</a>
                <a href="#" className="text-amber-900 hover:text-amber-700 transition">Collections</a>
                <a href="#" className="text-amber-900 hover:text-amber-700 transition">About</a>
                <a href="#" className="text-amber-900 hover:text-amber-700 transition">Gallery</a>
                <a href="#" className="text-amber-900 hover:text-amber-700 transition">Contact</a>
                
                <div className="flex items-center space-x-4 pt-4">
                  <button className="text-amber-900 hover:text-amber-700 transition">
                    <FaSearch size={18} />
                  </button>
                  <button className="text-amber-900 hover:text-amber-700 transition">
                    <FaUser size={18} />
                  </button>
                  <button className="text-amber-900 hover:text-amber-700 transition relative">
                    <FaShoppingBag size={18} />
                    <span className="absolute -top-2 -right-2 bg-amber-700 text-cream-50 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      2
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar