import { useState, useRef } from "react";
import { FiUpload, FiTrash2, FiEdit, FiPlus, FiSave } from "react-icons/fi";

const FacebookSectionManager = () => {
  const [facebookImages, setFacebookImages] = useState([
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  ]);
  const [newImage, setNewImage] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddImage = () => {
    if (newImage.trim()) {
      setFacebookImages([...facebookImages, newImage]);
      setNewImage("");
    }
  };

  const handleUpdateImage = () => {
    if (newImage.trim() && editingIndex !== null) {
      const updatedImages = [...facebookImages];
      updatedImages[editingIndex] = newImage;
      setFacebookImages(updatedImages);
      setEditingIndex(null);
      setNewImage("");
    }
  };

  const handleDeleteImage = (index) => {
    setFacebookImages(facebookImages.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    // Simulate file upload (in a real app, you would upload to your server)
    setTimeout(() => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setFacebookImages([...facebookImages, imageUrl]);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-4 sm:p-6">
      <h3 className="text-lg font-medium text-amber-900 mb-3 sm:mb-4">
        Manage Facebook Section Images
      </h3>

      <div className="mb-4 sm:mb-6">
        <label className="block text-sm font-medium text-amber-800 mb-1 sm:mb-2">
          Add Image
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder="Enter image URL or upload"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base pr-10"
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
          {editingIndex === null ? (
            <button
              onClick={handleAddImage}
              disabled={!newImage.trim()}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-amber-700 hover:bg-amber-800 disabled:bg-amber-400 text-white rounded-lg flex items-center justify-center text-sm sm:text-base transition-colors"
            >
              <FiPlus className="mr-1 sm:mr-2" /> Add
            </button>
          ) : (
            <button
              onClick={handleUpdateImage}
              disabled={!newImage.trim()}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-amber-700 hover:bg-amber-800 disabled:bg-amber-400 text-white rounded-lg flex items-center justify-center text-sm sm:text-base transition-colors"
            >
              <FiEdit className="mr-1 sm:mr-2" /> Update
            </button>
          )}
        </div>
        <p className="text-xs text-amber-600 mt-1">
          Paste a URL or click the upload icon to select an image
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {facebookImages.map((image, index) => (
          <div
            key={index}
            className="border border-amber-200 rounded-lg overflow-hidden"
          >
            <div className="h-40 sm:h-48 bg-amber-100 relative">
              <img
                src={image}
                alt={`Facebook ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/400x300?text=Image+Not+Found")
                }
              />
              <div className="absolute top-2 right-2 flex gap-1 sm:gap-2">
                <button
                  onClick={() => {
                    setEditingIndex(index);
                    setNewImage(image);
                  }}
                  className="p-1 sm:p-2 bg-white/80 hover:bg-white rounded-full shadow-sm"
                >
                  <FiEdit className="text-amber-700 h-3 w-3 sm:h-4 sm:w-4" />
                </button>
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="p-1 sm:p-2 bg-white/80 hover:bg-white rounded-full shadow-sm"
                >
                  <FiTrash2 className="text-red-500 h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
            <div className="p-2 sm:p-3 bg-white">
              <p className="text-xs sm:text-sm text-amber-800 truncate">
                {image.length > 50 ? `${image.substring(0, 50)}...` : image}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacebookSectionManager;
