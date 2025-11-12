import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Grid, List, ShoppingCart, AlertCircle } from 'lucide-react'
import { productsAPI } from '../lib/api'
import { useCart } from '../contexts/CartContext'

interface Product {
  id: number
  name: string
  price: number
  category: string
  description?: string
  image?: string
  stock?: number
}

const MOCK_PRODUCTS = [
  { id: 1, sku: 'CONC-001', name: 'Premium Live Resin', price: 4500, category: 'Concentrates', image: 'https://via.placeholder.com/300x300?text=Live+Resin' },
  { id: 2, sku: 'CONC-002', name: 'Diamond THCA Sauce', price: 5000, category: 'Concentrates', image: 'https://via.placeholder.com/300x300?text=Diamond' },
  { id: 3, sku: 'CONC-003', name: 'Rosin Concentrate', price: 3500, category: 'Concentrates', image: 'https://via.placeholder.com/300x300?text=Rosin' },
  { id: 4, sku: 'FLOWER-001', name: 'Premium Flower Oz', price: 9000, category: 'Flower', image: 'https://via.placeholder.com/300x300?text=Flower' },
  { id: 5, sku: 'FLOWER-002', name: 'Exotic Strain Quarter', price: 4500, category: 'Flower', image: 'https://via.placeholder.com/300x300?text=Exotic' },
  { id: 6, sku: 'FLOWER-003', name: 'Bulk Flower Half Pound', price: 17000, category: 'Flower', image: 'https://via.placeholder.com/300x300?text=Bulk' },
  { id: 7, sku: 'MISC-001', name: 'Rolling Papers Pack', price: 300, category: 'Miscellaneous', image: 'https://via.placeholder.com/300x300?text=Papers' },
  { id: 8, sku: 'MISC-002', name: 'Glass Bong', price: 5000, category: 'Miscellaneous', image: 'https://via.placeholder.com/300x300?text=Bong' },
]

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { addItem } = useCart()

  // Load products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const response = await productsAPI.getAll()
        setProducts(response.data || MOCK_PRODUCTS)
      } catch (err) {
        console.error('Failed to load products:', err)
        setProducts(MOCK_PRODUCTS)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  // Filter products
  useEffect(() => {
    let filtered = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'All' || p.category === category
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    })
    setFilteredProducts(filtered)
  }, [products, search, category, priceRange])

  const categories = ['All', 'Concentrates', 'Flower', 'Miscellaneous', 'Collaborators']

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 space-y-6 sticky top-24">
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold mb-3">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold mb-3">Category</label>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`w-full text-left px-4 py-2 rounded transition ${
                        category === cat
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold mb-3">Price Range</label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600">
                    ${priceRange[0]} - ${priceRange[1]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* View Toggle */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">{filteredProducts.length} products found</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 text-red-700">
                <AlertCircle size={20} />
                {error}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No products found matching your criteria</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`group bg-white rounded-lg shadow hover:shadow-xl transition transform hover:scale-105 duration-300 overflow-hidden ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <div className={viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'h-48 overflow-hidden bg-gray-200'}>
                      <img
                        src={product.image || 'https://via.placeholder.com/300x300'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition">{product.name}</h3>
                      </Link>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between mt-auto pt-4">
                        <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={(product.stock || 0) === 0}
                          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-2 rounded transition transform hover:scale-110"
                        >
                          <ShoppingCart size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
