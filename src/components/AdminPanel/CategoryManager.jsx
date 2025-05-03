import { useState } from 'react';
import { FiTrash2, FiEdit, FiPlus, FiSave } from 'react-icons/fi';

const CategoryManager = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Wall Art",
      description: "Handcrafted artistic wall panels and decorations",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
      link: "/products/wall-art",
      color: "from-amber-600/20 to-amber-800/80"
    },
    {
      id: 2,
      name: "Home Decor",
      description: "Beautiful decor items for your living space",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      link: "/products/home-decor",
      color: "from-teal-600/20 to-teal-800/80"
    }
  ]);

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    image: '',
    link: '',
    color: 'from-amber-600/20 to-amber-800/80'
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = () => {
    if (newCategory.name.trim() && newCategory.image.trim()) {
      const category = {
        ...newCategory,
        id: Date.now()
      };
      setCategories([...categories, category]);
      setNewCategory({
        name: '',
        description: '',
        image: '',
        link: '',
        color: 'from-amber-600/20 to-amber-800/80'
      });
    }
  };

  const handleUpdateCategory = () => {
    if (editingId && newCategory.name.trim() && newCategory.image.trim()) {
      setCategories(categories.map(cat => 
        cat.id === editingId ? { ...newCategory, id: editingId } : cat
      ));
      setEditingId(null);
      setNewCategory({
        name: '',
        description: '',
        image: '',
        link: '',
        color: 'from-amber-600/20 to-amber-800/80'
      });
    }
  };

  const handleEditCategory = (category) => {
    setEditingId(category.id);
    setNewCategory({ ...category });
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6">
      <h3 className="text-lg font-medium text-amber-900 mb-4">Manage Categories</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-1">Category Name</label>
          <input
            type="text"
            name="name"
            value={newCategory.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-amber-200 rounded-lg mb-3"
            placeholder="Wall Art"
          />
          
          <label className="block text-sm font-medium text-amber-800 mb-1">Description</label>
          <textarea
            name="description"
            value={newCategory.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-amber-200 rounded-lg mb-3"
            placeholder="Handcrafted artistic wall panels..."
            rows="3"
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={newCategory.image}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-amber-200 rounded-lg mb-3"
            placeholder="https://example.com/image.jpg"
          />
          
          <label className="block text-sm font-medium text-amber-800 mb-1">Link</label>
          <input
            type="text"
            name="link"
            value={newCategory.link}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-amber-200 rounded-lg mb-3"
            placeholder="/products/wall-art"
          />
          
          <label className="block text-sm font-medium text-amber-800 mb-1">Gradient Color</label>
          <select
            name="color"
            value={newCategory.color}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-amber-200 rounded-lg"
          >
            <option value="from-amber-600/20 to-amber-800/80">Amber Gradient</option>
            <option value="from-teal-600/20 to-teal-800/80">Teal Gradient</option>
            <option value="from-rose-600/20 to-rose-800/80">Rose Gradient</option>
            <option value="from-indigo-600/20 to-indigo-800/80">Indigo Gradient</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end mb-6">
        {editingId ? (
          <button
            onClick={handleUpdateCategory}
            className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-cream-50 rounded-lg flex items-center"
          >
            <FiSave className="mr-2" /> Update Category
          </button>
        ) : (
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-cream-50 rounded-lg flex items-center"
          >
            <FiPlus className="mr-2" /> Add Category
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(category => (
          <div key={category.id} className="border border-amber-200 rounded-lg overflow-hidden">
            <div className={`h-32 bg-gradient-to-br ${category.color} relative`}>
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover"
                onError={(e) => e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found'}
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="p-2 bg-white/80 hover:bg-white rounded-full shadow-sm"
                >
                  <FiEdit className="text-amber-700" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-2 bg-white/80 hover:bg-white rounded-full shadow-sm"
                >
                  <FiTrash2 className="text-red-500" />
                </button>
              </div>
            </div>
            <div className="p-3 bg-white">
              <h4 className="font-medium text-amber-900">{category.name}</h4>
              <p className="text-sm text-amber-800/80 mt-1">{category.description}</p>
              <p className="text-xs text-amber-700 mt-2">{category.link}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;