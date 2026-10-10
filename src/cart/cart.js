export const CART_STORAGE_KEY = 'soren-cart-v1';
export const MAX_QUANTITY = 10;
export const MAX_LINES = 20;
export const lineKey = ({ slug, size }) => `${slug}:${size}`;
export const emptyCart = { items: [], lastOrder: null };

export function priceInMinorUnits(price) {
  if (!/^RM \d+(\.\d{1,2})?$/.test(price)) throw new Error('Invalid product price');
  return Math.round(Number(price.slice(3)) * 100);
}

export const formatMoney = (amount) => `RM ${(amount / 100).toFixed(2)}`;

export const cartTotal = (items, findProduct) =>
  items.reduce(
    (sum, line) => sum + priceInMinorUnits(findProduct(line.slug).price) * line.quantity,
    0,
  );

export function validLine(line, product) {
  return Boolean(
    product &&
    line &&
    Number.isInteger(line.quantity) &&
    line.quantity > 0 &&
    line.quantity <= MAX_QUANTITY &&
    typeof line.size === 'string' &&
    (product.sizes.length ? product.sizes.includes(line.size) : line.size === ''),
  );
}

export function restoreCart(value, findProduct) {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed?.items)) return { ...emptyCart };
    const seen = new Set();
    const items = parsed.items
      .filter((line) => {
        if (!validLine(line, findProduct(line?.slug)) || seen.has(lineKey(line))) return false;
        seen.add(lineKey(line));
        return true;
      })
      .slice(0, MAX_LINES)
      .map(({ slug, size, quantity }) => ({ slug, size, quantity }));
    return { items, lastOrder: restoreDemoOrder(parsed.lastOrder) };
  } catch {
    return { ...emptyCart };
  }
}

// Receipts are browser-local demo records, not proof of payment. Retain only
// the fields the receipt screen needs, and discard malformed stored records.
export function restoreDemoOrder(value) {
  if (
    !value ||
    typeof value.id !== 'string' ||
    !/^demo_[a-zA-Z0-9-]{1,80}$/.test(value.id) ||
    typeof value.createdAt !== 'string' ||
    !Number.isFinite(Date.parse(value.createdAt)) ||
    !Array.isArray(value.items) ||
    !value.items.length ||
    value.items.length > MAX_LINES
  )
    return null;
  const seen = new Set();
  const items = [];
  for (const line of value.items) {
    if (
      !line ||
      typeof line.slug !== 'string' ||
      !line.slug ||
      typeof line.size !== 'string' ||
      typeof line.name !== 'string' ||
      !line.name ||
      line.name.length > 180 ||
      !Number.isInteger(line.quantity) ||
      line.quantity < 1 ||
      line.quantity > MAX_QUANTITY ||
      !Number.isSafeInteger(line.amount) ||
      line.amount <= 0 ||
      seen.has(lineKey(line))
    )
      return null;
    seen.add(lineKey(line));
    items.push({
      slug: line.slug,
      size: line.size,
      quantity: line.quantity,
      name: line.name,
      amount: line.amount,
    });
  }
  const total = items.reduce((sum, line) => sum + line.amount, 0);
  if (!Number.isSafeInteger(total) || value.total !== total) return null;
  return { id: value.id, createdAt: value.createdAt, items, total };
}

export function createDemoOrder(
  items,
  findProduct,
  { id = `demo_${crypto.randomUUID()}`, createdAt = new Date().toISOString() } = {},
) {
  if (!Array.isArray(items) || !items.length || items.length > MAX_LINES)
    throw new Error('Add something to your bag before checking out.');
  const lines = items.map((line) => {
    const product = findProduct(line?.slug);
    if (!validLine(line, product))
      throw new Error('Please check your bag items, sizes, and quantities.');
    return {
      slug: product.slug,
      size: line.size,
      quantity: line.quantity,
      name: product.name,
      amount: priceInMinorUnits(product.price) * line.quantity,
    };
  });
  const order = restoreDemoOrder({
    id,
    createdAt,
    items: lines,
    total: lines.reduce((sum, line) => sum + line.amount, 0),
  });
  if (!order)
    throw new Error('Could not create the demo order. Please review your bag and try again.');
  return order;
}

export function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const key = lineKey(action.line);
      const existing = state.items.find((line) => lineKey(line) === key);
      if (existing?.quantity >= MAX_QUANTITY || (!existing && state.items.length >= MAX_LINES))
        return state;
      return {
        ...state,
        items: existing
          ? state.items.map((line) =>
              lineKey(line) === key ? { ...line, quantity: line.quantity + 1 } : line,
            )
          : [...state.items, { ...action.line, quantity: 1 }],
      };
    }
    case 'quantity':
      if (
        !Number.isInteger(action.quantity) ||
        action.quantity < 1 ||
        action.quantity > MAX_QUANTITY
      )
        return state;
      return {
        ...state,
        items: state.items.map((line) =>
          lineKey(line) === action.key ? { ...line, quantity: action.quantity } : line,
        ),
      };
    case 'remove':
      return { ...state, items: state.items.filter((line) => lineKey(line) !== action.key) };
    case 'complete-demo': {
      const order = restoreDemoOrder(action.order);
      if (!order || state.lastOrder?.id === order.id) return state;
      const purchased = new Map(order.items.map((line) => [lineKey(line), line.quantity]));
      return {
        items: state.items
          .map((line) => ({
            ...line,
            quantity: line.quantity - (purchased.get(lineKey(line)) ?? 0),
          }))
          .filter((line) => line.quantity > 0),
        lastOrder: order,
      };
    }
    default:
      return state;
  }
}
