import { useState } from 'react'
import { Search, Filter, Grid, List } from 'lucide-react'
import { ImageGallery } from '../components/ImageGallery'
import { useCart } from '../contexts/CartContext'

const FLOWER_PRODUCTS = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Premium Flower ${i + 1}`,
  price: 35 + Math.random() * 50,
  images: [
    `https://via.placeholder.com/500x500?text=Flower+${i + 1}+Image+1`,
    `https://via.placeholder.com/500x500?text=Flower+${i + 1}+Image+2`,
  ],
  videoUrl: `https://via.placeholder.com/500x500?text=Flower+${i + 1}+Video`,
  description: `High-quality THCA flower with exceptional potency and flavor profile.`,
  stock: Math.floor(Math.random() * 200) + 10,
  variants: {
    weights: ['1g', '3.5g', '7g', '14g', '28g'],
    strainTypes: ['Sativa', 'Indica', 'Hybrid'],
    potency: ['Low', 'Medium', 'High', 'Premium'],
    effects: ['Relaxing', 'Energizing', 'Balanced', 'Creative'],
  },
}))

export default function FlowerCategory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedProduct, setSelectedProduct] = useState<typeof FLOWER_PRODUCTS[0] | null>(null)
  const [selectedVariants, setSelectedVariants] = useState({
    weight: '3.5g',
    strain: 'Hybrid',
    potency: 'High',
    effect: 'Balanced',
  })
  const { addToCart } = useCart()

  const filteredProducts = FLOWER_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddToCart = (product: typeof FLOWER_PRODUCTS[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      variants: selectedVariants,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Flower Category</h1>
          <p className="text-gray-600">Premium THCA flower products - 25 varieties</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex gap-4 items-center">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            <Filter size={20} />
            Filter
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                onClick={() => setSelectedProduct(product)}>
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(product)
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow p-4 flex gap-6 hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedProduct(product)}>
                <img src={product.images[0]} alt={product.name} className="w-32 h-32 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(product)
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-500 hover:text-gray-700 float-right text-2xl"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Gallery */}
                <div>
                  <ImageGallery images={selectedProduct.images} alt={selectedProduct.name} />
                  {selectedProduct.videoUrl && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Product Video</p>
                      <video src={selectedProduct.videoUrl} controls className="w-full rounded-lg" />
                    </div>
                  )}
                </div>

                {/* Product Info & Variants */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                  <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                  <p className="text-3xl font-bold text-blue-600 mb-6">${selectedProduct.price.toFixed(2)}</p>

                  {/* Variants */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Weight</label>
                      <select
                        value={selectedVariants.weight}
                        onChange={(e) => setSelectedVariants({ ...selectedVariants, weight: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        {selectedProduct.variants.weights.map((w) => (
                          <option key={w} value={w}>{w}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Strain Type</label>
                      <select
                        value={selectedVariants.strain}
                        onChange={(e) => setSelectedVariants({ ...selectedVariants, strain: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        {selectedProduct.variants.strainTypes.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Potency</label>
                      <select
                        value={selectedVariants.potency}
                        onChange={(e) => setSelectedVariants({ ...selectedVariants, potency: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        {selectedProduct.variants.potency.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Effect</label>
                      <select
                        value={selectedVariants.effect}
                        onChange={(e) => setSelectedVariants({ ...selectedVariants, effect: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        {selectedProduct.variants.effects.map((e) => (
                          <option key={e} value={e}>{e}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct)
                      setSelectedProduct(null)
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
