import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiShoppingBag, FiEye, FiChevronRight } from 'react-icons/fi';

const ArtisProductCard = ({ 
  images, 
  title, 
  description, 
  price, 
  isNew = false 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate images with cool effect
  useEffect(() => {
    if (!isHovered || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative h-full"
    >
      <div 
        className="relative h-full overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Dynamic image gallery */}
        <div className="relative aspect-square overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <img 
                src={images[currentImageIndex]} 
                alt={`${title} - View ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
            </motion.div>
          </AnimatePresence>

          {/* Badges */}
          {isNew && (
            <motion.div 
              className="absolute top-4 left-4 bg-amber-700 text-cream-50 px-3 py-1 rounded-full text-xs font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              New Arrival
            </motion.div>
          )}

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/50 text-cream-50 px-2 py-1 rounded-full text-xs">
              {currentImageIndex + 1}/{images.length}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="p-5 flex flex-col h-[40%]">
          <div className="mb-3">
            <h3 className="font-serif text-xl text-amber-900">{title}</h3>
            <p className="text-sm text-amber-800/80">{description}</p>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="font-serif text-lg text-amber-900">${price}</span>
            </div>
            
            {/* Dual action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <motion.a
                href={`/products/${title.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center justify-center space-x-2 bg-white text-amber-900 border border-amber-900/20 hover:bg-amber-50 px-4 py-2 rounded-full text-sm transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiEye size={14} />
                <span>View</span>
              </motion.a>
              
              <motion.button
                className="flex items-center justify-center space-x-2 bg-amber-700 hover:bg-amber-800 text-cream-50 px-4 py-2 rounded-full text-sm transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiShoppingBag size={14} />
                <span>Add to Cart</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedCollection = () => {
  const featuredProducts = [
    {
      id: 1,
      images: [
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6"
      ],
      title: "Harmony Wall Panel",
      description: "Hand-carved teak with gold leaf",
      price: 249,
      isNew: true
    },
    {
      id: 2,
      images: [
        "https://images.unsplash.com/photo-1583845112203-454c5d27a0a5",
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c"
      ],
      title: "Celestial Mirror",
      description: "Artisan-crafted moonphase design",
      price: 189
    },
    {
      id: 3,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
        "https://images.unsplash.com/photo-1617806118233-18e1de247200"
      ],
      title: "Botanical Relief",
      description: "3D floral wall sculpture",
      price: 175,
      isNew: true
    },
    {
      id: 4,
      images: [
        "https://images.unsplash.com/photo-1617806118233-18e1de247200",
        "https://images.unsplash.com/photo-1605792657660-596af9009e82",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
      ],
      title: "Zenith Vase Set",
      description: "Hand-thrown stoneware",
      price: 145
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 bg-[url('https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80')] bg-cover bg-fixed relative"
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50/95 via-cream-50/90 to-cream-50/80 backdrop-blur-[1px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-amber-900 mb-4"
          >
            Artisan's Selection
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-amber-800/80 max-w-2xl mx-auto"
          >
            Handcrafted pieces that tell a story
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ArtisProductCard
              key={product.id}
              images={product.images}
              title={product.title}
              description={product.description}
              price={product.price}
              isNew={product.isNew}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedCollection;