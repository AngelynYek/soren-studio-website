export const MAX_QUERY_LENGTH = 120;
export const RESULTS_PER_PAGE = 12;

// Category terms describe what is being sold, not other garments mentioned in styling copy.
const categorySearches = [
  { terms: ['trouser', 'trousers', 'pants'], categories: ['Trousers'] },
  { terms: ['dress', 'dresses'], categories: ['Dresses'] },
  { terms: ['shirt', 'shirts'], categories: ['Shirts'] },
  { terms: ['skirt', 'skirts'], categories: ['Skirts'] },
  { terms: ['top', 'tops'], categories: ['Tops'] },
  { terms: ['set', 'sets'], categories: ['Sets'] },
  { terms: ['knitwear'], categories: ['Knitwear'] },
  { terms: ['outerwear'], categories: ['Outerwear'] },
  { terms: ['bag', 'bags'], categories: ['Bags'] },
  { terms: ['belt', 'belts'], categories: ['Belts'] },
  { terms: ['jewellery', 'jewelry'], categories: ['Jewellery'] },
  { terms: ['eyewear'], categories: ['Eyewear'] },
  { terms: ['hat', 'hats'], categories: ['Hats'] },
  { terms: ['scarf', 'scarves'], categories: ['Scarves'] },
  {
    terms: ['accessory', 'accessories'],
    categories: ['Accessories', 'Bags', 'Belts', 'Jewellery', 'Eyewear', 'Hats', 'Scarves'],
  },
];

const categoriesByTerm = new Map(
  categorySearches.flatMap(({ terms, categories }) => terms.map((term) => [term, categories])),
);

export function cleanSearchQuery(value) {
  return typeof value === 'string'
    ? value.slice(0, MAX_QUERY_LENGTH).trim().replace(/\s+/g, ' ')
    : '';
}

function searchableWords(value) {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/['’]s\b/gu, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => {
      if (word === 'mens') return 'men';
      if (word === 'womens') return 'women';
      return word;
    });
}

// Build once from the catalog; searches do not repeatedly normalize every product.
export function createSearchIndex(products, collections) {
  return products.map((product) => {
    const collection = collections[product.group];
    const nameWords = searchableWords(product.name);
    const fields = [
      product.name,
      product.category,
      product.description,
      product.material,
      product.fit,
      product.group,
      collection?.title,
      collection?.label,
      collection?.backLabel,
      product.wasPrice ? 'sale' : '',
    ];
    return {
      product,
      nameWords,
      words: [...new Set(searchableWords(fields.filter(Boolean).join(' ')))],
    };
  });
}

function matchesWord(words, token) {
  return words.some((word) => word.startsWith(token));
}

export function searchProducts(index, query) {
  const queryWords = searchableWords(cleanSearchQuery(query));
  const tokens = [...new Set(queryWords)];
  if (tokens.length === 0) return [];

  // A full product name is more specific than category intent (e.g. a shirt-and-skirt set).
  const exactNames = index.filter((entry) => entry.nameWords.join(' ') === queryWords.join(' '));
  if (exactNames.length > 0) return exactNames.map((entry) => entry.product);

  return index
    .filter((entry) =>
      tokens.every((token) => {
        const categories = categoriesByTerm.get(token);
        return categories
          ? categories.includes(entry.product.category)
          : matchesWord(entry.words, token);
      }),
    )
    .map((entry) => ({
      product: entry.product,
      score: tokens.filter((token) => matchesWord(entry.nameWords, token)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.product);
}

export function searchHash(query) {
  const cleaned = cleanSearchQuery(query);
  return cleaned ? `#search?q=${encodeURIComponent(cleaned)}` : '#search';
}
