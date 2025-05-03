import { useState } from 'react';
import { FiHome, FiGrid, FiShoppingCart, FiUsers, FiPieChart, FiSettings } from 'react-icons/fi';
import DashboardOverview from './DashboardOverview';
import HeroSectionManager from './HeroSectionManager';
import CategoryManager from './CategoryManager';
import FacebookSectionManager from './FacebookSectionManager';
import ProductManager from './ProductManager';
import FeaturedCollectionManager from './FeaturedCollectionManager';
import OrderManager from './OrderManager';
import AnalyticsDashboard from './AnalyticsDashboard';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <DashboardOverview />;
      case 'hero': return <HeroSectionManager />;
      case 'categories': return <CategoryManager />;
      case 'facebook': return <FacebookSectionManager />;
      case 'products': return <ProductManager />;
      case 'featured': return <FeaturedCollectionManager />;
      case 'orders': return <OrderManager />;
      case 'analytics': return <AnalyticsDashboard />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-amber-900 text-cream-50 transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between border-b border-amber-800">
          {isSidebarOpen ? (
            <h1 className="text-xl font-serif font-medium">Artisan Admin</h1>
          ) : (
            <div className="w-8 h-8 bg-amber-700 rounded-full"></div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-full hover:bg-amber-800"
          >
            {isSidebarOpen ? '<' : '>'}
          </button>
        </div>
        <nav className="mt-4">
          {[
            { id: 'dashboard', icon: <FiHome />, label: 'Dashboard' },
            { id: 'hero', icon: <FiGrid />, label: 'Hero Section' },
            { id: 'categories', icon: <FiGrid />, label: 'Categories' },
            { id: 'facebook', icon: <FiGrid />, label: 'Facebook Section' },
            { id: 'products', icon: <FiShoppingCart />, label: 'Products' },
            { id: 'featured', icon: <FiGrid />, label: 'Featured' },
            { id: 'orders', icon: <FiUsers />, label: 'Orders' },
            { id: 'analytics', icon: <FiPieChart />, label: 'Analytics' },
            { id: 'settings', icon: <FiSettings />, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full p-3 ${activeTab === item.id ? 'bg-amber-800' : 'hover:bg-amber-800/50'}`}
            >
              <span className="text-lg">{item.icon}</span>
              {isSidebarOpen && <span className="ml-3">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-serif text-amber-900 capitalize">
            {activeTab.replace('-', ' ')}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-amber-100">
              <FiSettings className="text-amber-700" />
            </button>
            <div className="w-8 h-8 rounded-full bg-amber-200"></div>
          </div>
        </header>
        
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;