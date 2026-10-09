// Illustrative BODY measurements in centimetres, not measured garment dimensions.
// Store one source unit; display conversions never mutate these shared charts.
const bodyCharts = {
  women: {
    XS: { bust: [78, 82], waist: [60, 64], hips: [84, 88] },
    S: { bust: [83, 87], waist: [65, 69], hips: [89, 93] },
    M: { bust: [88, 92], waist: [70, 74], hips: [94, 98] },
    L: { bust: [93, 99], waist: [75, 81], hips: [99, 105] },
    XL: { bust: [100, 106], waist: [82, 88], hips: [106, 112] },
  },
  men: {
    XS: { chest: [86, 91], waist: [70, 75], hips: [86, 91] },
    S: { chest: [92, 97], waist: [76, 81], hips: [92, 97] },
    M: { chest: [98, 103], waist: [82, 87], hips: [98, 103] },
    L: { chest: [104, 109], waist: [88, 93], hips: [104, 109] },
    XL: { chest: [110, 115], waist: [94, 99], hips: [110, 115] },
  },
};

const measurementDetails = {
  bust: { label: 'Bust', instruction: 'Measure around the fullest part of your bust, keeping the tape level.' },
  chest: { label: 'Chest', instruction: 'Measure around the fullest part of your chest, keeping the tape level.' },
  waist: { label: 'Waist', instruction: 'Measure around your natural waist, without pulling the tape tight.' },
  hips: { label: 'Hips', instruction: 'With feet together, measure around the fullest part of your hips.' },
};

const categoryMeasurements = {
  Tops: ['upperBody', 'waist'],
  Shirts: ['upperBody', 'waist'],
  Knitwear: ['upperBody', 'waist'],
  Outerwear: ['upperBody', 'waist'],
  Dresses: ['upperBody', 'waist', 'hips'],
  Sets: ['upperBody', 'waist', 'hips'],
  Skirts: ['waist', 'hips'],
  Trousers: ['waist', 'hips'],
};

export const sizeGuideNotice = 'Sample sizing for this personal demo. These are illustrative body measurements, not verified garment measurements.';

// Override sizeProfile on a product when it differs from its collection default.
// Unsupported categories/sizes have no guide rather than displaying a wrong chart.
export function getSizeGuide(product) {
  const measurementKeys = categoryMeasurements[product.category];
  if (!measurementKeys || !product.sizes?.length) return null;

  const profile = product.sizeProfile ?? (product.group === 'men' ? 'men' : 'women');
  const chart = bodyCharts[profile];
  if (!chart || product.sizes.some((size) => !chart[size])) return null;

  const columns = measurementKeys.map((key) => {
    const resolvedKey = key === 'upperBody' ? profile === 'men' ? 'chest' : 'bust' : key;
    return { key: resolvedKey, ...measurementDetails[resolvedKey] };
  });

  return {
    profile,
    columns,
    rows: product.sizes.map((size) => ({
      size,
      measurements: columns.map(({ key }) => chart[size][key]),
    })),
  };
}

export function formatMeasurementRange(range, unit = 'cm') {
  const format = (value) => unit === 'in' ? (value / 2.54).toFixed(1) : String(value);
  return range.map(format).join('–');
}
