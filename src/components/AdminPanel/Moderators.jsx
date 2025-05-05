import { useState } from 'react';
import { FiUser, FiShield, FiLock, FiTrash2, FiEdit, FiChevronDown, FiChevronUp, FiKey,FiEye  } from 'react-icons/fi';

const Moderators = () => {
  // Moderators state
  const [moderators, setModerators] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      accessLevel: "full",
      lastActive: "2 hours ago",
      passwordSet: true
    },
    {
      id: 2,
      name: "Sam Wilson",
      email: "sam@example.com",
      accessLevel: "restricted",
      lastActive: "1 day ago",
      passwordSet: true,
      permissions: {
        manageProducts: false,
        viewOrders: true,
        manageCustomers: false,
        viewAnalytics: true,
        manageContent: false
      }
    }
  ]);

  const [newModerator, setNewModerator] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accessLevel: 'restricted',
    showPassword: false
  });

  // Define permissions that can be restricted
  const availablePermissions = [
    { id: 'manageProducts', label: 'Manage Products' },
    { id: 'viewOrders', label: 'View Orders' },
  ];

  // State for expanded moderator for permission editing
  const [expandedModerator, setExpandedModerator] = useState(null);
  const [resetPasswordFor, setResetPasswordFor] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  const handleModeratorInputChange = (e) => {
    const { name, value } = e.target;
    setNewModerator({
      ...newModerator,
      [name]: value
    });
  };

  const togglePasswordVisibility = () => {
    setNewModerator({
      ...newModerator,
      showPassword: !newModerator.showPassword
    });
  };

  const handleAddModerator = () => {
    if (newModerator.name && newModerator.email && newModerator.password && newModerator.password === newModerator.confirmPassword) {
      const moderator = {
        ...newModerator,
        id: Date.now(),
        lastActive: "Just now",
        passwordSet: true,
        // Remove password fields from the stored moderator
        password: undefined,
        confirmPassword: undefined,
        showPassword: undefined,
        // Initialize all permissions as false for restricted access
        permissions: newModerator.accessLevel === 'full' 
          ? availablePermissions.reduce((acc, perm) => ({ ...acc, [perm.id]: true }), {})
          : availablePermissions.reduce((acc, perm) => ({ ...acc, [perm.id]: false }), {})
      };
      setModerators([...moderators, moderator]);
      setNewModerator({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        accessLevel: 'restricted',
        showPassword: false
      });
    }
  };

  const handleRemoveModerator = (id) => {
    setModerators(moderators.filter(mod => mod.id !== id));
  };

  const handleUpdateAccess = (id, accessLevel) => {
    setModerators(moderators.map(mod => {
      if (mod.id === id) {
        return {
          ...mod,
          accessLevel,
          // If switching to full access, enable all permissions
          permissions: accessLevel === 'full' 
            ? availablePermissions.reduce((acc, perm) => ({ ...acc, [perm.id]: true }), {})
            : mod.permissions
        };
      }
      return mod;
    }));
  };

  const togglePermission = (moderatorId, permissionId) => {
    setModerators(moderators.map(mod => {
      if (mod.id === moderatorId) {
        return {
          ...mod,
          permissions: {
            ...mod.permissions,
            [permissionId]: !mod.permissions[permissionId]
          }
        };
      }
      return mod;
    }));
  };

  const toggleExpandModerator = (moderatorId) => {
    setExpandedModerator(expandedModerator === moderatorId ? null : moderatorId);
    setResetPasswordFor(null); // Close password reset if open
  };

  const handleResetPassword = (moderatorId) => {
    setResetPasswordFor(resetPasswordFor === moderatorId ? null : moderatorId);
    setExpandedModerator(null); // Close permissions if open
    setNewPassword('');
  };

  const confirmPasswordReset = (moderatorId) => {
    if (newPassword) {
      setModerators(moderators.map(mod => {
        if (mod.id === moderatorId) {
          return {
            ...mod,
            passwordSet: true
          };
        }
        return mod;
      }));
      setResetPasswordFor(null);
      setNewPassword('');
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Add New Moderator Section */}
      <div className="bg-amber-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-amber-800 mb-3">Add New Moderator</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-amber-800/80 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={newModerator.name}
              onChange={handleModeratorInputChange}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg text-sm"
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="block text-xs text-amber-800/80 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={newModerator.email}
              onChange={handleModeratorInputChange}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label className="block text-xs text-amber-800/80 mb-1">Access Level</label>
            <select
              name="accessLevel"
              value={newModerator.accessLevel}
              onChange={handleModeratorInputChange}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg text-sm"
            >
              <option value="restricted">Restricted Access</option>
              <option value="full">Full Access</option>
            </select>
          </div>
        </div>
        
        {/* Password Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-xs text-amber-800/80 mb-1">Password</label>
            <div className="relative">
              <input
                type={newModerator.showPassword ? "text" : "password"}
                name="password"
                value={newModerator.password}
                onChange={handleModeratorInputChange}
                className="w-full px-4 py-2 border border-amber-200 rounded-lg text-sm pr-10"
                placeholder="Set password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-600"
              >
                {newModerator.showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs text-amber-800/80 mb-1">Confirm Password</label>
            <input
              type={newModerator.showPassword ? "text" : "password"}
              name="confirmPassword"
              value={newModerator.confirmPassword}
              onChange={handleModeratorInputChange}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg text-sm"
              placeholder="Confirm password"
            />
          </div>
        </div>
        
        <button
          onClick={handleAddModerator}
          disabled={!newModerator.name || !newModerator.email || !newModerator.password || newModerator.password !== newModerator.confirmPassword}
          className={`mt-4 px-4 py-2 rounded-lg text-sm ${
            !newModerator.name || !newModerator.email || !newModerator.password || newModerator.password !== newModerator.confirmPassword
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-amber-700 hover:bg-amber-800 text-white'
          }`}
        >
          Add Moderator
        </button>
      </div>

      {/* Current Moderators Section */}
      <div>
        <h4 className="text-sm font-medium text-amber-800 mb-3">Current Moderators</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-amber-200">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Access Level</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Last Active</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-amber-200">
              {moderators.map(moderator => (
                <>
                  <tr key={moderator.id} className="hover:bg-amber-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-amber-900">
                      {moderator.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-amber-900">
                      {moderator.email}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-amber-900">
                      <select
                        value={moderator.accessLevel}
                        onChange={(e) => handleUpdateAccess(moderator.id, e.target.value)}
                        className="px-2 py-1 border border-amber-200 rounded text-xs"
                      >
                        <option value="restricted">Restricted</option>
                        <option value="full">Full Access</option>
                      </select>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-amber-900">
                      {moderator.lastActive}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-amber-900 flex items-center space-x-2">
                      <button
                        onClick={() => toggleExpandModerator(moderator.id)}
                        className="text-amber-700 hover:text-amber-900"
                        title="Edit permissions"
                      >
                        {expandedModerator === moderator.id ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                      <button
                        onClick={() => handleResetPassword(moderator.id)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Reset password"
                      >
                        <FiKey />
                      </button>
                      <button
                        onClick={() => handleRemoveModerator(moderator.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Remove moderator"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                  
                  {/* Password Reset Section */}
                  {resetPasswordFor === moderator.id && (
                    <tr>
                      <td colSpan="5" className="px-4 py-4 bg-blue-50">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <div className="flex-1">
                            <label className="block text-xs text-blue-800/80 mb-1">New Password</label>
                            <div className="relative">
                              <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-blue-200 rounded-lg text-sm"
                                placeholder="Enter new password"
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => confirmPasswordReset(moderator.id)}
                              disabled={!newPassword}
                              className={`px-3 py-2 rounded-lg text-xs ${
                                !newPassword
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                              }`}
                            >
                              Confirm Reset
                            </button>
                            <button
                              onClick={() => setResetPasswordFor(null)}
                              className="px-3 py-2 rounded-lg text-xs bg-gray-200 hover:bg-gray-300 text-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                  
                  {/* Permissions Section */}
                  {expandedModerator === moderator.id && moderator.accessLevel === 'restricted' && (
                    <tr>
                      <td colSpan="5" className="px-4 py-4 bg-amber-50">
                        <h5 className="text-xs font-medium text-amber-800 mb-3">Restricted Access Permissions</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {availablePermissions.map(permission => (
                            <div key={permission.id} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`${moderator.id}-${permission.id}`}
                                checked={moderator.permissions[permission.id]}
                                onChange={() => togglePermission(moderator.id, permission.id)}
                                className="h-4 w-4 text-amber-700 border-amber-300 rounded focus:ring-amber-500"
                              />
                              <label htmlFor={`${moderator.id}-${permission.id}`} className="ml-2 text-sm text-amber-800">
                                {permission.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Access Levels Explanation */}
      <div className="bg-amber-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-amber-800 mb-2">Access Levels Explained</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-amber-200 rounded-lg p-3 bg-white">
            <h5 className="text-xs font-medium text-amber-800 flex items-center mb-2">
              <FiShield className="mr-2 text-green-600" /> Full Access
            </h5>
            <p className="text-xs text-amber-800/80">
              Can manage all aspects of the system including products, orders, customers, analytics, and settings.
            </p>
          </div>
          <div className="border border-amber-200 rounded-lg p-3 bg-white">
            <h5 className="text-xs font-medium text-amber-800 flex items-center mb-2">
              <FiLock className="mr-2 text-amber-600" /> Restricted Access
            </h5>
            <p className="text-xs text-amber-800/80">
              Customizable access permissions. Admin can select exactly which features the moderator can access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moderators;