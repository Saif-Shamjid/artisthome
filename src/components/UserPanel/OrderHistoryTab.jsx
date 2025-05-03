// OrderHistoryTab.jsx
import { FiShoppingBag, FiCheckCircle, FiStar } from "react-icons/fi";

const OrderHistoryTab = ({ orders, setActiveReview }) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6">
      <h2 className="font-serif text-2xl text-amber-900 mb-6">Order History</h2>

      {orders.length === 0 ? (
        <EmptyState
          icon={<FiShoppingBag size={48} className="mx-auto text-amber-700" />}
          message="You haven't completed any orders yet"
        />
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderHistoryCard
              key={order.id}
              order={order}
              setActiveReview={setActiveReview}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const OrderHistoryCard = ({ order, setActiveReview }) => (
  <div className="border border-amber-200 rounded-lg p-4">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
      <div>
        <h3 className="font-serif text-lg text-amber-900">Order #{order.id}</h3>
        <p className="text-amber-800/70">Placed on {order.date}</p>
      </div>
      <div className="flex items-center mt-2 sm:mt-0">
        <FiCheckCircle className="text-green-600 mr-2" />
        <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
          Delivered
        </div>
      </div>
    </div>

    <div className="mb-4 p-3 bg-green-50 rounded-lg">
      <div className="flex items-center">
        <FiCheckCircle className="text-green-600 mr-2" />
        <div>
          <p className="font-medium text-green-800">
            Delivered on {order.deliveredOn}
          </p>
        </div>
      </div>
    </div>

    <div className="border-t border-amber-100 pt-4">
      {order.items.map((item) => (
        <OrderHistoryItem
          key={item.id}
          item={item}
          setActiveReview={setActiveReview}
          orderId={order.id}
        />
      ))}
    </div>

    <div className="flex justify-between border-t border-amber-100 pt-4">
      <span className="font-serif text-amber-900">Total</span>
      <span className="font-serif text-amber-900">
        ${order.total.toFixed(2)}
      </span>
    </div>
  </div>
);

const OrderHistoryItem = ({ item, setActiveReview, orderId }) => (
  <div className="flex mb-4 last:mb-0">
    <img
      src={item.image}
      alt={item.title}
      className="w-16 h-16 object-cover rounded-lg mr-4"
    />
    <div className="flex-1">
      <h4 className="font-serif text-amber-900">{item.title}</h4>
      <p className="text-amber-800">
        ${item.price.toFixed(2)} × {item.quantity}
      </p>
      {item.canReview ? (
        <button
          onClick={() => setActiveReview({ orderId, productId: item.id })}
          className="mt-2 text-sm text-amber-700 hover:underline"
        >
          Write a Review
        </button>
      ) : (
        <p className="mt-2 text-sm text-amber-800/70">Review submitted</p>
      )}
    </div>
  </div>
);

const EmptyState = ({ icon, message }) => (
  <div className="text-center py-8">
    {icon}
    <p className="text-amber-800 mt-4">{message}</p>
  </div>
);

export default OrderHistoryTab;
