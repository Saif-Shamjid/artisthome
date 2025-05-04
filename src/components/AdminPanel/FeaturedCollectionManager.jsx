import { useState, useEffect, useRef } from "react";
import {
  FiCheck,
  FiX,
  FiSave,
  FiLoader,
  FiPlus,
  FiSearch,
  FiUpload,
  FiDollarSign,
} from "react-icons/fi";

const FeaturedCollectionManager = () => {
  // Dummy product data
  const [allProducts, setAllProducts] = useState([
    {
      id: 1,
      title: "Harmony Wall Panel",
      description: "Hand-carved teak wood panel with gold leaf detailing",
      price: 249,
      images: ["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"],
    },
    {
      id: 2,
      title: "Celestial Mirror",
      description: "Round mirror with celestial-inspired metal frame",
      price: 189,
      images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7"],
    },
    {
      id: 3,
      title: "Woven Rattan Basket",
      description: "Handwoven natural rattan storage basket",
      price: 79,
      images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c"],
    },
  ]);

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });
  const fileInputRef = useRef(null);

  // Load initial data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setFeaturedProducts(allProducts.slice(0, 2));
      setIsLoading(false);
    }, 500);
  }, []);

  // Filter available products
  const availableProducts = allProducts
    .filter((product) => !featuredProducts.some((fp) => fp.id === product.id))
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Product management functions
  const handleAddFeatured = (product) => {
    if (featuredProducts.length < 4) {
      setFeaturedProducts([...featuredProducts, product]);
    }
  };

  const handleRemoveFeatured = (productId) => {
    setFeaturedProducts(featuredProducts.filter((p) => p.id !== productId));
  };

  const handleSaveFeatured = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert("Featured products saved successfully!");
  };

  // New product functions
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // In a real app, upload to Cloudinary and get URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct({ ...newProduct, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleAddNewProduct = () => {
    if (newProduct.title && newProduct.price && newProduct.image) {
      const product = {
        id: Date.now(),
        ...newProduct,
        price: parseFloat(newProduct.price),
        images: [newProduct.image],
      };
      setAllProducts([...allProducts, product]);
      setNewProduct({ title: "", description: "", price: "", image: "" });
      setShowAddForm(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6 flex justify-center items-center h-64">
        <FiLoader className="animate-spin text-amber-600 text-2xl" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-4 sm:p-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
        <h3 className="text-lg font-medium text-amber-900">
          Featured Collection
        </h3>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg flex items-center text-sm transition-colors"
          >
            <FiPlus className="mr-1" /> {showAddForm ? "Cancel" : "Add Product"}
          </button>
          <button
            onClick={handleSaveFeatured}
            disabled={featuredProducts.length === 0 || isSaving}
            className={`px-3 py-2 rounded-lg flex items-center text-sm transition-colors ${
              featuredProducts.length === 0 || isSaving
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-amber-700 hover:bg-amber-800 text-white"
            }`}
          >
            {isSaving ? (
              <FiLoader className="animate-spin mr-1" />
            ) : (
              <FiSave className="mr-1" />
            )}
            Save
          </button>
        </div>
      </div>

      {/* Add New Product Form */}
      {showAddForm && (
        <div className="mb-6 p-4 sm:p-6 bg-amber-50 rounded-lg border border-amber-100">
          <h4 className="text-sm font-medium text-amber-800 mb-4">
            Add New Product
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-amber-800 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={newProduct.title}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, title: e.target.value })
                  }
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-amber-200 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-amber-800 mb-1">
                  Price ($)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="text-amber-600 h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    className="w-full pl-8 pr-3 sm:pr-4 py-2 border border-amber-200 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-amber-800 mb-1">
                  Image
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={newProduct.image}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, image: e.target.value })
                    }
                    className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-amber-200 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 pr-10"
                    placeholder="Enter URL or upload"
                  />
                  <button
                    onClick={triggerFileInput}
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-amber-600 hover:text-amber-800"
                    title="Upload image"
                  >
                    <FiUpload className="h-4 w-4" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-amber-800 mb-1">
                  Description
                </label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-amber-200 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Enter product description"
                  rows="3"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAddNewProduct}
              disabled={
                !newProduct.title || !newProduct.price || !newProduct.image
              }
              className={`px-4 py-2 rounded-lg flex items-center text-xs sm:text-sm transition-colors ${
                !newProduct.title || !newProduct.price || !newProduct.image
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-amber-700 hover:bg-amber-800 text-white"
              }`}
            >
              <FiPlus className="mr-1" /> Add Product
            </button>
          </div>

          {newProduct.image && (
            <div className="mt-4">
              <label className="block text-xs sm:text-sm font-medium text-amber-800 mb-1">
                Image Preview
              </label>
              <div className="w-24 h-24 border border-amber-200 rounded overflow-hidden">
                <img
                  src={newProduct.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/100?text=Image+Error")
                  }
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Current Featured Products */}
      <div className="mb-6">
        <h4 className="text-xs sm:text-sm font-medium text-amber-800 mb-2 sm:mb-3">
          Featured Products ({featuredProducts.length}/4)
        </h4>
        {featuredProducts.length === 0 ? (
          <p className="text-xs sm:text-sm text-amber-800/80">
            No featured products selected
          </p>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="border border-amber-200 rounded-lg p-2 sm:p-3 relative group hover:shadow-sm transition-shadow"
              >
                <div className="h-28 sm:h-32 bg-amber-50 mb-2 overflow-hidden rounded">
                  <img
                    src={
                      product.images[0] ||
                      "https://via.placeholder.com/300?text=Product"
                    }
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h4 className="font-medium text-xs sm:text-sm text-amber-900 truncate">
                  {product.title}
                </h4>
                <p className="text-xs text-amber-800/80">${product.price}</p>
                <button
                  onClick={() => handleRemoveFeatured(product.id)}
                  className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Products with Search */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-3">
          <h4 className="text-xs sm:text-sm font-medium text-amber-800">
            Available Products ({availableProducts.length})
          </h4>
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-amber-500 h-3 w-3 sm:h-4 sm:w-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full px-3 py-2 border border-amber-200 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Search products..."
            />
          </div>
        </div>

        {availableProducts.length === 0 ? (
          <p className="text-xs sm:text-sm text-amber-800/80">
            No products available
          </p>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {availableProducts.map((product) => (
              <div
                key={product.id}
                className="border border-amber-200 rounded-lg p-2 sm:p-3 group hover:shadow-sm transition-shadow"
              >
                <div className="h-28 sm:h-32 bg-amber-50 mb-2 overflow-hidden rounded">
                  <img
                    src={
                      product.images[0] ||
                      "https://via.placeholder.com/300?text=Product"
                    }
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h4 className="font-medium text-xs sm:text-sm text-amber-900 truncate">
                  {product.title}
                </h4>
                <p className="text-xs text-amber-800/80">${product.price}</p>
                <button
                  onClick={() => handleAddFeatured(product)}
                  disabled={featuredProducts.length >= 4}
                  className={`mt-2 w-full py-1 rounded text-xs flex items-center justify-center transition-colors ${
                    featuredProducts.length >= 4
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-amber-100 hover:bg-amber-200 text-amber-800"
                  }`}
                >
                  <FiCheck className="mr-1 h-3 w-3" /> Add
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedCollectionManager;
