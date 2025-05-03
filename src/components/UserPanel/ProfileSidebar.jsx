// ProfileSidebar.jsx
import {
  FiUser,
  FiShoppingBag,
  FiTruck,
  FiLogOut,
  FiPackage,
} from "react-icons/fi";

const ProfileSidebar = ({
  activeTab,
  setActiveTab,
  userData,
  currentOrders,
  handleLogout,
}) => {
  return (
    <div className="lg:w-1/4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sticky top-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-4">
            <FiUser size={32} className="text-amber-700" />
          </div>
          <h2 className="font-serif text-xl text-amber-900">{userData.name}</h2>
          <p className="text-amber-800/70">{userData.email}</p>
        </div>

        <nav className="space-y-2">
          <SidebarButton
            icon={<FiUser />}
            label="Profile"
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />

          <SidebarButton
            icon={<FiPackage />}
            label="Current Orders"
            active={activeTab === "current-orders"}
            onClick={() => setActiveTab("current-orders")}
            badge={currentOrders.length}
          />

          <SidebarButton
            icon={<FiShoppingBag />}
            label="Order History"
            active={activeTab === "order-history"}
            onClick={() => setActiveTab("order-history")}
          />

          <SidebarButton
            icon={<FiTruck />}
            label="Addresses"
            active={activeTab === "addresses"}
            onClick={() => setActiveTab("addresses")}
          />

          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-amber-50 text-amber-800 mt-8"
          >
            <FiLogOut className="mr-3" />
            Log Out
          </button>
        </nav>
      </div>
    </div>
  );
};

const SidebarButton = ({ icon, label, active, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-4 py-3 rounded-lg ${
      active
        ? "bg-amber-100 text-amber-700"
        : "hover:bg-amber-50 text-amber-800"
    }`}
  >
    <span className="mr-3">{icon}</span>
    {label}
    {badge > 0 && (
      <span className="ml-auto bg-amber-700 text-white text-xs px-2 py-1 rounded-full">
        {badge}
      </span>
    )}
  </button>
);

export default ProfileSidebar;
