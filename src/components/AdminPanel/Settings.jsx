import { useState } from 'react';
import { FiSettings, FiUser, FiLock, FiMail, FiBell, FiShield, FiTrash2 } from 'react-icons/fi';
import Moderators from './Moderators';

const Settings = () => {
  // Admin settings state
  const [adminSettings, setAdminSettings] = useState({
    emailNotifications: true,
    salesAlerts: true,
    lowStockAlerts: false,
    darkMode: false,
    twoFactorAuth: true
  });

  

  const [activeTab, setActiveTab] = useState('general');

  // Handle admin settings change
  const handleSettingChange = (setting) => {
    setAdminSettings({
      ...adminSettings,
      [setting]: !adminSettings[setting]
    });
  };

  

  return (
    <div className="bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden">
      {/* Settings Header */}
      <div className="border-b border-amber-200 p-6">
        <h3 className="text-lg font-medium text-amber-900 flex items-center">
          <FiSettings className="mr-2" /> Settings
        </h3>
      </div>

      {/* Settings Content */}
      <div className="flex flex-col md:flex-row">
        {/* Settings Sidebar */}
        <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-amber-200">
          <div className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                activeTab === 'general' ? 'bg-amber-100 text-amber-800' : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              <FiSettings className="mr-2" /> General
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                activeTab === 'notifications' ? 'bg-amber-100 text-amber-800' : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              <FiBell className="mr-2" /> Notifications
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                activeTab === 'security' ? 'bg-amber-100 text-amber-800' : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              <FiLock className="mr-2" /> Security
            </button>
            <button
              onClick={() => setActiveTab('moderators')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                activeTab === 'moderators' ? 'bg-amber-100 text-amber-800' : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              <FiUser className="mr-2" /> Moderators
            </button>
          </div>
        </div>

        {/* Settings Main Content */}
        <div className="flex-1 p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Dark Mode</h4>
                  <p className="text-xs text-amber-800/80">Switch between light and dark theme</p>
                </div>
                <button
                  onClick={() => handleSettingChange('darkMode')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    adminSettings.darkMode ? 'bg-amber-700' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      adminSettings.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Store Currency</h4>
                  <p className="text-xs text-amber-800/80">Set your default currency</p>
                </div>
                <select className="px-3 py-2 border border-amber-200 rounded-lg text-sm">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                  <option>JPY (¥)</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Timezone</h4>
                  <p className="text-xs text-amber-800/80">Set your local timezone</p>
                </div>
                <select className="px-3 py-2 border border-amber-200 rounded-lg text-sm">
                  <option>UTC-05:00 Eastern Time</option>
                  <option>UTC-08:00 Pacific Time</option>
                  <option>UTC+00:00 London</option>
                  <option>UTC+01:00 Paris</option>
                </select>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Email Notifications</h4>
                  <p className="text-xs text-amber-800/80">Receive email alerts</p>
                </div>
                <button
                  onClick={() => handleSettingChange('emailNotifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    adminSettings.emailNotifications ? 'bg-amber-700' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      adminSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Sales Alerts</h4>
                  <p className="text-xs text-amber-800/80">Get notified for new orders</p>
                </div>
                <button
                  onClick={() => handleSettingChange('salesAlerts')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    adminSettings.salesAlerts ? 'bg-amber-700' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      adminSettings.salesAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Low Stock Alerts</h4>
                  <p className="text-xs text-amber-800/80">Get notified when stock is low</p>
                </div>
                <button
                  onClick={() => handleSettingChange('lowStockAlerts')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    adminSettings.lowStockAlerts ? 'bg-amber-700' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      adminSettings.lowStockAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Two-Factor Authentication</h4>
                  <p className="text-xs text-amber-800/80">Add an extra layer of security</p>
                </div>
                <button
                  onClick={() => handleSettingChange('twoFactorAuth')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    adminSettings.twoFactorAuth ? 'bg-amber-700' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      adminSettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <h4 className="text-sm font-medium text-amber-800 mb-2">Change Password</h4>
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="Current password"
                    className="w-full px-4 py-2 border border-amber-200 rounded-lg text-sm"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full px-4 py-2 border border-amber-200 rounded-lg text-sm"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-4 py-2 border border-amber-200 rounded-lg text-sm"
                  />
                  <button className="mt-2 px-4 py-2 bg-amber-700 hover:bg-amber-800 text-cream-50 rounded-lg text-sm">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Moderators Settings */}
          {activeTab === 'moderators' && (<Moderators></Moderators>)}
        </div>
      </div>
    </div>
  );
};

export default Settings;