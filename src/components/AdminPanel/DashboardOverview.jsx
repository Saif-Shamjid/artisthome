import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiStar,
  FiTrendingUp,
  FiClock,
} from "react-icons/fi";

const DashboardOverview = () => {
  // Sample data - replace with real data from your API
  const stats = [
    {
      name: "Total Revenue",
      value: "$12,489",
      change: "+12%",
      icon: FiDollarSign,
      trend: "up",
    },
    {
      name: "Total Orders",
      value: "284",
      change: "+8%",
      icon: FiShoppingBag,
      trend: "up",
    },
    {
      name: "New Customers",
      value: "56",
      change: "+5%",
      icon: FiUsers,
      trend: "up",
    },
    {
      name: "Conversion Rate",
      value: "3.2%",
      change: "-0.5%",
      icon: FiTrendingUp,
      trend: "down",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "order",
      description: "New order #ORD-1005 from Olivia Martinez",
      time: "2 min ago",
    },
    {
      id: 2,
      type: "product",
      description: 'New product "Brass Candle Holders" added',
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "customer",
      description: "New customer registration: David Kim",
      time: "3 hours ago",
    },
    {
      id: 4,
      type: "order",
      description: "Order #ORD-1004 marked as completed",
      time: "5 hours ago",
    },
    {
      id: 5,
      type: "update",
      description: "Hero section images updated",
      time: "Yesterday",
    },
  ];

  const topProducts = [
    { name: "Harmony Wall Panel", rating: 4.8, sales: 42 },
    { name: "Celestial Mirror", rating: 4.6, sales: 35 },
    { name: "Woven Rattan Basket", rating: 4.5, sales: 28 },
  ];

  return (
    <div className="space-y-6 px-4 sm:px-6 py-6">
      <h3 className="text-lg font-medium text-amber-900">Dashboard Overview</h3>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-amber-100 p-4 sm:p-6"
          >
            <div className="flex items-center">
              <div
                className={`p-2 sm:p-3 rounded-lg ${
                  stat.trend === "up"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-amber-800">
                  {stat.name}
                </p>
                <p className="text-xl sm:text-2xl font-serif font-medium text-amber-900">
                  {stat.value}
                </p>
              </div>
            </div>
            <div
              className={`mt-3 sm:mt-4 text-xs sm:text-sm ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              <span>{stat.change}</span>
              <span className="ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-4 sm:p-6 lg:col-span-2">
          <h4 className="text-xs sm:text-sm font-medium text-amber-800 mb-3 sm:mb-4">
            Recent Activity
          </h4>
          <div className="space-y-3 sm:space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div
                  className={`p-1 sm:p-2 rounded-lg ${
                    activity.type === "order"
                      ? "bg-blue-100 text-blue-600"
                      : activity.type === "product"
                      ? "bg-amber-100 text-amber-600"
                      : activity.type === "customer"
                      ? "bg-green-100 text-green-600"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {activity.type === "order" && (
                    <FiShoppingBag className="h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                  {activity.type === "product" && (
                    <FiShoppingBag className="h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                  {activity.type === "customer" && (
                    <FiUsers className="h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                  {activity.type === "update" && (
                    <FiTrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                </div>
                <div className="ml-3 sm:ml-4 flex-1">
                  <p className="text-xs sm:text-sm text-amber-900">
                    {activity.description}
                  </p>
                  <p className="text-xs text-amber-800/80 flex items-center mt-1">
                    <FiClock className="mr-1 h-3 w-3" /> {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-4 sm:p-6">
          <h4 className="text-xs sm:text-sm font-medium text-amber-800 mb-3 sm:mb-4">
            Top Rated Products
          </h4>
          <div className="space-y-3 sm:space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={`https://source.unsplash.com/random/100x100/?decor,${index}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3 sm:ml-4 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-amber-900 truncate">
                    {product.name}
                  </p>
                  <div className="flex items-center mt-1">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`h-2 w-2 sm:h-3 sm:w-3 ${
                            i < Math.floor(product.rating) ? "fill-current" : ""
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-amber-800/80 ml-1 sm:ml-2">
                      {product.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs sm:text-sm font-medium text-amber-900">
                    {product.sales} sales
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-4 sm:p-6">
        <h4 className="text-xs sm:text-sm font-medium text-amber-800 mb-3 sm:mb-4">
          Quick Actions
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <button className="p-2 sm:p-4 bg-amber-50 hover:bg-amber-100 rounded-lg text-center transition-colors">
            <div className="mx-auto bg-amber-100 text-amber-700 p-2 sm:p-3 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-1 sm:mb-2">
              <FiShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="text-xs font-medium text-amber-900">
              Add Product
            </span>
          </button>
          <button className="p-2 sm:p-4 bg-amber-50 hover:bg-amber-100 rounded-lg text-center transition-colors">
            <div className="mx-auto bg-amber-100 text-amber-700 p-2 sm:p-3 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-1 sm:mb-2">
              <FiUsers className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="text-xs font-medium text-amber-900">
              View Customers
            </span>
          </button>
          <button className="p-2 sm:p-4 bg-amber-50 hover:bg-amber-100 rounded-lg text-center transition-colors">
            <div className="mx-auto bg-amber-100 text-amber-700 p-2 sm:p-3 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-1 sm:mb-2">
              <FiTrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="text-xs font-medium text-amber-900">
              View Analytics
            </span>
          </button>
          <button className="p-2 sm:p-4 bg-amber-50 hover:bg-amber-100 rounded-lg text-center transition-colors">
            <div className="mx-auto bg-amber-100 text-amber-700 p-2 sm:p-3 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-1 sm:mb-2">
              <FiDollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="text-xs font-medium text-amber-900">
              View Sales
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
