import { useState, useEffect } from 'react'
import { Eye, Trash2, Download } from 'lucide-react'
import AdminLayout from '../components/admin/AdminLayout'

interface Order {
  id: number
  orderNumber: string
  customer: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  date: string
}

const MOCK_ORDERS: Order[] = [
  { id: 1, orderNumber: 'ORD-001', customer: 'John Doe', total: 149.99, status: 'delivered', date: '2024-01-15' },
  { id: 2, orderNumber: 'ORD-002', customer: 'Jane Smith', total: 89.99, status: 'shipped', date: '2024-01-14' },
  { id: 3, orderNumber: 'ORD-003', customer: 'Bob Johnson', total: 199.99, status: 'processing', date: '2024-01-13' },
]

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const handleDelete = (id: number) => {
    if (confirm('Delete this order?')) {
      setOrders(orders.filter(o => o.id !== id))
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Order #</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Total</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.orderNumber}</td>
                  <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 font-semibold text-blue-600">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded transition"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => alert('Download invoice for ' + order.orderNumber)}
                      className="text-green-600 hover:text-green-700 p-2 hover:bg-green-50 rounded transition"
                    >
                      <Download size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedOrder && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Details: {selectedOrder.orderNumber}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Customer</p>
                <p className="font-semibold text-gray-900">{selectedOrder.customer}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total</p>
                <p className="font-semibold text-blue-600">${selectedOrder.total.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Status</p>
                <p className="font-semibold text-gray-900">{selectedOrder.status}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Date</p>
                <p className="font-semibold text-gray-900">{selectedOrder.date}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
