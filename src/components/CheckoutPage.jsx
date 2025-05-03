import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronLeft, FiCreditCard, FiTruck, FiLock } from "react-icons/fi";

const CheckoutPage = () => {
  const [activeTab, setActiveTab] = useState("shipping");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "United States",
    state: "",
    zip: "",
    phone: "",
    saveInfo: false,
    shippingMethod: "standard",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  // Sample product data - replace with actual cart data
  const product = {
    id: 1,
    title: "Harmony Wall Panel",
    price: 249,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
    color: "Natural Teak",
    size: "Medium (24x24in)",
  };

  const shippingMethods = [
    {
      id: "standard",
      name: "Standard Shipping",
      price: 0,
      est: "3-5 business days",
    },
    {
      id: "express",
      name: "Express Shipping",
      price: 9.99,
      est: "2-3 business days",
    },
    {
      id: "priority",
      name: "Priority Shipping",
      price: 19.99,
      est: "1-2 business days",
    },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission and payment processing
    console.log("Form submitted", formData);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const subtotal = product.price * product.quantity;
  const shippingCost =
    shippingMethods.find((m) => m.id === formData.shippingMethod)?.price || 0;
  const tax = subtotal * 0.08; // Example tax calculation
  const total = subtotal + shippingCost + tax;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-cream-50/95 via-cream-50/90 to-cream-50/80 py-12"
    >
      <div className="container mx-auto px-4">
        {/* Back button */}
        <motion.button
          onClick={handleGoBack}
          className="flex items-center text-amber-700 mb-6"
          whileHover={{ x: -2 }}
        >
          <FiChevronLeft className="mr-1" />
          Back to Product
        </motion.button>

        {/* Mobile/Tablet: Order Summary First */}
        <div className="block lg:hidden mb-8">
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <h2 className="font-serif text-xl text-amber-900 mb-4">
              Order Summary
            </h2>

            <div className="mb-6">
              <div className="flex items-start mb-4 pb-4 border-b border-amber-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-serif text-amber-900">{product.title}</h3>
                  <p className="text-sm text-amber-800/70 mb-1">
                    {product.color} • {product.size}
                  </p>
                  <p className="text-amber-800">
                    ${product.price.toFixed(2)} × {product.quantity}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-amber-800">Subtotal</span>
                <span className="text-amber-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-800">Shipping</span>
                <span className="text-amber-900">
                  {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-800">Tax</span>
                <span className="text-amber-900">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between border-t border-amber-200 pt-4">
              <span className="font-serif text-lg text-amber-900">Total</span>
              <span className="font-serif text-lg text-amber-900">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form - Now appears second on mobile */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 order-2 lg:order-1">
            <h1 className="font-serif text-2xl text-amber-900 mb-6">
              Checkout
            </h1>

            {/* Progress Steps */}
            <div className="flex justify-between mb-8">
              <button
                onClick={() => setActiveTab("shipping")}
                className={`flex flex-col items-center ${
                  activeTab === "shipping"
                    ? "text-amber-700"
                    : "text-amber-800/70"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    activeTab === "shipping"
                      ? "bg-amber-700 text-white"
                      : "bg-amber-100"
                  }`}
                >
                  <FiTruck size={18} />
                </div>
                <span className="text-sm">Shipping</span>
              </button>

              <button
                onClick={() => setActiveTab("payment")}
                className={`flex flex-col items-center ${
                  activeTab === "payment"
                    ? "text-amber-700"
                    : "text-amber-800/70"
                }`}
                disabled={activeTab !== "payment"}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    activeTab === "payment"
                      ? "bg-amber-700 text-white"
                      : "bg-amber-100"
                  }`}
                >
                  <FiCreditCard size={18} />
                </div>
                <span className="text-sm">Payment</span>
              </button>
            </div>

            {/* Shipping Information */}
            {activeTab === "shipping" && (
              <form onSubmit={() => setActiveTab("payment")}>
                <div className="mb-6">
                  <h2 className="font-serif text-xl text-amber-900 mb-4">
                    Contact Information
                  </h2>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-amber-800 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="font-serif text-xl text-amber-900 mb-4">
                    Shipping Address
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-amber-800 mb-1"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-amber-200 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-amber-800 mb-1"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-amber-200 rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="address"
                      className="block text-amber-800 mb-1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-amber-200 rounded-lg"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="apartment"
                      className="block text-amber-800 mb-1"
                    >
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-amber-200 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-amber-800 mb-1"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-amber-200 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-amber-800 mb-1"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-amber-200 rounded-lg"
                        required
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-amber-800 mb-1"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-amber-200 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="zip"
                        className="block text-amber-800 mb-1"
                      >
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-amber-200 rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="phone"
                      className="block text-amber-800 mb-1"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-amber-200 rounded-lg"
                      required
                    />
                  </div>

                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      id="saveInfo"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleChange}
                      className="mr-2 h-4 w-4 text-amber-700 focus:ring-amber-500 border-amber-300 rounded"
                    />
                    <label htmlFor="saveInfo" className="text-amber-800">
                      Save this information for next time
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="font-serif text-xl text-amber-900 mb-4">
                    Shipping Method
                  </h2>
                  <div className="space-y-3">
                    {shippingMethods.map((method) => (
                      <div key={method.id} className="flex items-center">
                        <input
                          type="radio"
                          id={method.id}
                          name="shippingMethod"
                          value={method.id}
                          checked={formData.shippingMethod === method.id}
                          onChange={handleChange}
                          className="mr-3 h-4 w-4 text-amber-700 focus:ring-amber-500 border-amber-300"
                        />
                        <label htmlFor={method.id} className="flex-1">
                          <div className="flex justify-between">
                            <span className="text-amber-800">
                              {method.name}
                            </span>
                            <span className="text-amber-900">
                              ${method.price.toFixed(2)}
                            </span>
                          </div>
                          <div className="text-sm text-amber-800/70">
                            {method.est}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 px-6 rounded-full font-medium transition-colors"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {/* Payment Information */}
            {activeTab === "payment" && (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h2 className="font-serif text-xl text-amber-900 mb-4">
                    Payment Method
                  </h2>
                  <div className="border border-amber-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        id="creditCard"
                        name="paymentMethod"
                        value="creditCard"
                        checked
                        className="mr-2 h-4 w-4 text-amber-700 focus:ring-amber-500 border-amber-300"
                      />
                      <label htmlFor="creditCard" className="text-amber-800">
                        Credit Card
                      </label>
                    </div>

                    <div className="space-y-4 mt-4">
                      <div>
                        <label
                          htmlFor="cardNumber"
                          className="block text-amber-800 mb-1"
                        >
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-2 border border-amber-200 rounded-lg"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="cardName"
                          className="block text-amber-800 mb-1"
                        >
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-amber-200 rounded-lg"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="expiry"
                            className="block text-amber-800 mb-1"
                          >
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 border border-amber-200 rounded-lg"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="cvv"
                            className="block text-amber-800 mb-1"
                          >
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="123"
                            className="w-full px-4 py-2 border border-amber-200 rounded-lg"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-amber-800/70">
                    <FiLock className="mr-2" />
                    Your payment is secured with SSL encryption
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 px-6 rounded-full font-medium transition-colors"
                >
                  Pay ${total.toFixed(2)}
                </button>
              </form>
            )}
          </div>

          {/* Order Summary - Hidden on mobile (already shown above) */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 h-fit sticky top-8 hidden lg:block order-1 lg:order-2">
            <h2 className="font-serif text-xl text-amber-900 mb-6">
              Order Summary
            </h2>

            <div className="mb-6">
              <div className="flex items-start mb-4 pb-4 border-b border-amber-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-serif text-amber-900">{product.title}</h3>
                  <p className="text-sm text-amber-800/70 mb-1">
                    {product.color} • {product.size}
                  </p>
                  <p className="text-amber-800">
                    ${product.price.toFixed(2)} × {product.quantity}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-amber-800">Subtotal</span>
                <span className="text-amber-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-800">Shipping</span>
                <span className="text-amber-900">
                  {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-800">Tax</span>
                <span className="text-amber-900">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between border-t border-amber-200 pt-4 mb-6">
              <span className="font-serif text-lg text-amber-900">Total</span>
              <span className="font-serif text-lg text-amber-900">
                ${total.toFixed(2)}
              </span>
            </div>

            {activeTab === "shipping" && (
              <div className="text-sm text-amber-800/70">
                You'll have a chance to review your order before payment.
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
