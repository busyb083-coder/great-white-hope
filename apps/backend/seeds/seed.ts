// Seed script for demo data
// Run with: npm run seed

const products = [
  // Concentrates (10)
  { sku: 'CONC-001', name: 'Premium Live Resin', price: 4500, category: 'Concentrates', description: 'High-quality live resin THCA concentrate' },
  { sku: 'CONC-002', name: 'Diamond THCA Sauce', price: 5000, category: 'Concentrates', description: 'Pure THCA diamonds in terpene-rich sauce' },
  { sku: 'CONC-003', name: 'Rosin Concentrate', price: 3500, category: 'Concentrates', description: 'Solventless rosin concentrate' },
  { sku: 'CONC-004', name: 'Budder Concentrate', price: 4200, category: 'Concentrates', description: 'Creamy budder texture concentrate' },
  { sku: 'CONC-005', name: 'Wax Concentrate', price: 3800, category: 'Concentrates', description: 'Premium wax concentrate' },
  { sku: 'CONC-006', name: 'Shatter Concentrate', price: 3500, category: 'Concentrates', description: 'Glass-like shatter concentrate' },
  { sku: 'CONC-007', name: 'Live Sauce', price: 4800, category: 'Concentrates', description: 'Fresh live sauce concentrate' },
  { sku: 'CONC-008', name: 'Crumble Concentrate', price: 3600, category: 'Concentrates', description: 'Crumbly texture concentrate' },
  { sku: 'CONC-009', name: 'Terpy Sauce', price: 5200, category: 'Concentrates', description: 'Terpene-rich sauce concentrate' },
  { sku: 'CONC-010', name: 'Full Spectrum Extract', price: 4900, category: 'Concentrates', description: 'Full spectrum THCA extract' },

  // Flower (8)
  { sku: 'FLOWER-001', name: 'Premium Flower Oz', price: 9000, category: 'Flower', description: 'Premium quality THCA flower' },
  { sku: 'FLOWER-002', name: 'Exotic Strain Quarter', price: 4500, category: 'Flower', description: 'Exotic strain quarter pound' },
  { sku: 'FLOWER-003', name: 'Bulk Flower Half Pound', price: 17000, category: 'Flower', description: 'Bulk flower half pound' },
  { sku: 'FLOWER-004', name: 'Indoor Grown Oz', price: 8500, category: 'Flower', description: 'Indoor grown premium flower' },
  { sku: 'FLOWER-005', name: 'Outdoor Grown Oz', price: 7500, category: 'Flower', description: 'Outdoor grown premium flower' },
  { sku: 'FLOWER-006', name: 'Small Buds Oz', price: 6500, category: 'Flower', description: 'Small buds premium flower' },
  { sku: 'FLOWER-007', name: 'Shake Oz', price: 4500, category: 'Flower', description: 'Premium shake' },
  { sku: 'FLOWER-008', name: 'Pound Bulk', price: 34000, category: 'Flower', description: 'Bulk pound of premium flower' },

  // Miscellaneous (5)
  { sku: 'MISC-001', name: 'Rolling Papers Pack', price: 300, category: 'Miscellaneous', description: 'Premium rolling papers' },
  { sku: 'MISC-002', name: 'Glass Bong', price: 5000, category: 'Miscellaneous', description: 'Premium glass bong' },
  { sku: 'MISC-003', name: 'Grinder', price: 2500, category: 'Miscellaneous', description: 'Premium grinder' },
  { sku: 'MISC-004', name: 'Dab Rig', price: 8000, category: 'Miscellaneous', description: 'Premium dab rig' },
  { sku: 'MISC-005', name: 'Vaporizer', price: 15000, category: 'Miscellaneous', description: 'Premium vaporizer' },

  // Collaborators (2)
  { sku: 'COLLAB-001', name: 'Collaboration Limited Edition', price: 7500, category: 'Collaborators', description: 'Limited edition collaboration product' },
  { sku: 'COLLAB-002', name: 'Artist Series Blend', price: 6000, category: 'Collaborators', description: 'Artist series exclusive blend' },
];

console.log(`Seeding ${products.length} products...`);
console.log('Products ready for import');
console.log(JSON.stringify(products, null, 2));
