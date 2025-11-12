import { useState } from 'react'
import { Search, Filter, Grid, List, ChevronLeft, ChevronRight, X, Play } from 'lucide-react'
import { ImageGallery } from './ImageGallery'
import { useCart } from '../contexts/CartContext'

export interface ProductVariant {
  id: string
  name: string
  price: number
  stock: number
  images: string[]
  videoUrl?: string
  description: string
  weightOptions: string[]
  quantityOptions: number[]
  defaultWeight: string
  defaultQuantity: number
}

interface CategoryPageProps {
  categoryName: string
  categoryDescription: string
  products: ProductVariant[]
}

export function CategoryPage({ categoryName, categoryDescription, products }: CategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedProduct, setSelectedProduct] = useState<ProductVariant | null>(null)
  const [selectedWeight, setSelectedWeight] = useState<string>('')
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addToCart } = useCart()

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleProductClick = (product: ProductVariant) => {
    setSelectedProduct(product)
    setSelectedWeight(product.defaultWeight)
    setSelectedQuantity(product.defaultQuantity)
    setCurrentImageIndex(0)
  }

  const handleAddToCart = (product: ProductVariant) => {
    if (!selectedWeight) {
      alert('Please select a weight/size')
      return
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: selectedQuantity,
      image: product.images[0],
      weight: selectedWeight,
      variants: {
        weight: selectedWeight,
        quantity: selectedQuantity,
      },
    })

    setSelectedProduct(null)
  }

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length)
    }
  }

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{categoryName}</h1>
          <p className="text-gray-600">{categoryDescription}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex gap-4 items-center flex-wrap">
          <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            <Filter size={20} />
            <span className="text-sm">Filter</span>
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              title="Grid view"
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              title="List view"
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden group"
                onClick={() => handleProductClick(product)}
              >
                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  {product.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
                      <Play size={40} className="text-white fill-white" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleProductClick(product)
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden flex flex-col sm:flex-row"
                onClick={() => handleProductClick(product)}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full sm:w-40 h-40 object-cover"
                />
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    <p className="text-xs text-gray-500">Stock: {product.stock} available</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleProductClick(product)
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition font-medium"
                    >
                      View Details
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full my-8 shadow-2xl">
            <div className="p-6">
              <button
                onClick={() => setSelectedProduct(null)}
                className="float-right text-gray-500 hover:text-gray-700 transition"
              >
                <X size={28} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 clear-right">
                {/* Image Gallery */}
                <div>
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative mb-4">
                    <img
                      src={selectedProduct.images[currentImageIndex]}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    {selectedProduct.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
                        >
                          <ChevronRight size={24} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedProduct.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`w-2 h-2 rounded-full transition ${
                                idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Video */}
                  {selectedProduct.videoUrl && (
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-gray-900 mb-2">Product Video</p>
                      <video
                        src={selectedProduct.videoUrl}
                        controls
                        className="w-full rounded-lg bg-gray-100"
                        poster={selectedProduct.images[0]}
                      />
                    </div>
                  )}
                </div>

                {/* Product Info & Variants */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{selectedProduct.description}</p>
                  <p className="text-3xl font-bold text-blue-600 mb-6">${selectedProduct.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mb-6">Stock: {selectedProduct.stock} available</p>

                  {/* Customizable Toggles */}
                  <div className="space-y-6 mb-8 bg-gray-50 p-6 rounded-lg">
                    {/* Weight/Size Toggle */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Weight / Size
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedProduct.weightOptions.map((weight) => (
                          <button
                            key={weight}
                            onClick={() => setSelectedWeight(weight)}
                            className={`py-3 px-4 rounded-lg font-medium transition border-2 ${
                              selectedWeight === weight
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-900 border-gray-300 hover:border-blue-400'
                            }`}
                          >
                            {weight}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity Toggle */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Quantity
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedProduct.quantityOptions.map((qty) => (
                          <button
                            key={qty}
                            onClick={() => setSelectedQuantity(qty)}
                            className={`py-3 px-4 rounded-lg font-medium transition border-2 ${
                              selectedQuantity === qty
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-900 border-gray-300 hover:border-blue-400'
                            }`}
                          >
                            {qty}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition text-lg"
                  >
                    Add to Cart
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-3 rounded-lg transition"
                  >
                    Close
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
