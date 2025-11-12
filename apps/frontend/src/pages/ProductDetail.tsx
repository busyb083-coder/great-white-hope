import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react'

const PRODUCTS: Record<string, any> = {
  '1': { id: 1, name: 'Premium Live Resin', price: 4500, category: 'Concentrates', rating: 4.8, reviews: 24, description: 'High-quality live resin THCA concentrate with full terpene profile' },
  '2': { id: 2, name: 'Diamond THCA Sauce', price: 5000, category: 'Concentrates', rating: 4.9, reviews: 31, description: 'Pure THCA diamonds in terpene-rich sauce' },
  '3': { id: 3, name: 'Premium Flower Oz', price: 9000, category: 'Flower', rating: 4.7, reviews: 18, description: 'Premium quality THCA flower' },
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = PRODUCTS[id || '1']
  const [quantity, setQuantity] = useState(1)
  const [imageIndex, setImageIndex] = useState(0)
  const [liked, setLiked] = useState(false)

  const images = [
    'https://via.placeholder.com/500x500?text=Product+1',
    'https://via.placeholder.com/500x500?text=Product+2',
    'https://via.placeholder.com/500x500?text=Product+3',
  ]

  const nextImage = () => setImageIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setImageIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <a href="/shop" className="text-blue-600 hover:text-blue-800">← Back to Shop</a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden group">
              <img
                src={images[imageIndex]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`w-20 h-20 rounded border-2 transition ${
                    i === imageIndex ? 'border-blue-500' : 'border-gray-300'
                  }`}
                >
                  <img src={images[i]} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-blue-600 font-semibold mb-2">{product.category}</p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {'★'.repeat(Math.floor(product.rating))}
                  <span className="text-gray-600 ml-2">({product.reviews} reviews)</span>
                </div>
              </div>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="border-t border-b py-6">
              <p className="text-4xl font-bold text-blue-600 mb-4">${(product.price / 100).toFixed(2)}</p>
              
              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <label className="font-semibold">Quantity:</label>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-l border-r">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105 mb-4">
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              {/* Wishlist & Share */}
              <div className="flex gap-4">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex-1 py-2 rounded-lg border-2 transition ${
                    liked
                      ? 'bg-red-50 border-red-300 text-red-600'
                      : 'border-gray-300 hover:border-red-300'
                  }`}
                >
                  <Heart size={20} className="mx-auto" fill={liked ? 'currentColor' : 'none'} />
                </button>
                <button className="flex-1 py-2 rounded-lg border-2 border-gray-300 hover:border-blue-300 transition">
                  <Share2 size={20} className="mx-auto" />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Product Details</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Lab tested THCA concentrate</li>
                <li>✓ Full terpene profile</li>
                <li>✓ Premium quality</li>
                <li>✓ Discreet packaging</li>
                <li>✓ Fast shipping</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow hover:shadow-xl transition transform hover:scale-105 overflow-hidden">
                <div className="h-48 bg-gray-200">
                  <img src={`https://via.placeholder.com/300x300?text=Related+${i}`} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">Related Product {i}</h3>
                  <p className="text-blue-600 font-semibold">$45.00</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
