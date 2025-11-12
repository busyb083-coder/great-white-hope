import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Share2, Star, AlertCircle } from 'lucide-react'
import { productsAPI } from '../lib/api'
import { useCart } from '../contexts/CartContext'

interface Product {
  id: number
  name: string
  price: number
  category: string
  description: string
  image?: string
  images?: string[]
  stock: number
  rating: number
  reviews: number
  sku: string
}

const MOCK_PRODUCT: Product = {
  id: 1,
  name: 'Premium THCA Flower',
  price: 45.99,
  category: 'Flower',
  description: 'High-quality THCA flower with potent effects. Carefully cultivated and hand-selected for premium quality.',
  image: 'https://via.placeholder.com/500x500?text=THCA+Flower',
  images: [
    'https://via.placeholder.com/500x500?text=THCA+Flower+1',
    'https://via.placeholder.com/500x500?text=THCA+Flower+2',
    'https://via.placeholder.com/500x500?text=THCA+Flower+3',
  ],
  stock: 25,
  rating: 4.5,
  reviews: 128,
  sku: 'FLOWER-001',
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const response = await productsAPI.getById(parseInt(id || '1'))
        setProduct(response.data || MOCK_PRODUCT)
      } catch (err) {
        console.error('Failed to load product:', err)
        setProduct(MOCK_PRODUCT)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AlertCircle size={48} className="mx-auto text-red-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate('/shop')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  const images = product.images || [product.image || 'https://via.placeholder.com/500x500']

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/shop')}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <ChevronLeft size={18} />
            Back to Shop
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative bg-white rounded-lg overflow-hidden shadow-lg group">
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-96 object-cover group-hover:scale-105 transition duration-300"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-2 rounded-full shadow transition"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-2 rounded-full shadow transition"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      idx === currentImageIndex ? 'border-blue-600' : 'border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-blue-600 font-semibold text-sm">{product.category}</p>
              <p className="text-gray-500 text-sm">SKU: {product.sku}</p>
            </div>

            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-600 text-sm mb-2">Price</p>
              <p className="text-4xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className={`p-4 rounded-lg ${product.stock > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className={product.stock > 0 ? 'text-green-700' : 'text-red-700'}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border border-gray-300 rounded-lg py-2"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white'
                }`}
              >
                <ShoppingCart size={20} />
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`px-6 py-3 rounded-lg border-2 transition ${
                  isFavorite
                    ? 'bg-red-50 border-red-600 text-red-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
              <button className="px-6 py-3 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition">
                <Share2 size={20} />
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">✓</span> Free shipping on orders over $100
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">✓</span> 30-day money back guarantee
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">✓</span> Secure checkout with multiple payment options
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Related Product {i}</h3>
                  <p className="text-blue-600 font-bold">$49.99</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
