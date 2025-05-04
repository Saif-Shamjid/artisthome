import { useState, useRef } from "react";
import {
  FiTrash2,
  FiEdit,
  FiPlus,
  FiSave,
  FiImage,
  FiDollarSign,
  FiUpload,
} from "react-icons/fi";

const ProductManager = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Harmony Wall Panel",
      description: "Hand-carved teak wood panel with 24k gold leaf detailing",
      price: 249,
      originalPrice: 299,
      rating: 4.8,
      reviewCount: 124,
      images: [
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
      ],
      category: "Wall Art",
      isNew: true,
      stock: 15,
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    images: [],
    category: "",
    isNew: false,
    stock: 0,
  });
  const [currentImage, setCurrentImage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddImage = () => {
    if (currentImage.trim()) {
      setNewProduct((prev) => ({
        ...prev,
        images: [...prev.images, currentImage],
      }));
      setCurrentImage("");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // In a real app, you would upload to Cloudinary here
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result;
      setNewProduct((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }));
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddProduct = () => {
    if (newProduct.title.trim() && newProduct.images.length > 0) {
      const product = {
        ...newProduct,
        id: Date.now(),
        price: parseFloat(newProduct.price),
        originalPrice: parseFloat(newProduct.originalPrice),
        stock: parseInt(newProduct.stock),
        rating: 0,
        reviewCount: 0,
      };
      setProducts([...products, product]);
      resetForm();
    }
  };

  const handleUpdateProduct = () => {
    if (editingId && newProduct.title.trim() && newProduct.images.length > 0) {
      const updatedProduct = {
        ...newProduct,
        id: editingId,
        price: parseFloat(newProduct.price),
        originalPrice: parseFloat(newProduct.originalPrice),
        stock: parseInt(newProduct.stock),
      };
      setProducts(
        products.map((p) => (p.id === editingId ? updatedProduct : p))
      );
      setEditingId(null);
      resetForm();
    }
  };

  const handleEditProduct = (product) => {
    setEditingId(product.id);
    setNewProduct({
      ...product,
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      stock: product.stock.toString(),
    });
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const resetForm = () => {
    setNewProduct({
      title: "",
      description: "",
      price: "",
      originalPrice: "",
      images: [],
      category: "",
      isNew: false,
      stock: 0,
    });
    setCurrentImage("");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-4 sm:p-6">
      <h3 className="text-lg font-medium text-amber-900 mb-3 sm:mb-4">
        Manage Products
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">
              Product Title
            </label>
            <input
              type="text"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-amber-200 rounded-lg text-sm sm:text-base"
              placeholder="Harmony Wall Panel"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-amber-200 rounded-lg text-sm sm:text-base"
              placeholder="Hand-carved teak wood panel..."
              rows="4"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-amber-200 rounded-lg text-sm sm:text-base"
              placeholder="Wall Art"
            />
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-1">
                Price ($)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-amber-600 h-4 w-4" />
                </div>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-3 sm:pr-4 py-2 border border-amber-200 rounded-lg text-sm sm:text-base"
                  placeholder="249"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-1">
                Original Price ($)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-amber-600 h-4 w-4" />
                </div>
                <input
                  type="number"
                  name="originalPrice"
                  value={newProduct.originalPrice}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-3 sm:pr-4 py-2 border border-amber-200 rounded-lg text-sm sm:text-base"
                  placeholder="299"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleInputChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-amber-200 rounded-lg text-sm sm:text-base"
              placeholder="15"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isNew"
              name="isNew"
              checked={newProduct.isNew}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, isNew: e.target.checked }))
              }
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-amber-300 rounded"
            />
            <label
              htmlFor="isNew"
              className="ml-2 block text-sm text-amber-800"
            >
              Mark as New Arrival
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">
              Add Images
            </label>
            <div className="relative mb-2">
              <input
                type="text"
                value={currentImage}
                onChange={(e) => setCurrentImage(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-amber-200 rounded-lg text-sm sm:text-base pr-10"
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
            <button
              onClick={handleAddImage}
              disabled={!currentImage.trim()}
              className="px-3 py-2 bg-amber-700 hover:bg-amber-800 disabled:bg-amber-400 text-white rounded-lg text-sm sm:text-base transition-colors"
            >
              Add Image
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {newProduct.images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  alt={`Preview ${index}`}
                  className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded border border-amber-200"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/100?text=Image+Error")
                  }
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 p-0.5 sm:p-1 bg-red-500 text-white rounded-full text-xs"
                >
                  <FiTrash2 className="h-2 w-2 sm:h-3 sm:w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-4 sm:mb-6">
        {editingId ? (
          <button
            onClick={handleUpdateProduct}
            disabled={
              !newProduct.title.trim() || newProduct.images.length === 0
            }
            className="px-3 py-2 sm:px-4 sm:py-2 bg-amber-700 hover:bg-amber-800 disabled:bg-amber-400 text-white rounded-lg flex items-center justify-center text-sm sm:text-base transition-colors"
          >
            <FiSave className="mr-1 sm:mr-2" /> Update Product
          </button>
        ) : (
          <button
            onClick={handleAddProduct}
            disabled={
              !newProduct.title.trim() || newProduct.images.length === 0
            }
            className="px-3 py-2 sm:px-4 sm:py-2 bg-amber-700 hover:bg-amber-800 disabled:bg-amber-400 text-white rounded-lg flex items-center justify-center text-sm sm:text-base transition-colors"
          >
            <FiPlus className="mr-1 sm:mr-2" /> Add Product
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-amber-200">
          <thead className="bg-amber-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider hidden sm:table-cell">
                Stock
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider hidden sm:table-cell">
                Status
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-amber-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="h-10 w-10 rounded object-cover"
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/100?text=Image+Error")
                        }
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-amber-900">
                        {product.title}
                      </div>
                      <div className="text-xs sm:text-sm text-amber-800/80 line-clamp-1">
                        {product.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                  ${product.price}{" "}
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-amber-600 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-amber-900 hidden sm:table-cell">
                  {product.stock}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  {product.isNew ? (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                      New
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                      Regular
                    </span>
                  )}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-amber-600 hover:text-amber-900 mr-2 sm:mr-3"
                  >
                    <FiEdit className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManager;
