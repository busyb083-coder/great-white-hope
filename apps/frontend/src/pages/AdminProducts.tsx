import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, Search } from 'lucide-react'
import AdminLayout from '../components/admin/AdminLayout'
import { productsAPI } from '../lib/api'

interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  sku: string
  description?: string
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: 'Flower',
    stock: 0,
    sku: '',
    description: '',
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      // Mock data for now - will be replaced with API call
      const mockProducts: Product[] = [
        { id: 1, name: 'Premium Flower', price: 45.99, category: 'Flower', stock: 50, sku: 'FLOWER-001' },
        { id: 2, name: 'Concentrate', price: 65.99, category: 'Concentrates', stock: 30, sku: 'CONC-001' },
        { id: 3, name: 'Edible', price: 25.99, category: 'Miscellaneous', stock: 100, sku: 'EDIBLE-001' },
      ]
      setProducts(mockProducts)
    } catch (err) {
      console.error('Failed to load products:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.name || !formData.sku) {
      alert('Name and SKU are required')
      return
    }

    try {
      if (editingId) {
        // Update existing product
        setProducts(products.map(p => p.id === editingId ? { ...p, ...formData } : p))
      } else {
        // Add new product
        const newProduct = { ...formData, id: Date.now() } as Product
        setProducts([...products, newProduct])
      }
      resetForm()
      setShowForm(false)
    } catch (err) {
      console.error('Failed to save product:', err)
    }
  }

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      sku: product.sku,
      description: product.description || '',
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      category: 'Flower',
      stock: 0,
      sku: '',
      description: '',
    })
    setEditingId(null)
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <button
            onClick={() => {
              resetForm()
              setShowForm(!showForm)
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="SKU"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Flower">Flower</option>
                <option value="Concentrates">Concentrates</option>
                <option value="Miscellaneous">Miscellaneous</option>
                <option value="Collaborators">Collaborators</option>
              </select>
              <input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                rows={4}
              />
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition"
                >
                  {editingId ? 'Update Product' : 'Create Product'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    resetForm()
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-2 mb-4">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading products...</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">SKU</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Stock</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-gray-600">{product.sku}</td>
                    <td className="px-6 py-4 text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 font-semibold text-blue-600">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded transition"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
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
        )}
      </div>
    </AdminLayout>
  )
}
