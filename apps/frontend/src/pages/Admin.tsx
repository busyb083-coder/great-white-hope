import { useState } from 'react'

export default function Admin() {
  const [products, setProducts] = useState([])

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-black text-white p-4">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </header>

      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
          Add Product
        </button>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center">No products</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
