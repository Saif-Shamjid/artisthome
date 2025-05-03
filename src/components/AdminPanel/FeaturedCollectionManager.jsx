import { useState, useEffect } from 'react';
import { FiCheck, FiX, FiSave } from 'react-icons/fi';

const FeaturedCollectionManager = ({ products }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);

  useEffect(() => {
    // Filter out products that are already featured
    const nonFeatured = products.filter(
      product => !featuredProducts.some(fp => fp.id === product.id)
    );
    setAvailableProducts(nonFeatured);
  }, [products, featuredProducts]);

  const handleAddFeatured = (product) => {
    if (featuredProducts.length < 4) {
      setFeaturedProducts([...featuredProducts, product]);
    }
  };

  const handleRemoveFeatured = (productId) => {
    setFeaturedProducts(featuredProducts.filter(p => p.id !== productId));
  };

  const handleSaveFeatured = () => {
    // API call to save featured products
    console.log("Saving featured products:", featuredProducts);
    alert('Featured collection updated successfully!');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-amber-900">Featured Collection</h3>
        <button
          onClick={handleSaveFeatured}
          disabled={featuredProducts.length === 0}
          className={`px-4 py-2 rounded-lg flex items-center ${
            featuredProducts.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-amber-700 hover:bg-amber-800 text-cream-50'
          }`}
        >
          <FiSave className="mr-2" /> Save Changes
        </button>
      </div>

      <div className="mb-8">
        <h4 className="text-sm font-medium text-amber-800 mb-3">Current Featured Products ({featuredProducts.length}/4)</h4>
        {featuredProducts.length === 0 ? (
          <p className="text-amber-800/80">No products selected</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map(product => (
              <div key={product.id} className="border border-amber-200 rounded-lg p-3 relative">
                <div className="h-32 bg-amber-50 mb-2 overflow-hidden rounded">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=Product'}
                  />
                </div>
                <h4 className="font-medium text-amber-900 truncate">{product.title}</h4>
                <p className="text-sm text-amber-800/80">${product.price}</p>
                <button
                  onClick={() => handleRemoveFeatured(product.id)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                >
                  <FiX size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h4 className="text-sm font-medium text-amber-800 mb-3">Available Products</h4>
        {availableProducts.length === 0 ? (
          <p className="text-amber-800/80">No products available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableProducts.map(product => (
              <div key={product.id} className="border border-amber-200 rounded-lg p-3">
                <div className="h-32 bg-amber-50 mb-2 overflow-hidden rounded">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=Product'}
                  />
                </div>
                <h4 className="font-medium text-amber-900 truncate">{product.title}</h4>
                <p className="text-sm text-amber-800/80">${product.price}</p>
                <button
                  onClick={() => handleAddFeatured(product)}
                  disabled={featuredProducts.length >= 4}
                  className={`mt-2 w-full py-1 rounded text-sm flex items-center justify-center ${
                    featuredProducts.length >= 4
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                  }`}
                >
                  <FiCheck className="mr-1" /> Add to Featured
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