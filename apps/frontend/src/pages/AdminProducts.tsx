import { useState } from 'react'
import { Plus, Edit2, Trash2, Upload } from 'lucide-react'
import AdminLayout from '../components/admin/AdminLayout'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', price: '', category: '', sku: '' })

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    setProducts([...products, { ...formData, id: Date.now() }])
    setFormData({ name: '', price: '', category: '', sku: '' })
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    setProducts(products.filter((p: any) => p.id !== id))
  }

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Products</h1>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              <Upload size={20} />
              Bulk Import
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>
        </div>

        {/* Add Product Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <form onSubmit={handleAddProduct}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="SKU"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  type="number"
                  placeholder="Price (cents)"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="border rounded px-3 py-2"
                  required
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="border rounded px-3 py-2"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Concentrates">Concentrates</option>
                  <option value="Flower">Flower</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                  <option value="Collaborators">Collaborators</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Save Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">SKU</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-600">
                    No products yet. Click "Add Product" to get started.
                  </td>
                </tr>
              ) : (
                products.map((product: any) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{product.sku}</td>
                    <td className="px-6 py-3">{product.name}</td>
                    <td className="px-6 py-3">{product.category}</td>
                    <td className="px-6 py-3">${(product.price / 100).toFixed(2)}</td>
                    <td className="px-6 py-3 flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
