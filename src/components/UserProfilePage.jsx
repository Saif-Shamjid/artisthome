// UserProfilePage.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import ProfileSidebar from "./UserPanel/ProfileSidebar";
import ProfileTab from "./UserPanel/ProfileTab";
import CurrentOrdersTab from "./UserPanel/CurrentOrderTab";
import OrderHistoryTab from "./UserPanel/OrderHistoryTab";
import AddressesTab from "./UserPanel/AddressesTab";
import ReviewModal from "./UserPanel/ReviewModal";

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    shippingAddress: {
      street: "123 Artisan Lane",
      city: "Craftsville",
      state: "CA",
      zip: "90210",
      country: "United States",
    },
    isEditingProfile: false,
    isEditingAddress: false,
  });

  const [orders, setOrders] = useState([
    {
      id: "ORD-78945",
      date: "2023-05-15",
      status: "delivered",
      statusSteps: [
        { name: "Order Placed", date: "May 15, 2023", completed: true },
        { name: "Processing", date: "May 16, 2023", completed: true },
        { name: "Shipped", date: "May 18, 2023", completed: true },
        { name: "Delivered", date: "May 22, 2023", completed: true },
      ],
      items: [
        {
          id: 1,
          title: "Harmony Wall Panel",
          price: 249,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
          canReview: true,
        },
      ],
      total: 268.92,
      estimatedDelivery: "May 22, 2023",
      deliveredOn: "May 22, 2023",
    },
    {
      id: "ORD-78210",
      date: "2023-06-22",
      status: "shipped",
      statusSteps: [
        { name: "Order Placed", date: "June 22, 2023", completed: true },
        { name: "Processing", date: "June 23, 2023", completed: true },
        { name: "Shipped", date: "June 25, 2023", completed: true },
        { name: "Delivered", date: "June 29, 2023", completed: false },
      ],
      items: [
        {
          id: 2,
          title: "Celestial Mirror",
          price: 189,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1583845112203-454c5d27a0a5",
        },
      ],
      total: 204.12,
      estimatedDelivery: "June 29, 2023",
      carrier: "FedEx",
      trackingNumber: "123456789012",
    },
    {
      id: "ORD-77563",
      date: "2023-07-10",
      status: "processing",
      statusSteps: [
        { name: "Order Placed", date: "July 10, 2023", completed: true },
        { name: "Processing", date: "July 11, 2023", completed: true },
        { name: "Shipped", date: "July 14, 2023", completed: false },
        { name: "Delivered", date: "July 18, 2023", completed: false },
      ],
      items: [
        {
          id: 3,
          title: "Botanical Relief",
          price: 175,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        },
      ],
      total: 378.0,
      estimatedDelivery: "July 18, 2023",
    },
  ]);

  const [activeReview, setActiveReview] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  // Handler functions remain the same but pass them as props to components
  const toggleProfileEdit = () => {
    setUserData({ ...userData, isEditingProfile: !userData.isEditingProfile });
  };

  const toggleAddressEdit = () => {
    setUserData({ ...userData, isEditingAddress: !userData.isEditingAddress });
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      shippingAddress: {
        ...userData.shippingAddress,
        [name]: value,
      },
    });
  };

  const saveProfileChanges = () => {
    console.log("Profile updated:", userData);
    setUserData({ ...userData, isEditingProfile: false });
  };

  const saveAddressChanges = () => {
    console.log("Address updated:", userData.shippingAddress);
    setUserData({ ...userData, isEditingAddress: false });
  };

  const submitReview = (orderId, productId) => {
    console.log(
      `Review submitted for product ${productId} in order ${orderId}`
    );
    console.log(`Rating: ${reviewRating}, Review: ${reviewText}`);

    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            items: order.items.map((item) => {
              if (item.id === productId) {
                return { ...item, canReview: false };
              }
              return item;
            }),
          };
        }
        return order;
      })
    );

    setActiveReview(null);
    setReviewRating(5);
    setReviewText("");
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  const currentOrders = orders.filter((order) => order.status !== "delivered");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-cream-50/95 via-cream-50/90 to-cream-50/80 py-12"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <ProfileSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userData={userData}
            currentOrders={currentOrders}
            handleLogout={handleLogout}
          />

          <div className="lg:w-3/4">
            {activeTab === "profile" && (
              <ProfileTab
                userData={userData}
                toggleProfileEdit={toggleProfileEdit}
                handleProfileInputChange={handleProfileInputChange}
                saveProfileChanges={saveProfileChanges}
              />
            )}

            {activeTab === "current-orders" && (
              <CurrentOrdersTab
                orders={currentOrders}
                setActiveReview={setActiveReview}
              />
            )}

            {activeTab === "order-history" && (
              <OrderHistoryTab
                orders={orders.filter((o) => o.status === "delivered")}
                setActiveReview={setActiveReview}
              />
            )}

            {activeTab === "addresses" && (
              <AddressesTab
                userData={userData}
                toggleAddressEdit={toggleAddressEdit}
                handleAddressInputChange={handleAddressInputChange}
                saveAddressChanges={saveAddressChanges}
              />
            )}
          </div>
        </div>
      </div>

      {activeReview && (
        <ReviewModal
          activeReview={activeReview}
          setActiveReview={setActiveReview}
          reviewRating={reviewRating}
          setReviewRating={setReviewRating}
          reviewText={reviewText}
          setReviewText={setReviewText}
          submitReview={submitReview}
        />
      )}
    </motion.div>
  );
};

export default UserProfilePage;
