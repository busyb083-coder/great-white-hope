import { CategoryPage, ProductVariant } from '../components/CategoryPage'

const COLLABORATORS_PRODUCTS: ProductVariant[] = Array.from({ length: 25 }, (_, i) => ({
  id: `collab-${i + 1}`,
  name: `Collab Product ${i + 1}`,
  price: 45 + Math.random() * 100,
  stock: Math.floor(Math.random() * 100) + 5,
  images: [
    `https://via.placeholder.com/500x500?text=Collab+${i + 1}+Image+1`,
    `https://via.placeholder.com/500x500?text=Collab+${i + 1}+Image+2`,
  ],
  videoUrl: `https://via.placeholder.com/500x500?text=Collab+${i + 1}+Video`,
  description: `Limited edition collaboration product with premium quality and exclusive branding from top artists and brands.`,
  weightOptions: ['Limited', 'Exclusive', 'Standard'],
  quantityOptions: [1, 2, 5, 10],
  defaultWeight: 'Limited',
  defaultQuantity: 1,
}))

export default function Collaborators() {
  return (
    <CategoryPage
      categoryName="Collaborators"
      categoryDescription="Limited edition THCA collaborations - 25 exclusive products with premium quality"
      products={COLLABORATORS_PRODUCTS}
    />
  )
}
