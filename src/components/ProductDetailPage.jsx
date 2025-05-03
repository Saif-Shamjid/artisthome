import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiShoppingBag,
  FiHeart,
  FiChevronLeft,
  FiShare2,
  FiStar,
  FiChevronRight,
} from "react-icons/fi";

const ProductDetailPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // Sample product data - replace with your actual data fetching
  const productData = {
    id: 1,
    title: "Harmony Wall Panel",
    description:
      "Hand-carved teak wood panel with 24k gold leaf detailing. Each piece is individually crafted by our master artisans in Bali.",
    price: 249,
    originalPrice: 299,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
    ],
    colors: ["Natural Teak", "Ebony Stain", "Gold Accent"],
    sizes: ["Small (12x12in)", "Medium (24x24in)", "Large (36x36in)"],
    details: [
      "Handcrafted from sustainable teak wood",
      "24k gold leaf accents",
      "Includes mounting hardware",
      "Made-to-order (2-3 week production time)",
      "Each piece is unique with natural wood variations",
    ],
    shippingInfo:
      "Free shipping worldwide. Ships in 3-5 business days after production.",
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productData.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + productData.images.length) % productData.images.length
    );
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added to cart: ${quantity} ${productData.title}`);
  };

  const handleGoBack = () => {
    window.history.back();
    // need to edit  this think
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-cream-50/95 via-cream-50/90 to-cream-50/80"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Back button */}
        <motion.button
          onClick={handleGoBack}
          className="flex items-center text-amber-700 mb-6"
          whileHover={{ x: -2 }}
        >
          <FiChevronLeft className="mr-1" />
          Back to Collection
        </motion.button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="relative h-full">
              <div className="sticky top-0">
                <div className="relative aspect-square overflow-hidden bg-amber-50">
                  <motion.img
                    key={currentImageIndex}
                    src={productData.images[currentImageIndex]}
                    alt={productData.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Navigation arrows */}
                  {productData.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm"
                      >
                        <FiChevronRight className="rotate-180" size={20} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm"
                      >
                        <FiChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Image counter */}
                  {productData.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 text-cream-50 px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                      {currentImageIndex + 1}/{productData.images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail gallery */}
                <div className="grid grid-cols-4 gap-2 mt-4 px-4 pb-4">
                  {productData.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square overflow-hidden rounded-lg border-2 ${
                        currentImageIndex === index
                          ? "border-amber-700"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="font-serif text-3xl text-amber-900 mb-2">
                    {productData.title}
                  </h1>
                  <div className="flex items-center mb-4">
                    <div className="flex text-amber-600 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={
                            i < Math.floor(productData.rating)
                              ? "fill-current"
                              : ""
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-amber-800">
                      {productData.rating} ({productData.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="p-2 text-amber-800 hover:text-amber-700">
                    <FiShare2 size={20} />
                  </button>
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 ${
                      isLiked
                        ? "text-red-500"
                        : "text-amber-800 hover:text-amber-700"
                    }`}
                  >
                    <FiHeart
                      size={20}
                      className={isLiked ? "fill-current" : ""}
                    />
                  </button>
                </div>
              </div>

              <div className="my-6">
                <div className="flex items-center">
                  <span className="font-serif text-3xl text-amber-900 mr-4">
                    ${productData.price}
                  </span>
                  {productData.originalPrice && (
                    <span className="text-lg text-amber-800/70 line-through">
                      ${productData.originalPrice}
                    </span>
                  )}
                </div>
                {productData.originalPrice && (
                  <span className="inline-block mt-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                    {Math.round(
                      (1 - productData.price / productData.originalPrice) * 100
                    )}
                    % OFF
                  </span>
                )}
              </div>

              <p className="text-amber-800 mb-8">{productData.description}</p>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="font-serif text-lg text-amber-900 mb-3">
                  Color
                </h3>
                <div className="flex flex-wrap gap-2">
                  {productData.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full border ${
                        selectedColor === color
                          ? "border-amber-700 bg-amber-100"
                          : "border-amber-200 hover:bg-amber-50"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="font-serif text-lg text-amber-900 mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {productData.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full border ${
                        selectedSize === size
                          ? "border-amber-700 bg-amber-100"
                          : "border-amber-200 hover:bg-amber-50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="font-serif text-lg text-amber-900 mb-3">
                  Quantity
                </h3>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 border border-amber-200 rounded-l-full hover:bg-amber-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-t border-b border-amber-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 border border-amber-200 rounded-r-full hover:bg-amber-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center bg-amber-700 hover:bg-amber-800 text-cream-50 px-6 py-3 rounded-full font-medium transition-colors"
                >
                  <FiShoppingBag className="mr-2" />
                  Add to Cart
                </button>
                <button className="flex items-center justify-center bg-white border border-amber-700 text-amber-700 hover:bg-amber-50 px-6 py-3 rounded-full font-medium transition-colors">
                  Buy Now
                </button>
              </div>

              {/* Product Details */}
              <div className="mb-12">
                <h3 className="font-serif text-xl text-amber-900 mb-4">
                  Product Details
                </h3>
                <ul className="space-y-2 text-amber-800">
                  {productData.details.map((detail, i) => (
                    <li key={i} className="flex">
                      <span className="mr-2">•</span> {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shipping Info */}
              <div className="p-4 bg-amber-50 rounded-lg">
                <h4 className="font-serif text-lg text-amber-900 mb-2">
                  Shipping & Returns
                </h4>
                <p className="text-amber-800">{productData.shippingInfo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;
