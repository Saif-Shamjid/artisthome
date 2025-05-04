import { useState } from "react";
import {
  FiHome,
  FiGrid,
  FiShoppingCart,
  FiUsers,
  FiPieChart,
  FiSettings,
  FiMenu,
  FiX,
} from "react-icons/fi";
import DashboardOverview from "./DashboardOverview";
import HeroSectionManager from "./HeroSectionManager";
import CategoryManager from "./CategoryManager";
import FacebookSectionManager from "./FacebookSectionManager";
import ProductManager from "./ProductManager";
import FeaturedCollectionManager from "./FeaturedCollectionManager";
import OrderManager from "./OrderManager";
import AnalyticsDashboard from "./AnalyticsDashboard";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "hero":
        return <HeroSectionManager />;
      case "categories":
        return <CategoryManager />;
      case "facebook":
        return <FacebookSectionManager />;
      case "products":
        return <ProductManager />;
      case "featured":
        return <FeaturedCollectionManager />;
      case "orders":
        return <OrderManager />;
      case "analytics":
        return <AnalyticsDashboard />;
      default:
        return <DashboardOverview />;
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 md:flex-row">
      {/* Mobile Header with Toggle Button */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center md:hidden">
        <h2 className="text-xl font-serif text-amber-900 capitalize">
          {activeTab.replace("-", " ")}
        </h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-amber-100 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? (
            <FiX className="text-amber-700 text-2xl" />
          ) : (
            <FiMenu className="text-amber-700 text-2xl" />
          )}
        </button>
      </header>

      {/* Sidebar with Smooth Transition */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 
          w-64 bg-amber-900 text-cream-50
          transform transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"}
          md:relative md:translate-x-0 md:shadow-none
        `}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-amber-800">
            <h1 className="text-xl font-serif font-medium">Artisan Admin</h1>
          </div>
          <nav className="flex-1 overflow-y-auto">
            {[
              { id: "dashboard", icon: <FiHome />, label: "Dashboard" },
              { id: "hero", icon: <FiGrid />, label: "Hero Section" },
              { id: "categories", icon: <FiGrid />, label: "Categories" },
              { id: "facebook", icon: <FiGrid />, label: "Facebook Section" },
              { id: "products", icon: <FiShoppingCart />, label: "Products" },
              { id: "featured", icon: <FiGrid />, label: "Featured" },
              { id: "orders", icon: <FiUsers />, label: "Orders" },
              { id: "analytics", icon: <FiPieChart />, label: "Analytics" },
              { id: "settings", icon: <FiSettings />, label: "Settings" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`
                  flex items-center w-full p-3 
                  transition-colors duration-200 ease-in-out
                  ${
                    activeTab === item.id
                      ? "bg-amber-800"
                      : "hover:bg-amber-800/50"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="ml-3">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay with Fade Animation */}
      {isSidebarOpen && (
        <div
          className={`
            fixed inset-0 z-40 bg-black/50 
            transition-opacity duration-300 ease-in-out
            md:hidden
          `}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Header */}
        <header className="bg-white shadow-sm p-4 justify-between items-center hidden md:flex">
          <h2 className="text-xl font-serif text-amber-900 capitalize">
            {activeTab.replace("-", " ")}
          </h2>
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-full hover:bg-amber-100 transition-colors duration-200"
              aria-label="Settings"
            >
              <FiSettings className="text-amber-700" />
            </button>
            <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center">
              <span className="text-xs font-medium text-amber-800">AD</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
