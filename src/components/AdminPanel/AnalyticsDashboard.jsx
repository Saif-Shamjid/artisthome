import {
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

const AnalyticsDashboard = () => {
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
      icon: FiShoppingCart,
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

  const recentSales = [
    {
      id: "ORD-1001",
      customer: "Sarah Johnson",
      amount: "$249.00",
      status: "Completed",
    },
    {
      id: "ORD-1002",
      customer: "Michael Chen",
      amount: "$498.00",
      status: "Shipped",
    },
    {
      id: "ORD-1003",
      customer: "Emma Williams",
      amount: "$349.00",
      status: "Processing",
    },
    {
      id: "ORD-1004",
      customer: "David Kim",
      amount: "$189.00",
      status: "Completed",
    },
    {
      id: "ORD-1005",
      customer: "Olivia Martinez",
      amount: "$120.00",
      status: "Completed",
    },
  ];

  const topProducts = [
    { name: "Harmony Wall Panel", sales: 42, revenue: "$10,458" },
    { name: "Celestial Mirror", sales: 35, revenue: "$6,615" },
    { name: "Woven Rattan Basket", sales: 28, revenue: "$3,360" },
    { name: "Marble Console Table", sales: 15, revenue: "$5,235" },
    { name: "Brass Candle Holders", sales: 12, revenue: "$1,068" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 py-4 sm:py-6">
      <h3 className="text-lg font-medium text-amber-900">
        Analytics Dashboard
      </h3>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Sales Chart (Placeholder) */}
        <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-4 sm:p-6 lg:col-span-2">
          <h4 className="text-xs sm:text-sm font-medium text-amber-800 mb-3 sm:mb-4">
            Sales Overview
          </h4>
          <div className="h-48 sm:h-64 bg-amber-50 rounded-lg flex items-center justify-center text-amber-800/50 text-sm sm:text-base">
            Sales Chart Placeholder
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-4 sm:p-6">
          <h4 className="text-xs sm:text-sm font-medium text-amber-800 mb-3 sm:mb-4">
            Recent Sales
          </h4>
          <div className="space-y-3 sm:space-y-4">
            {recentSales.map((sale, index) => (
              <div key={index} className="flex items-center">
                <div className="ml-2 sm:ml-4 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-amber-900 truncate">
                    {sale.id}
                  </p>
                  <p className="text-xs text-amber-800/80 truncate">
                    {sale.customer}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs sm:text-sm font-medium text-amber-900">
                    {sale.amount}
                  </p>
                  <p
                    className={`text-xs ${
                      sale.status === "Completed"
                        ? "text-green-600"
                        : sale.status === "Shipped"
                        ? "text-blue-600"
                        : "text-amber-600"
                    }`}
                  >
                    {sale.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-4 sm:p-6">
        <h4 className="text-xs sm:text-sm font-medium text-amber-800 mb-3 sm:mb-4">
          Top Selling Products
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-amber-200">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-amber-200">
              {topProducts.map((product, index) => (
                <tr key={index}>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-amber-900">
                    {product.name}
                  </td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-amber-900">
                    {product.sales}
                  </td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-amber-900">
                    {product.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
