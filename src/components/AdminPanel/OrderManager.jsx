import { useState } from 'react';
import { FiSearch, FiChevronDown, FiTruck, FiCheckCircle, FiXCircle, FiDollarSign } from 'react-icons/fi';

const OrderManager = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-1001',
      customer: 'Sarah Johnson',
      date: '2023-05-15',
      status: 'shipped',
      total: 249.00,
      items: [
        { product: 'Harmony Wall Panel', quantity: 1, price: 249.00 }
      ]
    },
    {
      id: 'ORD-1002',
      customer: 'Michael Chen',
      date: '2023-05-16',
      status: 'processing',
      total: 498.00,
      items: [
        { product: 'Celestial Mirror', quantity: 2, price: 189.00 },
        { product: 'Woven Rattan Basket', quantity: 1, price: 120.00 }
      ]
    },
    {
      id: 'ORD-1003',
      customer: 'Emma Williams',
      date: '2023-05-17',
      status: 'delivered',
      total: 349.00,
      items: [
        { product: 'Marble Console Table', quantity: 1, price: 349.00 }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'processing':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">Processing</span>;
      case 'shipped':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Shipped</span>;
      case 'delivered':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Delivered</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Cancelled</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Pending</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6">
      <h3 className="text-lg font-medium text-amber-900 mb-6">Order Management</h3>
      
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-amber-600" />
          </div>
          <input
            type="text"
            placeholder="Search orders..."
            className="pl-10 pr-4 py-2 w-full border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <select
            className="appearance-none pl-4 pr-10 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
            <FiChevronDown className="text-amber-600" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-amber-200">
          <thead className="bg-amber-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-amber-200">
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                  {order.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                  {order.date}
                </td>
                <td className="px-6 py-4 text-sm text-amber-900">
                  <ul className="list-disc pl-5">
                    {order.items.map((item, i) => (
                      <li key={i} className="text-xs">
                        {item.product} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                  <div className="flex items-center">
                    <FiDollarSign className="text-amber-600 mr-1" />
                    {order.total.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {order.status !== 'shipped' && order.status !== 'delivered' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'shipped')}
                      className="text-blue-600 hover:text-blue-900 mr-3 flex items-center"
                    >
                      <FiTruck className="mr-1" /> Ship
                    </button>
                  )}
                  {order.status !== 'delivered' && order.status !== 'cancelled' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'delivered')}
                      className="text-green-600 hover:text-green-900 mr-3 flex items-center"
                    >
                      <FiCheckCircle className="mr-1" /> Deliver
                    </button>
                  )}
                  {order.status !== 'cancelled' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      className="text-red-600 hover:text-red-900 flex items-center"
                    >
                      <FiXCircle className="mr-1" /> Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManager;