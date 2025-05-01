import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CategorySection = () => {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  
  const categories = [
    {
      id: 1,
      name: "Wall Art",
      description: "Handcrafted artistic wall panels and decorations",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/products/wall-art",
      color: "from-amber-600/20 to-amber-800/80"
    },
    {
      id: 2,
      name: "Mirror Art",
      description: "Elegant decorative mirrors with artistic frames",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/products/mirror-art",
      color: "from-blue-600/20 to-blue-800/80"
    },
    {
      id: 3,
      name: "Floral Decor",
      description: "3D floral wall hangings and centerpieces",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/products/floral-decor",
      color: "from-emerald-600/20 to-emerald-800/80"
    },
    {
      id: 4,
      name: "Traditional",
      description: "Ethnic decor with modern craftsmanship",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/products/traditional",
      color: "from-violet-600/20 to-violet-800/80"
    },
    {
      id: 5,
      name: "Modern Fusion",
      description: "Contemporary designs with ethnic influences",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/products/modern-fusion",
      color: "from-rose-600/20 to-rose-800/80"
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ 
        left: scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="py-24 bg-gradient-to-b from-cream-50 to-cream-100 px-6 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-amber-200/30 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-200/30 blur-3xl"></div>
      </motion.div>
      
      <div className="container mx-auto relative">
        <div className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-amber-900 mb-2">
              Our Collections
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-amber-300 rounded-full"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex space-x-3"
          >
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white text-amber-800 hover:bg-amber-800 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              aria-label="Scroll left"
            >
              <FiChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white text-amber-800 hover:bg-amber-800 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              aria-label="Scroll right"
            >
              <FiChevronRight size={24} />
            </button>
          </motion.div>
        </div>

        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex space-x-8 overflow-x-auto scrollbar-hide py-6 pl-2 -ml-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1]
                }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                className="flex-shrink-0 w-80 md:w-96 rounded-2xl overflow-hidden shadow-xl group relative h-full"
                style={{ scrollSnapAlign: 'start' }}
                whileHover={{ y: -10 }}
              >
                <a href={category.link} className="block h-full">
                  <div className="relative h-96 w-full">
                    <motion.img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover absolute inset-0"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} via-transparent`}></div>
                    
                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-8">
                      <div>
                        <motion.h3 
                          className="text-3xl font-serif text-white mb-2"
                          initial={{ y: 0 }}
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.4 }}
                        >
                          {category.name}
                        </motion.h3>
                        <motion.p 
                          className="text-white/90"
                          initial={{ opacity: 0.9, y: 0 }}
                          whileHover={{ opacity: 1, y: -5 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        >
                          {category.description}
                        </motion.p>
                      </div>
                      
                      {/* Explore button - appears on card hover */}
                      <motion.div
                        className="w-full"
                        initial={{ opacity: 1, y: 0 }}
                        whileHover={{ opacity: 1, y: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <button className="w-full py-3 bg-white/90 text-amber-800 rounded-lg font-medium shadow-md hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
                          <span>Explore Collection</span>
                          <span className="text-xl">→</span>
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <button className="px-8 py-3 bg-amber-700 hover:bg-amber-800 text-cream-50 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
            View All Collections
          </button>
        </motion.div>
      </div>

      {/* Custom scrollbar hide */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default CategorySection;