import { useState } from 'react';
import { FiUpload, FiTrash2, FiEdit, FiPlus } from 'react-icons/fi';

const FacebookSectionManager = () => {
  const [facebookImages, setFacebookImages] = useState([
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
  ]);
  const [newImage, setNewImage] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddImage = () => {
    if (newImage.trim()) {
      setFacebookImages([...facebookImages, newImage]);
      setNewImage('');
    }
  };

  const handleUpdateImage = () => {
    if (newImage.trim() && editingIndex !== null) {
      const updatedImages = [...facebookImages];
      updatedImages[editingIndex] = newImage;
      setFacebookImages(updatedImages);
      setEditingIndex(null);
      setNewImage('');
    }
  };

  const handleDeleteImage = (index) => {
    setFacebookImages(facebookImages.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6">
      <h3 className="text-lg font-medium text-amber-900 mb-4">Manage Facebook Section Images</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-amber-800 mb-2">Add/Edit Image URL</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            placeholder="Enter image URL"
            className="flex-1 px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
          {editingIndex === null ? (
            <button
              onClick={handleAddImage}
              className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-cream-50 rounded-lg flex items-center"
            >
              <FiPlus className="mr-2" /> Add
            </button>
          ) : (
            <button
              onClick={handleUpdateImage}
              className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-cream-50 rounded-lg flex items-center"
            >
              <FiEdit className="mr-2" /> Update
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {facebookImages.map((image, index) => (
          <div key={index} className="border border-amber-200 rounded-lg overflow-hidden">
            <div className="h-48 bg-amber-100 relative">
              <img 
                src={image} 
                alt={`Facebook ${index + 1}`} 
                className="w-full h-full object-cover"
                onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'}
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => {
                    setEditingIndex(index);
                    setNewImage(image);
                  }}
                  className="p-2 bg-white/80 hover:bg-white rounded-full shadow-sm"
                >
                  <FiEdit className="text-amber-700" />
                </button>
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="p-2 bg-white/80 hover:bg-white rounded-full shadow-sm"
                >
                  <FiTrash2 className="text-red-500" />
                </button>
              </div>
            </div>
            <div className="p-3 bg-white">
              <p className="text-sm text-amber-800 truncate">{image}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacebookSectionManager;