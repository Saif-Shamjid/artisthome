import { useState } from 'react';
import {
  FiPackage,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiDollarSign,
  FiPlus
} from 'react-icons/fi';

const AdminOrderManager = () => {
  const [activeTab, setActiveTab] = useState('regular');

  // Regular order form state
  const [regularOrder, setRegularOrder] = useState({
    customer: '',
    total: 0,
    status: 'processing',
    customerDetails: {
      email: '',
      phone: '',
      address: ''
    }
  });

  // Custom order form state
  const [customOrder, setCustomOrder] = useState({
    customer: '',
    projectType: 'residential',
    description: '',
    timeline: '',
    budget: '',
    status: 'design',
    customerDetails: {
      email: '',
      phone: '',
      address: ''
    },
    notes: ''
  });

  const handleAddRegularOrder = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Adding regular order:', {
      ...regularOrder,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      type: 'regular'
    });
    
    // Reset form
    setRegularOrder({
      customer: '',
      total: 0,
      status: 'processing',
      customerDetails: {
        email: '',
        phone: '',
        address: ''
      }
    });
  };

  const handleAddCustomOrder = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Adding custom order:', {
      ...customOrder,
      id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      type: 'custom',
      total: 0
    });
    
    // Reset form
    setCustomOrder({
      customer: '',
      projectType: 'residential',
      description: '',
      timeline: '',
      budget: '',
      status: 'design',
      customerDetails: {
        email: '',
        phone: '',
        address: ''
      },
      notes: ''
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-amber-900">Add New Order</h3>
        <p className="text-amber-700">Create new regular or custom orders</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-amber-200 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === 'regular' ? 'border-amber-600 text-amber-800' : 'border-transparent text-amber-600 hover:text-amber-800'}`}
          onClick={() => setActiveTab('regular')}
        >
          Regular Order
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === 'custom' ? 'border-amber-600 text-amber-800' : 'border-transparent text-amber-600 hover:text-amber-800'}`}
          onClick={() => setActiveTab('custom')}
        >
          Custom Order
        </button>
      </div>

      {/* Regular Order Form */}
      {activeTab === 'regular' && (
        <form onSubmit={handleAddRegularOrder} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Info */}
            <div className="space-y-4">
              <h4 className="font-medium text-amber-800 flex items-center">
                <FiUser className="mr-2" /> Customer Information
              </h4>
              
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Full Name*</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={regularOrder.customer}
                  onChange={(e) => setRegularOrder({...regularOrder, customer: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Email*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-amber-500" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-10 pr-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    value={regularOrder.customerDetails.email}
                    onChange={(e) => setRegularOrder({
                      ...regularOrder,
                      customerDetails: {
                        ...regularOrder.customerDetails,
                        email: e.target.value
                      }
                    })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Phone*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-amber-500" />
                  </div>
                  <input
                    type="tel"
                    className="w-full pl-10 pr-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    value={regularOrder.customerDetails.phone}
                    onChange={(e) => setRegularOrder({
                      ...regularOrder,
                      customerDetails: {
                        ...regularOrder.customerDetails,
                        phone: e.target.value
                      }
                    })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Address*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="text-amber-500" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    value={regularOrder.customerDetails.address}
                    onChange={(e) => setRegularOrder({
                      ...regularOrder,
                      customerDetails: {
                        ...regularOrder.customerDetails,
                        address: e.target.value
                      }
                    })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Order Info */}
            <div className="space-y-4">
              <h4 className="font-medium text-amber-800 flex items-center">
                <FiPackage className="mr-2" /> Order Information
              </h4>
              
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Total Amount*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="text-amber-500" />
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full pl-10 pr-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    value={regularOrder.total}
                    onChange={(e) => setRegularOrder({...regularOrder, total: parseFloat(e.target.value)})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Status*</label>
                <select
                  className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={regularOrder.status}
                  onChange={(e) => setRegularOrder({...regularOrder, status: e.target.value})}
                >
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
            >
              <FiPlus className="mr-2" /> Add Regular Order
            </button>
          </div>
        </form>
      )}

      {/* Custom Order Form */}
      {activeTab === 'custom' && (
        <form onSubmit={handleAddCustomOrder} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Info */}
            <div className="space-y-4">
              <h4 className="font-medium text-amber-800 flex items-center">
                <FiUser className="mr-2" /> Customer Information
              </h4>
              
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Full Name*</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={customOrder.customer}
                  onChange={(e) => setCustomOrder({...customOrder, customer: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Email*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-amber-500" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-10 pr-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    value={customOrder.customerDetails.email}
                    onChange={(e) => setCustomOrder({
                      ...customOrder,
                      customerDetails: {
                        ...customOrder.customerDetails,
                        email: e.target.value
                      }
                    })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Phone*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-amber-500" />
                  </div>
                  <input
                    type="tel"
                    className="w-full pl-10 pr-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    value={customOrder.customerDetails.phone}
                    onChange={(e) => setCustomOrder({
                      ...customOrder,
                      customerDetails: {
                        ...customOrder.customerDetails,
                        phone: e.target.value
                      }
                    })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Address*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="text-amber-500" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    value={customOrder.customerDetails.address}
                    onChange={(e) => setCustomOrder({
                      ...customOrder,
                      customerDetails: {
                        ...customOrder.customerDetails,
                        address: e.target.value
                      }
                    })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-4">
              <h4 className="font-medium text-amber-800 flex items-center">
                <FiPackage className="mr-2" /> Project Information
              </h4>
              
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Project Type*</label>
                <select
                  className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={customOrder.projectType}
                  onChange={(e) => setCustomOrder({...customOrder, projectType: e.target.value})}
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Description*</label>
                <textarea
                  className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  rows="3"
                  value={customOrder.description}
                  onChange={(e) => setCustomOrder({...customOrder, description: e.target.value})}
                  required
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">Timeline*</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    value={customOrder.timeline}
                    onChange={(e) => setCustomOrder({...customOrder, timeline: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">Budget Range*</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    value={customOrder.budget}
                    onChange={(e) => setCustomOrder({...customOrder, budget: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Status*</label>
                <select
                  className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={customOrder.status}
                  onChange={(e) => setCustomOrder({...customOrder, status: e.target.value})}
                >
                  <option value="quote">Quote Sent</option>
                  <option value="design">Design Phase</option>
                  <option value="production">In Production</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Additional Notes</label>
                <textarea
                  className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  rows="2"
                  value={customOrder.notes}
                  onChange={(e) => setCustomOrder({...customOrder, notes: e.target.value})}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
            >
              <FiPlus className="mr-2" /> Add Custom Order
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminOrderManager;