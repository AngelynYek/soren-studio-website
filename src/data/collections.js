// One record controls a collection's route, heading and product-page return link.
// navLabel is optional: editorial collections can be reached from the homepage.
export const collections = {
  autumn: {
    hash: '#new-autumn', group: 'autumn', eyebrow: 'New',
    title: 'Autumn collection', description: 'Thoughtful layers and timeless pieces for the season ahead.',
    label: 'New season', backLabel: 'new arrivals', navLabel: 'New',
  },
  men: {
    hash: '#men', group: 'men', eyebrow: 'Soren menswear',
    title: 'Men’s collection', description: 'Relaxed tailoring and purposeful layers for every day.',
    label: 'Menswear', backLabel: 'men', navLabel: 'Men',
  },
  women: {
    hash: '#women', group: 'women', eyebrow: 'Soren womenswear',
    title: 'Women’s collection', description: 'Considered silhouettes and graceful details for the everyday wardrobe.',
    label: 'Womenswear', backLabel: 'women', navLabel: 'Women',
  },
  accessories: {
    hash: '#accessories', group: 'accessories', eyebrow: 'The finishing touches',
    title: 'Accessories', description: 'Sculptural accents and considered details to complete the everyday wardrobe.',
    label: 'Accessories edit', backLabel: 'accessories', navLabel: 'Accessories',
  },
  offers: {
    hash: '#exclusive-offers', group: 'offers', eyebrow: 'Curated for you',
    title: 'Exclusive offers', description: 'Considered pieces and timeless accents, at a little less.',
    label: 'Exclusive offer', backLabel: 'exclusive offers',
  },
  icons: {
    hash: '#iconic-pieces', group: 'icons', eyebrow: 'The signature edit',
    title: 'Iconic pieces', description: 'Signature silhouettes and quiet statement pieces, chosen to endure.',
    label: 'Signature piece', backLabel: 'iconic pieces',
  },
};
