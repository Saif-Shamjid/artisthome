import { useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiDollarSign,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiX,
  FiPackage,
  FiCalendar,
  FiInfo,
} from "react-icons/fi";

const OrderManager = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-1001",
      customer: "Sarah Johnson",
      date: "2023-05-15",
      status: "shipped",
      total: 249.0,
      items: [
        {
          product: "Harmony Wall Panel",
          quantity: 1,
          price: 249.0,
          image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
        },
      ],
      customerDetails: {
        email: "sarah.johnson@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, Apt 4B, New York, NY 10001",
        notes: "Prefers contact via email",
      },
    },
    {
      id: "ORD-1002",
      customer: "Michael Chen",
      date: "2023-05-16",
      status: "processing",
      total: 498.0,
      items: [
        {
          product: "Celestial Mirror",
          quantity: 2,
          price: 189.0,
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
        },
        {
          product: "Woven Rattan Basket",
          quantity: 1,
          price: 120.0,
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        },
      ],
      customerDetails: {
        email: "michael.chen@example.com",
        phone: "+1 (555) 987-6543",
        address: "456 Oak Ave, Los Angeles, CA 90015",
        notes: "Gift wrapping requested",
      },
    },
    {
      id: "ORD-1003",
      customer: "Emma Williams",
      date: "2023-05-17",
      status: "delivered",
      total: 349.0,
      items: [
        {
          product: "Marble Console Table",
          quantity: 1,
          price: 349.0,
          image: "https://images.unsplash.com/photo-1600585152220-90363fe7e6f0",
        },
      ],
      customerDetails: {
        email: "emma.williams@example.com",
        phone: "+1 (555) 456-7890",
        address: "789 Pine Rd, Chicago, IL 60601",
        notes: "Leave package at front door",
      },
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusBadge = (status) => {
    const baseClasses =
      "px-3 py-1 rounded-full text-xs font-medium flex items-center";

    switch (status) {
      case "processing":
        return (
          <span className={`${baseClasses} bg-amber-100 text-amber-800`}>
            <FiInfo className="mr-1.5" /> Processing
          </span>
        );
      case "shipped":
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
            <FiTruck className="mr-1.5" /> Shipped
          </span>
        );
      case "delivered":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            <FiCheckCircle className="mr-1.5" /> Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            <FiXCircle className="mr-1.5" /> Cancelled
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
            Pending
          </span>
        );
    }
  };

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 border-b border-amber-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold text-amber-900">
              Order Dashboard
            </h3>
            <p className="text-amber-700">Manage and track customer orders</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-xs font-medium">
              {filteredOrders.length} orders
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-amber-600 h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search orders by ID or customer..."
              className="pl-10 pr-4 py-3 w-full border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative w-full md:w-56">
            <select
              className="appearance-none pl-3 pr-8 py-3 w-full border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm shadow-sm bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FiChevronDown className="text-amber-600 h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Orders Cards (Mobile) */}
        <div className="md:hidden space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border border-amber-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              onClick={() => openOrderModal(order)}
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-amber-900">{order.id}</h4>
                  {getStatusBadge(order.status)}
                </div>
                <p className="text-amber-800 font-medium mb-1">
                  {order.customer}
                </p>
                <div className="flex items-center text-sm text-amber-600 mb-2">
                  <FiCalendar className="mr-1.5 h-3 w-3" />
                  <span>{order.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm font-medium text-amber-900">
                    <FiDollarSign className="mr-1 h-3 w-3" />
                    {order.total.toFixed(2)}
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Orders Table (Desktop) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-amber-200">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-amber-200">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-amber-50 cursor-pointer"
                  onClick={() => openOrderModal(order)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-amber-900">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                        <FiUser className="text-amber-600 h-4 w-4" />
                      </div>
                      <div className="font-medium text-amber-900">
                        {order.customer}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                    <div className="flex items-center">
                      <FiCalendar className="mr-1.5 h-3 w-3 text-amber-500" />
                      {order.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 3).map((item, i) => (
                        <div key={i} className="relative">
                          <img
                            src={item.image}
                            alt={item.product}
                            className="h-8 w-8 rounded-full border-2 border-white object-cover"
                          />
                          {i === 2 && order.items.length > 3 && (
                            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center font-medium text-amber-900">
                      <FiDollarSign className="text-amber-600 mr-1 h-3 w-3" />
                      {order.total.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {order.status !== "shipped" &&
                      order.status !== "delivered" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateOrderStatus(order.id, "shipped");
                          }}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                          title="Mark as shipped"
                        >
                          <FiTruck className="h-4 w-4" />
                        </button>
                      )}
                    {order.status !== "delivered" &&
                      order.status !== "cancelled" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateOrderStatus(order.id, "delivered");
                          }}
                          className="text-green-600 hover:text-green-900 flex items-center"
                          title="Mark as delivered"
                        >
                          <FiCheckCircle className="h-4 w-4" />
                        </button>
                      )}
                    {order.status !== "cancelled" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(order.id, "cancelled");
                        }}
                        className="text-red-600 hover:text-red-900 flex items-center"
                        title="Cancel order"
                      >
                        <FiXCircle className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-amber-200 p-4 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-amber-900">
                Order Details
              </h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-amber-600 hover:text-amber-800 p-1 rounded-full hover:bg-amber-100"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Summary */}
                <div className="lg:col-span-2">
                  <div className="bg-amber-50 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-amber-600 uppercase font-medium">
                          Order ID
                        </p>
                        <p className="font-medium text-amber-900">
                          {selectedOrder.id}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-amber-600 uppercase font-medium">
                          Date
                        </p>
                        <p className="font-medium text-amber-900">
                          {selectedOrder.date}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-amber-600 uppercase font-medium">
                          Status
                        </p>
                        <div className="mt-1">
                          {getStatusBadge(selectedOrder.status)}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-amber-600 uppercase font-medium">
                          Total
                        </p>
                        <p className="font-medium text-amber-900 flex items-center">
                          <FiDollarSign className="mr-1 h-3 w-3" />
                          {selectedOrder.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <h4 className="text-lg font-medium text-amber-900 mb-4 flex items-center">
                    <FiPackage className="mr-2 text-amber-600" />
                    Order Items
                  </h4>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex border-b border-amber-100 pb-4"
                      >
                        <div className="flex-shrink-0 h-16 w-16 bg-amber-50 rounded-md overflow-hidden mr-4">
                          <img
                            src={item.image}
                            alt={item.product}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-amber-900">
                            {item.product}
                          </h5>
                          <p className="text-sm text-amber-700">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm font-medium text-amber-900 flex items-center">
                            <FiDollarSign className="mr-1 h-3 w-3" />
                            {item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-amber-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <div className="bg-white border border-amber-200 rounded-lg p-5 sticky top-4">
                    <h4 className="text-lg font-medium text-amber-900 mb-4 flex items-center">
                      <FiUser className="mr-2 text-amber-600" />
                      Customer Information
                    </h4>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-amber-600 uppercase font-medium mb-1">
                          Name
                        </p>
                        <p className="font-medium text-amber-900">
                          {selectedOrder.customer}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-amber-600 uppercase font-medium mb-1">
                          Email
                        </p>
                        <p className="text-amber-900 flex items-center">
                          <FiMail className="mr-2 text-amber-600 h-4 w-4" />
                          {selectedOrder.customerDetails.email}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-amber-600 uppercase font-medium mb-1">
                          Phone
                        </p>
                        <p className="text-amber-900 flex items-center">
                          <FiPhone className="mr-2 text-amber-600 h-4 w-4" />
                          {selectedOrder.customerDetails.phone}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-amber-600 uppercase font-medium mb-1">
                          Shipping Address
                        </p>
                        <p className="text-amber-900 flex items-start">
                          <FiMapPin className="mr-2 text-amber-600 h-4 w-4 mt-0.5" />
                          {selectedOrder.customerDetails.address}
                        </p>
                      </div>

                      {selectedOrder.customerDetails.notes && (
                        <div className="pt-4 border-t border-amber-200">
                          <p className="text-xs text-amber-600 uppercase font-medium mb-1">
                            Customer Notes
                          </p>
                          <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded">
                            {selectedOrder.customerDetails.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Status Actions */}
                    <div className="mt-6 pt-4 border-t border-amber-200">
                      <h5 className="text-sm font-medium text-amber-800 mb-3">
                        Update Status
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedOrder.status !== "shipped" &&
                          selectedOrder.status !== "delivered" && (
                            <button
                              onClick={() => {
                                updateOrderStatus(selectedOrder.id, "shipped");
                                setShowOrderModal(false);
                              }}
                              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-full text-xs font-medium flex items-center transition-colors"
                            >
                              <FiTruck className="mr-1.5 h-3 w-3" /> Mark as
                              Shipped
                            </button>
                          )}
                        {selectedOrder.status !== "delivered" &&
                          selectedOrder.status !== "cancelled" && (
                            <button
                              onClick={() => {
                                updateOrderStatus(
                                  selectedOrder.id,
                                  "delivered"
                                );
                                setShowOrderModal(false);
                              }}
                              className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center transition-colors"
                            >
                              <FiCheckCircle className="mr-1.5 h-3 w-3" /> Mark
                              as Delivered
                            </button>
                          )}
                        {selectedOrder.status !== "cancelled" && (
                          <button
                            onClick={() => {
                              updateOrderStatus(selectedOrder.id, "cancelled");
                              setShowOrderModal(false);
                            }}
                            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-800 rounded-full text-xs font-medium flex items-center transition-colors"
                          >
                            <FiXCircle className="mr-1.5 h-3 w-3" /> Cancel
                            Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManager;
