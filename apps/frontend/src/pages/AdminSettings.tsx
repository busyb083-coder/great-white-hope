import { Save } from 'lucide-react'
import AdminLayout from '../components/admin/AdminLayout'
import { useState } from 'react'

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'Great White Hope',
    siteDescription: 'Premium THCA Hemp Products',
    email: 'support@example.com',
    phone: '',
  })

  const handleSave = () => {
    alert('Settings saved!')
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">General Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Site Description</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full justify-center"
              >
                <Save size={20} />
                Save Settings
              </button>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Payment Processors</h2>
            <div className="space-y-3">
              {['Stripe', 'PayPal', 'Green Financial', 'CryptoMass', 'WooCommerce'].map((processor) => (
                <div key={processor} className="flex items-center justify-between p-3 border rounded">
                  <span>{processor}</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Configure</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
