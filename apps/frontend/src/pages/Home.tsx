import { useState } from 'react'
import { ArrowRight, ShoppingCart, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  const featuredProducts = [
    { id: 1, name: 'Premium Live Resin', price: 4500, image: 'https://via.placeholder.com/300x300?text=Live+Resin', category: 'Concentrates' },
    { id: 2, name: 'Diamond THCA Sauce', price: 5000, image: 'https://via.placeholder.com/300x300?text=Diamond+Sauce', category: 'Concentrates' },
    { id: 3, name: 'Premium Flower Oz', price: 9000, image: 'https://via.placeholder.com/300x300?text=Premium+Flower', category: 'Flower' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur z-50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Great White Hope
          </h1>
          <div className="flex items-center gap-6">
            <Link to="/shop" className="hover:text-blue-400 transition">Shop</Link>
            <Link to="/cart" className="relative hover:text-blue-400 transition">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                Premium <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">THCA</span> Hemp Products
              </h2>
              <p className="text-xl text-gray-300">
                Discover the finest selection of THCA concentrates, flowers, and premium collaborations. Crafted for connoisseurs.
              </p>
              <div className="flex gap-4 pt-4">
                <Link
                  to="/shop"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition transform hover:scale-105"
                >
                  Shop Now <ArrowRight size={20} />
                </Link>
                <button className="border-2 border-blue-400 hover:bg-blue-400/10 px-8 py-3 rounded-lg font-semibold transition">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-96 animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-3xl"></div>
              <img
                src="https://via.placeholder.com/500x500?text=Premium+THCA"
                alt="Premium THCA Products"
                className="relative w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold mb-12 text-center">Featured Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-gray-800 rounded-xl overflow-hidden hover:shadow-2xl transition transform hover:scale-105 duration-300"
              >
                <div className="relative h-64 overflow-hidden bg-gray-700">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-blue-400 mb-2">{product.category}</p>
                  <h4 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition">{product.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-cyan-400">${(product.price / 100).toFixed(2)}</span>
                    <button className="bg-blue-500 hover:bg-blue-600 p-2 rounded-lg transition transform hover:scale-110">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🔒', title: 'Secure Checkout', desc: '5 payment processors for your convenience' },
              { icon: '📦', title: 'Fast Shipping', desc: 'Quick and discreet delivery' },
              { icon: '✨', title: 'Premium Quality', desc: 'Lab-tested THCA products' },
            ].map((feature, i) => (
              <div key={i} className="bg-gray-800 p-8 rounded-xl text-center hover:bg-gray-700 transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 Great White Hope. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
