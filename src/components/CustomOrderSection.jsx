import { motion } from 'framer-motion';
import { useState } from 'react';

const CustomOrdersSection = () => {
  const [activeTab, setActiveTab] = useState('furniture');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    description: '',
    timeline: '',
    budget: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const categories = [
    {
      id: 'furniture',
      title: 'Custom Furniture',
      description: 'Handcrafted tables, chairs, cabinets tailored to your space and style',
      icon: (
        <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      id: 'decor',
      title: 'Artisan Decor',
      description: 'Unique wall art, sculptures, and decorative pieces for your home',
      icon: (
        <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    {
      id: 'lighting',
      title: 'Bespoke Lighting',
      description: 'Custom chandeliers, lamps, and fixtures to illuminate your space',
      icon: (
        <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative py-16 md:py-24">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
          alt="Artisan workshop background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50/95 via-cream-50/90 to-cream-50/80"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 z-1">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-amber-300/50 filter blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-amber-500/30 filter blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-light text-amber-900 mb-4">
            <span className="block">Commission Your</span>
            <span className="font-medium italic text-amber-800">Masterpiece</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-amber-800/80 max-w-3xl mx-auto leading-relaxed">
            Collaborate with our artisans to create one-of-a-kind pieces that perfectly match your vision, space, and personal style.
          </motion.p>
        </motion.div>

        <div className="flex flex-col-reverse lg:flex-row gap-8 md:gap-12">
          {/* Left side - Process explanation (shown second on mobile) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 bg-cream-50/70 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-amber-200"
          >
            <h3 className="text-2xl font-serif font-medium text-amber-800 mb-6">Our Custom Creation Process</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1 bg-amber-100 rounded-full p-2">
                  <span className="block w-6 h-6 rounded-full bg-amber-700 text-cream-50 text-center font-medium">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-amber-900">Initial Consultation</h4>
                  <p className="text-amber-800/80 mt-1">Share your ideas, inspiration, and requirements in a detailed discussion with our artisans.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1 bg-amber-100 rounded-full p-2">
                  <span className="block w-6 h-6 rounded-full bg-amber-700 text-cream-50 text-center font-medium">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-amber-900">Design & Proposal</h4>
                  <p className="text-amber-800/80 mt-1">We create sketches and material samples, then provide a detailed project proposal.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1 bg-amber-100 rounded-full p-2">
                  <span className="block w-6 h-6 rounded-full bg-amber-700 text-cream-50 text-center font-medium">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-amber-900">Artisan Crafting</h4>
                  <p className="text-amber-800/80 mt-1">Your piece is handcrafted with regular updates and opportunities for feedback.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1 bg-amber-100 rounded-full p-2">
                  <span className="block w-6 h-6 rounded-full bg-amber-700 text-cream-50 text-center font-medium">4</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-amber-900">Delivery & Installation</h4>
                  <p className="text-amber-800/80 mt-1">Careful delivery and professional installation (where applicable) of your finished piece.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right side - Form (shown first on mobile) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-cream-50/70 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-amber-200">
              <h3 className="text-2xl font-serif font-medium text-amber-800 mb-6">Start Your Custom Project</h3>
              
              {/* Category tabs */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-amber-800/80 mb-3">I'm interested in:</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${activeTab === category.id ? 'bg-amber-700 text-cream-50' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}
                    >
                      {category.icon}
                      {category.title}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Form */}
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-amber-800 mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/70"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/70"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-amber-800 mb-1">Project Type</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/70"
                  >
                    <option value="">Select an option</option>
                    <option value="residential">Residential (Home)</option>
                    <option value="commercial">Commercial (Office/Retail)</option>
                    <option value="gift">Special Gift</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-amber-800 mb-1">Project Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/70"
                    placeholder="Tell us about your vision, preferred materials, dimensions, etc."
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-amber-800 mb-1">Desired Timeline</label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/70"
                    >
                      <option value="">Flexible</option>
                      <option value="1-3">1-3 months</option>
                      <option value="3-6">3-6 months</option>
                      <option value="6+">6+ months</option>
                      <option value="urgent">Urgent (additional fees may apply)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-amber-800 mb-1">Budget Range</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/70"
                    >
                      <option value="">Prefer not to say</option>
                      <option value="500-1500">$500 - $1,500</option>
                      <option value="1500-3000">$1,500 - $3,000</option>
                      <option value="3000-5000">$3,000 - $5,000</option>
                      <option value="5000+">$5,000+</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-amber-700 hover:bg-amber-800 text-cream-50 rounded-lg font-medium shadow-lg shadow-amber-700/10 transition-all hover:shadow-amber-800/20"
                  >
                    Request Consultation
                  </button>
                </div>
                
                <p className="text-xs text-amber-800/60 text-center">
                  We'll respond within 2 business days to discuss your project in detail.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomOrdersSection;