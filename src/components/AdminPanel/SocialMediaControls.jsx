import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookMessenger, FaWhatsapp, FaComments, FaSave, FaEdit, FaTimes } from 'react-icons/fa';

const SocialMediaControls = () => {
  const [socialLinks, setSocialLinks] = useState({
    messenger: 'https://m.me/yourpagename',
    whatsapp: 'https://wa.me/yourphonenumber',
    facebook: 'https://facebook.com/yourpage'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempLinks, setTempLinks] = useState({ ...socialLinks });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Load from backend in production
    const savedLinks = localStorage.getItem('socialMediaLinks');
    if (savedLinks) {
      setSocialLinks(JSON.parse(savedLinks));
    }
  }, []);

  const handleEditClick = () => {
    setTempLinks({ ...socialLinks });
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    setSocialLinks({ ...tempLinks });
    localStorage.setItem('socialMediaLinks', JSON.stringify(tempLinks));
    setIsEditing(false);
  };

  const handleInputChange = (platform, value) => {
    setTempLinks({
      ...tempLinks,
      [platform]: value
    });
  };

  const itemVariants = {
    hover: { scale: 1.02 }
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Header with responsive buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-serif font-medium text-amber-800">Social Media Controls</h2>
        
        <div className="flex gap-2 w-full sm:w-auto">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveClick}
                className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-sm sm:text-base"
              >
                <FaSave className="mr-1 sm:mr-2" /> 
                {isMobile ? 'Save' : 'Save Changes'}
              </button>
              <button
                onClick={handleCancelClick}
                className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm sm:text-base"
              >
                <FaTimes className="mr-1 sm:mr-2" />
                {isMobile ? 'Cancel' : 'Cancel'}
              </button>
            </>
          ) : (
            <button
              onClick={handleEditClick}
              className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg text-sm sm:text-base"
            >
              <FaEdit className="mr-1 sm:mr-2" />
              {isMobile ? 'Edit' : 'Edit Links'}
            </button>
          )}
        </div>
      </div>

      {/* Cards Grid - responsive layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6"
      >
        {/* Messenger Card */}
        <motion.div
          variants={itemVariants}
          whileHover={!isMobile ? "hover" : {}}
          className="bg-cream-50/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-amber-200 hover:bg-cream-50 transition-all group relative"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 flex items-center justify-center mr-0 sm:mr-4 group-hover:bg-blue-200 transition-all flex-shrink-0">
              <FaFacebookMessenger className="text-blue-500 text-xl sm:text-2xl" />
            </div>
            <div className="flex-1 w-full">
              <h3 className="text-lg sm:text-xl font-serif font-medium text-amber-800 mb-1">Messenger Support</h3>
              <p className="text-amber-800/80 mb-3 sm:mb-4 text-sm sm:text-base">Real-time customer support</p>
              
              {isEditing ? (
                <div className="mt-2">
                  <label className="block text-xs text-amber-800/80 mb-1">Link URL</label>
                  <input
                    type="text"
                    value={tempLinks.messenger}
                    onChange={(e) => handleInputChange('messenger', e.target.value)}
                    className="w-full px-3 py-2 border border-amber-200 rounded-lg text-sm"
                  />
                </div>
              ) : (
                <a 
                  href={socialLinks.messenger} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full sm:w-auto text-center px-4 sm:px-6 py-2 sm:py-3 bg-cream-50 hover:bg-white text-amber-800 rounded-lg font-medium shadow-md transition-all text-sm sm:text-base"
                >
                  {isMobile ? 'Message Us' : 'Chat on Messenger'}
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* WhatsApp Card */}
        <motion.div
          variants={itemVariants}
          whileHover={!isMobile ? "hover" : {}}
          className="bg-cream-50/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-amber-200 hover:bg-cream-50 transition-all group relative"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-100 flex items-center justify-center mr-0 sm:mr-4 group-hover:bg-green-200 transition-all flex-shrink-0">
              <FaWhatsapp className="text-green-500 text-xl sm:text-2xl" />
            </div>
            <div className="flex-1 w-full">
              <h3 className="text-lg sm:text-xl font-serif font-medium text-amber-800 mb-1">WhatsApp Orders</h3>
              <p className="text-amber-800/80 mb-3 sm:mb-4 text-sm sm:text-base">Fast order confirmations</p>
              
              {isEditing ? (
                <div className="mt-2">
                  <label className="block text-xs text-amber-800/80 mb-1">Link URL</label>
                  <input
                    type="text"
                    value={tempLinks.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    className="w-full px-3 py-2 border border-amber-200 rounded-lg text-sm"
                  />
                </div>
              ) : (
                <a 
                  href={socialLinks.whatsapp} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full sm:w-auto text-center px-4 sm:px-6 py-2 sm:py-3 bg-cream-50 hover:bg-white text-amber-800 rounded-lg font-medium shadow-md transition-all text-sm sm:text-base"
                >
                  {isMobile ? 'Message Us' : 'Chat on WhatsApp'}
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Facebook Card */}
        <motion.div
          variants={itemVariants}
          whileHover={!isMobile ? "hover" : {}}
          className="bg-cream-50/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-amber-200 hover:bg-cream-50 transition-all group relative md:col-span-2 lg:col-span-1"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 flex items-center justify-center mr-0 sm:mr-4 group-hover:bg-blue-200 transition-all flex-shrink-0">
              <FaComments className="text-blue-500 text-xl sm:text-2xl" />
            </div>
            <div className="flex-1 w-full">
              <h3 className="text-lg sm:text-xl font-serif font-medium text-amber-800 mb-1">Facebook Community</h3>
              <p className="text-amber-800/80 mb-3 sm:mb-4 text-sm sm:text-base">Join our customer community</p>
              
              {isEditing ? (
                <div className="mt-2">
                  <label className="block text-xs text-amber-800/80 mb-1">Link URL</label>
                  <input
                    type="text"
                    value={tempLinks.facebook}
                    onChange={(e) => handleInputChange('facebook', e.target.value)}
                    className="w-full px-3 py-2 border border-amber-200 rounded-lg text-sm"
                  />
                </div>
              ) : (
                <a 
                  href={socialLinks.facebook} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full sm:w-auto text-center px-4 sm:px-6 py-2 sm:py-3 bg-cream-50 hover:bg-white text-amber-800 rounded-lg font-medium shadow-md transition-all text-sm sm:text-base"
                >
                  {isMobile ? 'Visit Page' : 'Visit Facebook Page'}
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      
    </div>
  );
};

export default SocialMediaControls;