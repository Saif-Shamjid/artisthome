import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FiShoppingBag, FiEye, FiChevronRight, FiHeart, FiSearch, FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import ArtisProductCard from "./ArtisProductCard";
// Reusing your existing ArtisProductCard component


const AllProductsPage = () => {
  const [products, setProducts] = useState([
    // Expanded list of products (20+ items)
    {
      id: 1,
      images: ["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace","https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"],
      title: "Harmony Wall Panel",
      description: "Hand-carved teak with gold leaf",
      price: 249,
      category: "wall-art",
      material: "wood",
      isNew: false
    },
    {
      id: 2,
      images: ["https://images.unsplash.com/photo-1583845112203-454c5d27a0a5"],
      title: "Celestial Mirror",
      description: "Artisan-crafted moonphase design",
      price: 189,
      category: "decor",
      material: "metal",
      isNew: true
    },
    // Add 18+ more products with different categories/materials
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortOption, setSortOption] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Available filters
  const categories = [...new Set(products.map(p => p.category))];
  const materials = [...new Set(products.map(p => p.material))];

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
                          selectedCategories.includes(product.category);
    
    const matchesMaterial = selectedMaterials.length === 0 || 
                          selectedMaterials.includes(product.material);
    
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesMaterial && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortOption) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "newest": return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default: return 0; // featured order
    }
  });

  // Toggle filters
  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const toggleMaterial = (material) => {
    setSelectedMaterials(prev => 
      prev.includes(material) 
        ? prev.filter(m => m !== material) 
        : [...prev, material]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-cream-50 to-amber-50"
    >
        
      {/* Hero Section */}
      <div className="relative py-20 md:py-28 overflow-hidden">
  {/* Background Image with Gradient Overlay */}
  <div className="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80"
      alt="Artisan workshop background"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-br from-amber-900/90 to-amber-800/60"></div>
  </div>
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-amber-300/30"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-light text-cream-50 mb-4">
              Artisan Marketplace
            </h1>
            <p className="text-xl text-amber-200/90 max-w-3xl mx-auto">
              Discover our complete collection of handcrafted treasures
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Search and Filter Bar */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-center items-start md:items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-amber-700" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-3 w-full rounded-full border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/70 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-3 rounded-full border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/70 shadow-sm cursor-pointer"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FiChevronDown className="text-amber-700" />
                </div>
              </div>

              {/* Mobile Filter Button */}
              <button
                className="md:hidden flex items-center justify-center px-4 py-3 bg-amber-700 hover:bg-amber-800 text-cream-50 rounded-full shadow-sm"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <FiFilter className="mr-2" />
                Filters
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategories.length > 0 || selectedMaterials.length > 0 || priceRange[1] < 500) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedCategories.map(category => (
                <span 
                  key={category}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm"
                >
                  {category}
                  <button 
                    onClick={() => toggleCategory(category)}
                    className="ml-2 text-amber-600 hover:text-amber-800"
                  >
                    <FiX size={14} />
                  </button>
                </span>
              ))}
              {selectedMaterials.map(material => (
                <span 
                  key={material}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm"
                >
                  {material}
                  <button 
                    onClick={() => toggleMaterial(material)}
                    className="ml-2 text-amber-600 hover:text-amber-800"
                  >
                    <FiX size={14} />
                  </button>
                </span>
              ))}
              {priceRange[1] < 500 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm">
                  ${priceRange[0]} - ${priceRange[1]}
                  <button 
                    onClick={() => setPriceRange([0, 500])}
                    className="ml-2 text-amber-600 hover:text-amber-800"
                  >
                    <FiX size={14} />
                  </button>
                </span>
              )}
              <button 
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedMaterials([]);
                  setPriceRange([0, 500]);
                }}
                className="text-amber-700 hover:text-amber-900 text-sm font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-amber-200 shadow-sm sticky top-4">
              <h3 className="font-serif text-lg text-amber-900 mb-4">Filters</h3>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-amber-800 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <span className="ml-2 text-amber-800 capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-amber-800 mb-3">Materials</h4>
                <div className="space-y-2">
                  {materials.map(material => (
                    <label key={material} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                        checked={selectedMaterials.includes(material)}
                        onChange={() => toggleMaterial(material)}
                      />
                      <span className="ml-2 text-amber-800 capitalize">{material}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-amber-800 mb-3">Price Range</h4>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 text-sm text-amber-800">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
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
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-serif text-amber-800 mb-2">No products found</h3>
                <p className="text-amber-700/80 mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategories([]);
                    setSelectedMaterials([]);
                    setPriceRange([0, 500]);
                  }}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-cream-50 rounded-full text-sm"
                >
                  Reset filters
                </button>
              </div>
            )}

            {/* Pagination would go here */}
          </div>
        </div>
      </div>

      {/* Mobile Filters Panel */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed  inset-0 z-50 overflow-y-auto"
          >
            <div className="flex min-h-full">
              <div 
                className="fixed inset-0 bg-black/30"
                onClick={() => setMobileFiltersOpen(false)}
              />
              
              <div className="relative ml-auto w-full max-w-xs h-screen bg-cream-50 shadow-xl">
                <div className="flex items-center justify-between p-4 border-b border-amber-200">
                  <h3 className="font-serif text-lg text-amber-900">Filters</h3>
                  <button 
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1 text-amber-700 hover:text-amber-900"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-amber-800 mb-3">Categories</h4>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <label key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                          />
                          <span className="ml-2 text-amber-800 capitalize">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Materials */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-amber-800 mb-3">Materials</h4>
                    <div className="space-y-2">
                      {materials.map(material => (
                        <label key={material} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                            checked={selectedMaterials.includes(material)}
                            onChange={() => toggleMaterial(material)}
                          />
                          <span className="ml-2 text-amber-800 capitalize">{material}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-amber-800 mb-3">Price Range</h4>
                    <div className="px-2">
                      <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between mt-2 text-sm text-amber-800">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-cream-50 border-t border-amber-200">
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-cream-50 rounded-full font-medium"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AllProductsPage;