import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FiShoppingBag, FiEye, FiChevronRight, FiHeart } from "react-icons/fi";

const ArtisProductCard = ({
  images,
  title,
  description,
  price,
  isNew = false,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Auto-rotate images every 7 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length, currentImageIndex]); // Added currentImageIndex to reset timer on manual change

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Touch event handlers for swipe gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const difference = touchStartX.current - touchEndX.current;

    // Minimum swipe distance threshold
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        // Swipe left - next image
        handleNextImage();
      } else {
        // Swipe right - previous image
        handlePrevImage();
      }
    }

    // Reset values
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative h-full"
    >
      <div
        className="relative h-full overflow-hidden rounded-2xl border-2 border-amber-200/30 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Dynamic image gallery with swipe support */}
        <div
          className="relative aspect-square overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                filter: isHovered ? "brightness(1.05)" : "brightness(1)",
              }}
              exit={{ opacity: 0, scale: 1.1, rotate: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <img
                src={images[currentImageIndex]}
                alt={`${title} - View ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          {images.length > 1 && isHovered && (
            <>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiChevronRight className="rotate-180" />
              </motion.button>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiChevronRight />
              </motion.button>
            </>
          )}

          {/* Badges */}
          {isNew && (
            <motion.div
              className="absolute top-4 left-4 bg-amber-700 hover:bg-amber-800 text-cream-50 px-3 py-1 rounded-full text-xs font-medium shadow-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              New Arrival
            </motion.div>
          )}

          {/* Like button */}
          <motion.button
            className={`absolute top-4 right-4 p-2 rounded-full ${
              isLiked ? "text-red-500" : "text-white/80 hover:text-white"
            } bg-black/30 backdrop-blur-sm`}
            onClick={() => setIsLiked(!isLiked)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiHeart className={isLiked ? "fill-current" : ""} />
          </motion.button>

          {/* Image counter */}
          {images.length > 1 && (
            <motion.div
              className="absolute bottom-4 right-4 bg-black/50 text-cream-50 px-2 py-1 rounded-full text-xs backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {currentImageIndex + 1}/{images.length}
            </motion.div>
          )}
        </div>

        {/* Product info */}
        <div className="p-5 flex flex-col">
          <div className="mb-3">
            <motion.h3
              className="font-serif text-xl text-amber-900"
              whileHover={{ x: 2 }}
            >
              {title}
            </motion.h3>
            <motion.p
              className="text-sm text-amber-800/80"
              whileHover={{ x: 2 }}
            >
              {description}
            </motion.p>
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <motion.span
                className="font-serif text-lg text-amber-900"
                whileHover={{ scale: 1.05 }}
              >
                ${price}
              </motion.span>
              <motion.div
                className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                Free Shipping
              </motion.div>
            </div>

            {/* Dual action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <motion.a
                href={`/products/${title.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center justify-center space-x-2 bg-white text-amber-900 border border-amber-900/20 hover:bg-amber-50 px-4 py-2 rounded-full text-sm transition-colors relative overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center">
                  <FiEye size={14} className="mr-2" />
                  View
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-50 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.a>

              <motion.button
                className="flex items-center justify-center space-x-2 bg-amber-700 hover:bg-amber-800 text-cream-50 px-4 py-2 rounded-full text-sm relative overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative text-[8px] lg:text-[9px]  z-10 flex items-center">
                  <FiShoppingBag size={14} className="mr-2" />
                  Add to Cart
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-amber-700/30 to-amber-800/30 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Artistic floating elements */}
        <motion.div
          className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-amber-300/20 pointer-events-none"
          animate={{
            y: [0, 15, 0],
            x: [0, -5, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full bg-amber-600/10 pointer-events-none"
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
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
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6",
      ],
      title: "Harmony Wall Panel",
      description: "Hand-carved teak with gold leaf",
      price: 249,
      isNew: false,
    },
    {
      id: 2,
      images: [
        "https://images.unsplash.com/photo-1583845112203-454c5d27a0a5",
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c",
      ],
      title: "Celestial Mirror",
      description: "Artisan-crafted moonphase design",
      price: 189,
    },
    {
      id: 3,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
        "https://images.unsplash.com/photo-1617806118233-18e1de247200",
      ],
      title: "Botanical Relief",
      description: "3D floral wall sculpture",
      price: 175,
      isNew: false,
    },
    {
      id: 4,
      images: [
        "https://images.unsplash.com/photo-1617806118233-18e1de247200",
        "https://images.unsplash.com/photo-1605792657660-596af9009e82",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
      ],
      title: "Zenith Vase Set",
      description: "Hand-thrown stoneware",
      price: 145,
    },
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

        {/* View all button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/shop"
            className="inline-flex items-center px-6 py-3 bg-amber-700 hover:bg-amber-800 text-cream-50 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Collections
            <FiChevronRight className="ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturedCollection;
