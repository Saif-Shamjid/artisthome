// AddressesTab.jsx
import { FiEdit2, FiHome, FiMapPin } from "react-icons/fi";

const AddressesTab = ({
  userData,
  toggleAddressEdit,
  handleAddressInputChange,
  saveAddressChanges,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-2xl text-amber-900">
          Shipping Addresses
        </h2>
        <button
          onClick={toggleAddressEdit}
          className="flex items-center text-amber-700 hover:text-amber-800"
        >
          <FiEdit2 className="mr-1" />
          {userData.isEditingAddress ? "Cancel" : "Edit"}
        </button>
      </div>

      {userData.isEditingAddress ? (
        <AddressEditForm
          shippingAddress={userData.shippingAddress}
          handleAddressInputChange={handleAddressInputChange}
          saveAddressChanges={saveAddressChanges}
        />
      ) : (
        <AddressView shippingAddress={userData.shippingAddress} />
      )}
    </div>
  );
};

const AddressEditForm = ({
  shippingAddress,
  handleAddressInputChange,
  saveAddressChanges,
}) => (
  <div className="space-y-4">
    <AddressInputField
      label="Street Address"
      name="street"
      value={shippingAddress.street}
      onChange={handleAddressInputChange}
    />

    <div className="grid grid-cols-2 gap-4">
      <AddressInputField
        label="City"
        name="city"
        value={shippingAddress.city}
        onChange={handleAddressInputChange}
      />
      <AddressInputField
        label="State"
        name="state"
        value={shippingAddress.state}
        onChange={handleAddressInputChange}
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <AddressInputField
        label="ZIP Code"
        name="zip"
        value={shippingAddress.zip}
        onChange={handleAddressInputChange}
      />
      <AddressSelectField
        label="Country"
        name="country"
        value={shippingAddress.country}
        onChange={handleAddressInputChange}
        options={["United States", "Canada", "United Kingdom"]}
      />
    </div>

    <button
      onClick={saveAddressChanges}
      className="mt-4 bg-amber-700 hover:bg-amber-800 text-white py-2 px-6 rounded-full font-medium transition-colors"
    >
      Save Address
    </button>
  </div>
);

const AddressView = ({ shippingAddress }) => (
  <div className="p-6 bg-amber-50 rounded-xl border border-amber-100">
    <div className="flex items-start mb-4">
      <div className="bg-amber-100 p-3 rounded-full mr-4">
        <FiHome className="text-amber-700" />
      </div>
      <div>
        <h3 className="font-serif text-lg text-amber-900 mb-2">
          Default Shipping Address
        </h3>
        <div className="space-y-2">
          <AddressLine
            icon={<FiMapPin className="text-amber-700" />}
            text={shippingAddress.street}
          />
          <AddressLine
            text={`${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}`}
          />
          <AddressLine text={shippingAddress.country} />
        </div>
      </div>
    </div>
  </div>
);

const AddressLine = ({ icon, text }) => (
  <div className="flex items-center">
    {icon || <FiMapPin className="text-amber-700 mr-2 opacity-0" />}
    <p className="text-amber-800">{text}</p>
  </div>
);

const AddressInputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-amber-800 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-amber-200 rounded-lg"
    />
  </div>
);

const AddressSelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-amber-800 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-amber-200 rounded-lg"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default AddressesTab;
