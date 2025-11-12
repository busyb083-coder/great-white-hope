import { Plus, Edit2, Trash2, Eye } from 'lucide-react'
import AdminLayout from '../components/admin/AdminLayout'
import { useState } from 'react'

export default function AdminContent() {
  const [pages, setPages] = useState([])

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Content Pages</h1>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            <Plus size={20} />
            New Page
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Slug</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Updated</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-600">
                  No pages created yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
