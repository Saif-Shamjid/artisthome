// ProfileTab.jsx
import { FiUser, FiMail, FiEdit2 } from "react-icons/fi";

const ProfileTab = ({
  userData,
  toggleProfileEdit,
  handleProfileInputChange,
  saveProfileChanges,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-2xl text-amber-900">
          Profile Information
        </h2>
        <button
          onClick={toggleProfileEdit}
          className="flex items-center text-amber-700 hover:text-amber-800"
        >
          <FiEdit2 className="mr-1" />
          {userData.isEditingProfile ? "Cancel" : "Edit"}
        </button>
      </div>

      {userData.isEditingProfile ? (
        <ProfileEditForm
          userData={userData}
          handleProfileInputChange={handleProfileInputChange}
          saveProfileChanges={saveProfileChanges}
        />
      ) : (
        <ProfileView userData={userData} />
      )}
    </div>
  );
};

const ProfileEditForm = ({
  userData,
  handleProfileInputChange,
  saveProfileChanges,
}) => (
  <div className="space-y-4">
    <ProfileInputField
      label="Full Name"
      name="name"
      value={userData.name}
      onChange={handleProfileInputChange}
    />
    <ProfileInputField
      label="Email Address"
      name="email"
      value={userData.email}
      onChange={handleProfileInputChange}
      type="email"
    />
    <ProfileInputField
      label="Phone Number"
      name="phone"
      value={userData.phone}
      onChange={handleProfileInputChange}
      type="tel"
    />
    <button
      onClick={saveProfileChanges}
      className="mt-4 bg-amber-700 hover:bg-amber-800 text-white py-2 px-6 rounded-full font-medium transition-colors"
    >
      Save Changes
    </button>
  </div>
);

const ProfileView = ({ userData }) => (
  <div className="space-y-6">
    <ProfileInfoCard
      icon={<FiUser className="text-amber-700" />}
      title={userData.name}
      content={userData.email}
    />
    <ProfileInfoCard
      icon={<FiMail className="text-amber-700" />}
      title="Contact Information"
      content={
        <>
          <p className="text-amber-800">{userData.email}</p>
          <p className="text-amber-800">{userData.phone}</p>
        </>
      }
    />
  </div>
);

const ProfileInfoCard = ({ icon, title, content }) => (
  <div className="flex items-start p-4 bg-amber-50 rounded-lg">
    <div className="bg-amber-100 p-3 rounded-full mr-4">{icon}</div>
    <div>
      <h3 className="font-serif text-lg text-amber-900 mb-1">{title}</h3>
      {typeof content === "string" ? (
        <p className="text-amber-800">{content}</p>
      ) : (
        content
      )}
    </div>
  </div>
);

const ProfileInputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-amber-800 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-amber-200 rounded-lg"
    />
  </div>
);

export default ProfileTab;
