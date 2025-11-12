import { CategoryPage, ProductVariant } from '../components/CategoryPage'

const CONCENTRATES_PRODUCTS: ProductVariant[] = Array.from({ length: 25 }, (_, i) => ({
  id: `concentrate-${i + 1}`,
  name: `Premium Concentrate ${i + 1}`,
  price: 50 + Math.random() * 80,
  stock: Math.floor(Math.random() * 150) + 5,
  images: [
    `https://via.placeholder.com/500x500?text=Concentrate+${i + 1}+Image+1`,
    `https://via.placeholder.com/500x500?text=Concentrate+${i + 1}+Image+2`,
  ],
  videoUrl: `https://via.placeholder.com/500x500?text=Concentrate+${i + 1}+Video`,
  description: `Potent THCA concentrate with superior extraction methods. Ideal for experienced users seeking maximum potency and flavor.`,
  weightOptions: ['0.5g', '1g', '3.5g', '7g'],
  quantityOptions: [1, 2, 3, 5],
  defaultWeight: '1g',
  defaultQuantity: 1,
}))

export default function Concentrates() {
  return (
    <CategoryPage
      categoryName="Concentrates"
      categoryDescription="Premium THCA concentrates - 25 varieties with customizable weight and quantity options"
      products={CONCENTRATES_PRODUCTS}
    />
  )
}
