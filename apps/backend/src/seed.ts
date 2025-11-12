// Seed script for 100 THCA hemp products (25 per category)

const products = [
  // FLOWER CATEGORY (25 products)
  ...Array.from({ length: 25 }, (_, i) => ({
    name: `Premium Flower ${i + 1}`,
    category: 'Flower',
    price: 35 + Math.random() * 50,
    stock: Math.floor(Math.random() * 200) + 10,
    sku: `FLOWER-${String(i + 1).padStart(3, '0')}`,
    description: `High-quality THCA flower with exceptional potency and flavor profile. Perfect for connoisseurs.`,
    images: [
      `https://via.placeholder.com/500x500?text=Flower+${i + 1}+Image+1`,
      `https://via.placeholder.com/500x500?text=Flower+${i + 1}+Image+2`,
    ],
    videoUrl: `https://via.placeholder.com/500x500?text=Flower+${i + 1}+Video`,
    variants: {
      weights: ['1g', '3.5g', '7g', '14g', '28g'],
      strainTypes: ['Sativa', 'Indica', 'Hybrid'],
      potency: ['Low', 'Medium', 'High', 'Premium'],
      effects: ['Relaxing', 'Energizing', 'Balanced', 'Creative'],
    },
  })),

  // CONCENTRATES CATEGORY (25 products)
  ...Array.from({ length: 25 }, (_, i) => ({
    name: `Premium Concentrate ${i + 1}`,
    category: 'Concentrates',
    price: 50 + Math.random() * 80,
    stock: Math.floor(Math.random() * 150) + 5,
    sku: `CONC-${String(i + 1).padStart(3, '0')}`,
    description: `Potent THCA concentrate with superior extraction methods. Ideal for experienced users.`,
    images: [
      `https://via.placeholder.com/500x500?text=Concentrate+${i + 1}+Image+1`,
      `https://via.placeholder.com/500x500?text=Concentrate+${i + 1}+Image+2`,
    ],
    videoUrl: `https://via.placeholder.com/500x500?text=Concentrate+${i + 1}+Video`,
    variants: {
      weights: ['0.5g', '1g', '3.5g', '7g'],
      types: ['Wax', 'Shatter', 'Live Resin', 'Rosin', 'Sauce'],
      potency: ['High', 'Premium', 'Ultra'],
      effects: ['Intense', 'Euphoric', 'Focused', 'Relaxed'],
    },
  })),

  // MISCELLANEOUS CATEGORY (25 products)
  ...Array.from({ length: 25 }, (_, i) => ({
    name: `Misc Product ${i + 1}`,
    category: 'Miscellaneous',
    price: 15 + Math.random() * 60,
    stock: Math.floor(Math.random() * 300) + 20,
    sku: `MISC-${String(i + 1).padStart(3, '0')}`,
    description: `Quality THCA product including edibles, topicals, and accessories.`,
    images: [
      `https://via.placeholder.com/500x500?text=Misc+${i + 1}+Image+1`,
      `https://via.placeholder.com/500x500?text=Misc+${i + 1}+Image+2`,
    ],
    videoUrl: `https://via.placeholder.com/500x500?text=Misc+${i + 1}+Video`,
    variants: {
      types: ['Edible', 'Topical', 'Tincture', 'Accessory', 'Apparel'],
      quantities: ['Single', 'Pack of 5', 'Pack of 10'],
      flavors: ['Natural', 'Fruity', 'Herbal', 'Minty'],
      sizes: ['Small', 'Medium', 'Large'],
    },
  })),

  // COLLABORATORS CATEGORY (25 products)
  ...Array.from({ length: 25 }, (_, i) => ({
    name: `Collab Product ${i + 1}`,
    category: 'Collaborators',
    price: 45 + Math.random() * 100,
    stock: Math.floor(Math.random() * 100) + 5,
    sku: `COLLAB-${String(i + 1).padStart(3, '0')}`,
    description: `Limited edition collaboration product with premium quality and exclusive branding.`,
    images: [
      `https://via.placeholder.com/500x500?text=Collab+${i + 1}+Image+1`,
      `https://via.placeholder.com/500x500?text=Collab+${i + 1}+Image+2`,
    ],
    videoUrl: `https://via.placeholder.com/500x500?text=Collab+${i + 1}+Video`,
    variants: {
      collaborators: ['Artist A', 'Artist B', 'Artist C', 'Brand X', 'Brand Y'],
      editions: ['Limited', 'Exclusive', 'Standard'],
      quantities: ['1', '5', '10'],
      colors: ['Original', 'Variant 1', 'Variant 2'],
    },
  })),
]

console.log(`Generated ${products.length} products`)
console.log(JSON.stringify(products, null, 2))
