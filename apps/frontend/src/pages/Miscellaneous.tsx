import { CategoryPage, ProductVariant } from '../components/CategoryPage'

const MISCELLANEOUS_PRODUCTS: ProductVariant[] = Array.from({ length: 25 }, (_, i) => ({
  id: `misc-${i + 1}`,
  name: `Misc Product ${i + 1}`,
  price: 15 + Math.random() * 60,
  stock: Math.floor(Math.random() * 300) + 20,
  images: [
    `https://via.placeholder.com/500x500?text=Misc+${i + 1}+Image+1`,
    `https://via.placeholder.com/500x500?text=Misc+${i + 1}+Image+2`,
  ],
  videoUrl: `https://via.placeholder.com/500x500?text=Misc+${i + 1}+Video`,
  description: `Quality THCA products including edibles, topicals, tinctures, and accessories for every preference.`,
  weightOptions: ['Single', 'Pack of 5', 'Pack of 10', 'Bulk'],
  quantityOptions: [1, 2, 3, 5, 10],
  defaultWeight: 'Single',
  defaultQuantity: 1,
}))

export default function Miscellaneous() {
  return (
    <CategoryPage
      categoryName="Miscellaneous"
      categoryDescription="Premium THCA products - 25 varieties including edibles, topicals, and accessories"
      products={MISCELLANEOUS_PRODUCTS}
    />
  )
}
