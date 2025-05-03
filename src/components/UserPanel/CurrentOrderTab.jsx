// CurrentOrdersTab.jsx
import {
  FiClock,
  FiTruck,
  FiCheckCircle,
  FiShoppingBag,
  FiPackage,
  FiStar,
} from "react-icons/fi";
import OrderStatusTimeline from "./OrderStatusTimeline";

const CurrentOrdersTab = ({ orders, setActiveReview }) => {
  const statusIcons = {
    processing: <FiClock className="text-amber-600" />,
    shipped: <FiTruck className="text-blue-600" />,
    delivered: <FiCheckCircle className="text-green-600" />,
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6">
      <h2 className="font-serif text-2xl text-amber-900 mb-6">
        Current Orders
      </h2>

      {orders.length === 0 ? (
        <EmptyState
          icon={<FiShoppingBag size={48} className="mx-auto text-amber-700" />}
          message="You don't have any current orders"
        />
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              statusIcon={statusIcons[order.status]}
              setActiveReview={setActiveReview}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const OrderCard = ({ order, statusIcon, setActiveReview }) => (
  <div className="border border-amber-200 rounded-lg p-4">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
      <div>
        <h3 className="font-serif text-lg text-amber-900">Order #{order.id}</h3>
        <p className="text-amber-800/70">Placed on {order.date}</p>
      </div>
      <div className="flex items-center mt-2 sm:mt-0">
        <div className="mr-2">{statusIcon}</div>
        <StatusBadge status={order.status} />
      </div>
    </div>

    <OrderStatusTimeline statusSteps={order.statusSteps} />

    <DeliveryInfo
      status={order.status}
      estimatedDelivery={order.estimatedDelivery}
      deliveredOn={order.deliveredOn}
      trackingNumber={order.trackingNumber}
      carrier={order.carrier}
    />

    <OrderItems
      items={order.items}
      setActiveReview={setActiveReview}
      orderId={order.id}
    />

    <OrderTotal total={order.total} />
  </div>
);

const StatusBadge = ({ status }) => {
  const statusClasses = {
    delivered: "bg-green-100 text-green-800",
    shipped: "bg-blue-100 text-blue-800",
    processing: "bg-amber-100 text-amber-800",
  };

  return (
    <div
      className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

const DeliveryInfo = ({
  status,
  estimatedDelivery,
  deliveredOn,
  trackingNumber,
  carrier,
}) => (
  <div className="mb-4 p-3 bg-amber-50 rounded-lg flex items-center">
    <div className="bg-amber-100 p-2 rounded-full mr-3">
      <FiTruck className="text-amber-700" />
    </div>
    <div>
      <p className="font-medium text-amber-900">
        {status === "delivered" ? "Delivered on" : "Estimated Delivery"}
      </p>
      <p className="text-amber-800">
        {status === "delivered" ? deliveredOn : estimatedDelivery}
      </p>
      {trackingNumber && (
        <p className="text-sm mt-1 text-amber-800/70">
          Tracking #{trackingNumber}
          {carrier && ` via ${carrier}`}
        </p>
      )}
    </div>
  </div>
);

const OrderItems = ({ items, setActiveReview, orderId }) => (
  <div className="border-t border-amber-100 pt-4">
    <h4 className="font-serif text-lg text-amber-900 mb-3 flex items-center">
      <FiPackage className="mr-2" />
      Order Items
    </h4>
    {items.map((item) => (
      <OrderItem
        key={item.id}
        item={item}
        setActiveReview={setActiveReview}
        orderId={orderId}
      />
    ))}
  </div>
);

const OrderItem = ({ item, setActiveReview, orderId }) => (
  <div className="flex mb-4 last:mb-0">
    <img
      src={item.image}
      alt={item.title}
      className="w-16 h-16 object-cover rounded-lg mr-4 border border-amber-100"
    />
    <div className="flex-1">
      <h4 className="font-serif text-amber-900">{item.title}</h4>
      <p className="text-amber-800">
        ${item.price.toFixed(2)} × {item.quantity}
      </p>
      {item.canReview && (
        <button
          onClick={() => setActiveReview({ orderId, productId: item.id })}
          className="mt-1 text-sm text-amber-700 hover:underline flex items-center"
        >
          <FiStar className="mr-1" />
          Write a Review
        </button>
      )}
    </div>
  </div>
);

const OrderTotal = ({ total }) => (
  <div className="flex justify-between border-t border-amber-100 pt-4 items-center">
    <span className="font-serif text-amber-900 flex items-center">
      <FiShoppingBag className="mr-2" />
      Order Total
    </span>
    <span className="font-serif text-amber-900">${total.toFixed(2)}</span>
  </div>
);

const EmptyState = ({ icon, message }) => (
  <div className="text-center py-8">
    {icon}
    <p className="text-amber-800 mt-4">{message}</p>
  </div>
);

export default CurrentOrdersTab;
