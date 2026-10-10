import celesteBag from '../images/accessories/white bag.jpg';
import oliveBag from '../images/accessories/green bag.jpg';
import noirBelt from '../images/accessories/black belt.jpg';
import aureliaBracelet from '../images/accessories/gold bracelet.jpg';
import soleneNecklace from '../images/accessories/gold necklace.jpg';
import axisEarrings from '../images/accessories/silver earrings.jpg';
import siennaSunglasses from '../images/accessories/sunglasses.jpg';
import duneHat from '../images/accessories/beige hat.jpg';
import ivoryScarf from '../images/accessories/white scarf.jpg';

// Draft prices and size ranges; replace with confirmed inventory before launch.
// Composition, dimensions and lens protection are omitted until verified.
export const accessories = [
  {
    slug: 'celeste-contrast-shoulder-bag',
    name: 'Celeste Contrast Shoulder Bag',
    price: 'RM 92',
    image: celesteBag,
    category: 'Bags',
    description:
      'A structured ivory shoulder bag outlined with black trim and slender twin handles. Its elongated shape brings a considered finish to everyday tailoring.',
    fit: 'Twin shoulder handles with contrast edging',
  },
  {
    slug: 'olive-knot-shoulder-bag',
    name: 'Olive Knot Shoulder Bag',
    price: 'RM 98',
    image: oliveBag,
    category: 'Bags',
    description:
      'An olive shoulder bag with a sculpted V-shaped opening and a central knot detail. A clean, rounded body balances the long, trailing tie.',
    fit: 'Single shoulder handle with a decorative front tie',
  },
  {
    slug: 'noir-loop-buckle-belt',
    name: 'Noir Loop-Buckle Belt',
    price: 'RM 58',
    image: noirBelt,
    category: 'Belts',
    description:
      'A slim black belt finished with a gold-tone double-loop buckle. A subtle accent for pleated trousers, midi skirts, and softly shaped dresses.',
    fit: 'Slim profile with a decorative double-loop buckle',
    sizes: ['S', 'M', 'L'],
  },
  {
    slug: 'aurelia-pearl-link-bracelet',
    name: 'Aurelia Pearl-Link Bracelet',
    price: 'RM 48',
    image: aureliaBracelet,
    category: 'Jewellery',
    description:
      'Pearl-like beads in softly varied shapes meet delicate gold-tone links. A toggle closure completes an understated piece for everyday and occasion dressing.',
    fit: 'Beaded bracelet with a toggle closure',
  },
  {
    slug: 'solene-layered-pendant-necklace',
    name: 'Solene Layered Pendant Necklace',
    price: 'RM 54',
    image: soleneNecklace,
    category: 'Jewellery',
    description:
      'A smooth gold-tone collar chain paired with a finer pendant strand. The textured pendant adds a quiet sculptural detail to an open neckline.',
    fit: 'Layered silhouette with a textured pendant',
  },
  {
    slug: 'axis-linear-drop-earrings',
    name: 'Axis Linear Drop Earrings',
    price: 'RM 42',
    image: axisEarrings,
    category: 'Jewellery',
    description:
      'Slender silver-tone bars intersect with a curved accent for a clean geometric line. An elongated drop brings movement to a minimal silhouette.',
    fit: 'Long bar drop with a curved geometric accent',
  },
  {
    slug: 'sienna-sculpted-cat-eye-sunglasses',
    name: 'Sienna Sculpted Cat-Eye Sunglasses',
    price: 'RM 68',
    image: siennaSunglasses,
    category: 'Eyewear',
    description:
      'A sculpted cat-eye frame in a deep tortoiseshell palette. Angular edges and broad temples lend definition to this everyday accessory.',
    fit: 'Angular cat-eye frame with broad temples',
  },
  {
    slug: 'dune-tie-brim-hat',
    name: 'Dune Tie-Brim Hat',
    price: 'RM 56',
    image: duneHat,
    category: 'Hats',
    description:
      'A pale sand hat with a softly flared brim and delicate chin ties. A quiet finishing layer for unhurried days outdoors.',
    fit: 'Flared brim with chin ties',
    sizes: ['S/M', 'M/L'],
  },
  {
    slug: 'ivory-soft-neck-scarf',
    name: 'Ivory Soft Neck Scarf',
    price: 'RM 46',
    image: ivoryScarf,
    category: 'Scarves',
    description:
      'A fluid ivory neck scarf with a clean, understated finish. Knot it loosely at the neckline or use it to soften the handle of a favourite bag.',
    fit: 'Lightly draped silhouette suitable for tying at the neck',
  },
].map((product) => ({
  sizes: [],
  fitLabel: 'Details',
  ...product,
  group: 'accessories',
}));
