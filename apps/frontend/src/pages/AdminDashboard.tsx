import { BarChart3, Package, ShoppingCart, Users } from 'lucide-react'
import AdminLayout from '../components/admin/AdminLayout'

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Products', value: '25', icon: Package, color: 'bg-blue-500' },
    { label: 'Total Orders', value: '0', icon: ShoppingCart, color: 'bg-green-500' },
    { label: 'Total Users', value: '1', icon: Users, color: 'bg-purple-500' },
    { label: 'Revenue', value: '$0', icon: BarChart3, color: 'bg-orange-500' },
  ]

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <p className="text-gray-600">No orders yet</p>
        </div>
      </div>
    </AdminLayout>
  )
}
