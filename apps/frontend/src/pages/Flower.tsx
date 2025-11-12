import { CategoryPage, ProductVariant } from '../components/CategoryPage'

const FLOWER_PRODUCTS: ProductVariant[] = Array.from({ length: 25 }, (_, i) => ({
  id: `flower-${i + 1}`,
  name: `Premium Flower ${i + 1}`,
  price: 35 + Math.random() * 50,
  stock: Math.floor(Math.random() * 200) + 10,
  images: [
    `https://via.placeholder.com/500x500?text=Flower+${i + 1}+Image+1`,
    `https://via.placeholder.com/500x500?text=Flower+${i + 1}+Image+2`,
  ],
  videoUrl: `https://via.placeholder.com/500x500?text=Flower+${i + 1}+Video`,
  description: `High-quality THCA flower with exceptional potency and flavor profile. Perfect for connoisseurs seeking premium cannabis experiences.`,
  weightOptions: ['1g', '3.5g', '7g', '14g', '28g'],
  quantityOptions: [1, 2, 3, 5, 10],
  defaultWeight: '3.5g',
  defaultQuantity: 1,
}))

export default function Flower() {
  return (
    <CategoryPage
      categoryName="Flower"
      categoryDescription="Premium THCA flower products - 25 varieties with customizable weight and quantity options"
      products={FLOWER_PRODUCTS}
    />
  )
}
