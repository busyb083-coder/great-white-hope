import { useState, useEffect } from 'react'
import api from '../api/client'

export default function Shop() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.get('/api/v1/products').then(res => setProducts(res.data.products))
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <h1 className="text-3xl font-bold p-8">Shop</h1>
      <div className="grid grid-cols-3 gap-4 p-8">
        {products.map((p: any) => (
          <div key={p.id} className="border p-4 rounded">
            <h3>{p.name}</h3>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
