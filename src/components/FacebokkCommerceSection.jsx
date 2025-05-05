import { AnimatePresence, motion } from 'framer-motion';
import { FaFacebookMessenger, FaWhatsapp, FaFacebook, FaStore, FaComments, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const FacebookCommerceSection = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const products = [
    {
      id: 1,
      name: "Handcrafted Wooden Bowl",
      price: "$45",
      image: "https://images.unsplash.com/photo-1608500218866-7860795cea4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      likes: "142",
      comments: "23"
    },
    {
      id: 2,
      name: "Artisan Ceramic Vase",
      price: "$68",
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      likes: "89",
      comments: "12"
    },
    {
      id: 3,
      name: "Woven Rattan Basket",
      price: "$32",
      image: "https://images.unsplash.com/photo-1591348122449-02525d70379b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      likes: "204",
      comments: "41"
    }
  ];

  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovering, products.length]);

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

  const cardHover = {
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(180, 83, 9, 0.3)",
      transition: {
        duration: 0.3
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    floatReverse: {
      y: [0, 15, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-amber-50 to-cream-50 overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div 
        variants={floatingVariants}
        animate="float"
        className="hidden sm:block absolute top-1/4 left-1/6 w-16 h-16 md:w-24 md:h-24 bg-amber-300/10 rounded-full filter blur-sm"
      />
      <motion.div 
        variants={floatingVariants}
        animate="floatReverse"
        className="hidden sm:block absolute top-1/3 right-1/5 w-20 h-20 md:w-28 md:h-28 bg-amber-500/10 rounded-full filter blur-sm"
      />
      
      {/* Animated dots background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-amber-700/20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 5 + 5}s ease-in-out ${Math.random() * 3}s infinite alternate`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-amber-900 mb-4">
            <span className="block">Join Our</span>
            <span className="font-medium italic text-amber-800">Facebook Community</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-amber-800/80 max-w-3xl mx-auto leading-relaxed">
            Where <span className="font-medium text-amber-700">90% of our customers</span> discover and purchase our artisan creations
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Facebook Shop Preview - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-amber-200 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Facebook header */}
              <div className="bg-blue-600 p-3 flex items-center">
                <FaFacebook className="text-white text-2xl mr-2" />
                <div className="text-white font-medium">Artisan Creations</div>
                <div className="ml-auto flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-white/70"></div>
                  <div className="w-2 h-2 rounded-full bg-white/70"></div>
                  <div className="w-2 h-2 rounded-full bg-white/70"></div>
                </div>
              </div>
              
              {/* Product carousel */}
              <div 
                className="relative h-64 overflow-hidden"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={products[activeProduct].id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={products[activeProduct].image} 
                      alt={products[activeProduct].name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Product info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-medium text-lg">{products[activeProduct].name}</h3>
                  <p className="font-bold text-xl">{products[activeProduct].price}</p>
                </div>
                
                {/* Navigation dots */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                  {products.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveProduct(index)}
                      className={`w-2 h-2 rounded-full ${index === activeProduct ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Facebook post footer */}
              <div className="p-3">
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <FaHeart className="text-red-500 mr-1" />
                  <span className="mr-3">{products[activeProduct].likes}</span>
                  <FaComments className="text-blue-500 mr-1" />
                  <span>{products[activeProduct].comments}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center py-1 bg-gray-100 rounded text-blue-600 font-medium text-sm">
                    <FaHeart className="mr-1" /> Like
                  </button>
                  <button className="flex-1 flex items-center justify-center py-1 bg-gray-100 rounded text-blue-600 font-medium text-sm">
                    <FaComments className="mr-1" /> Comment
                  </button>
                  <button className="flex-1 flex items-center justify-center py-1 bg-gray-100 rounded text-blue-600 font-medium text-sm">
                    <FaShoppingCart className="mr-1" /> Shop Now
                  </button>
                </div>
              </div>
            </div>
            
            {/* Floating "Live" badge */}
            <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full font-medium text-xs flex items-center shadow-lg">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              LIVE
            </div>
          </motion.div>

          {/* Connection Options */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <motion.a
              href="https://m.me/yourpagename" 
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover="hover"
            //   variants={cardHover}
              className="block bg-cream-50/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200 hover:bg-cream-50 transition-all group"
            >
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-all">
                  <FaFacebookMessenger className="text-blue-500 text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-amber-800 mb-1">Instant Messenger Support</h3>
                  <p className="text-amber-800/80">Get real-time answers from our team</p>
                  <div className="mt-4 relative z-10">
            <a 
              href="https://m.me/yourpagename" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-cream-50 hover:bg-white text-amber-800 rounded-lg font-medium shadow-md transition-all"
            >
              Messenger
            </a>
          </div>
                </div>
              </div>
            </motion.a>

            <motion.a
              href="https://wa.me/yourphonenumber" 
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover="hover"
            //   variants={cardHover}
              className="block bg-cream-50/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200 hover:bg-cream-50 transition-all group"
            >
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mr-4 group-hover:bg-green-200 transition-all">
                  <FaWhatsapp className="text-green-500 text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-amber-800 mb-1">WhatsApp Order Confirmations</h3>
                  <p className="text-amber-800/80">Fast order processing and updates</p>
                  <div className="mt-4 relative z-10">
            <a 
              href="https://wa.me/yourphonenumber" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-cream-50 hover:bg-white text-amber-800 rounded-lg font-medium shadow-md transition-all"
            >
              WhatsApp
            </a>
          </div>
                </div>
              </div>
            </motion.a>

            <motion.a
              href="https://facebook.com/yourpage" 
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover="hover"
            //   variants={cardHover}
              className="block bg-cream-50/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200 hover:bg-cream-50 transition-all group"
            >
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-all">
                  <FaComments className="text-blue-500 text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-amber-800 mb-1">Exclusive Facebook Community</h3>
                  <p className="text-amber-800/80">Join 5,000+ satisfied customers</p>
                  <div className="mt-4 relative z-10">
            <a 
              href="https://facebook.com/yourpage" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-cream-50 hover:bg-white text-amber-800 rounded-lg font-medium shadow-md transition-all"
            >
              Facebook Page
            </a>
          </div>
                </div>
              </div>
            </motion.a>
          </motion.div>
        </div>

        {/* Special Offer Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl p-6 md:p-8 text-center text-cream-50 shadow-lg relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-amber-500/30 filter blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-amber-400/20 filter blur-xl"></div>
          
          <h3 className="text-2xl md:text-3xl font-serif font-medium mb-2 relative z-10">
            Facebook Followers Get <span className="italic">15% Off</span> First Order!
          </h3>
          <p className="text-amber-100 max-w-2xl mx-auto relative z-10">
            Mention this website when messaging us on Facebook to receive your exclusive discount
          </p>
          <div className="mt-4 relative z-10">
            <a 
              href="https://facebook.com/yourpage" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-cream-50 hover:bg-white text-amber-800 rounded-lg font-medium shadow-md transition-all"
            >
              Visit Our Facebook Page
            </a>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default FacebookCommerceSection;