import { useParams } from 'react-router-dom'

export default function ProductDetail() {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold">Product {id}</h1>
      <p>Product details coming soon</p>
    </div>
  )
}
