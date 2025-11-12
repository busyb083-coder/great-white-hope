import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white p-4">
        <h1 className="text-3xl font-bold">Great White Hope</h1>
        <p className="text-gray-300">Premium THCA Hemp Products</p>
      </header>

      <nav className="bg-gray-100 p-4">
        <Link to="/shop" className="mr-4 text-blue-600 hover:underline">Shop</Link>
        <Link to="/cart" className="mr-4 text-blue-600 hover:underline">Cart</Link>
        <Link to="/admin" className="text-blue-600 hover:underline">Admin</Link>
      </nav>

      <main className="p-8">
        <h2 className="text-2xl font-bold mb-4">Welcome</h2>
        <p className="mb-4">Premium THCA hemp products for discerning customers.</p>
        <Link to="/shop" className="bg-blue-600 text-white px-4 py-2 rounded">Browse Products</Link>
      </main>
    </div>
  )
}
